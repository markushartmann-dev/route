// ─── State ────────────────────────────────────────────────────────────────────
const GOOGLE_MAPS_API_KEY = 'AIzaSyDzdc9GUQN6X2r8vw1_7kcVGRyvP5ZLoNM';

const state = {
  apiKey: GOOGLE_MAPS_API_KEY,
  excelRows: [],
  addresses: [],      // {id, name, address, lat, lng, success}
  route: null,
  map: null,
  directionsRenderer: null,
  trafficLayer: null,
  mapsLoaded: false,
};

const BACKEND = '/api';  // proxied via nginx

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setupDropZone();
  checkConfig();
});

async function checkConfig() {
  setStatus('✅ API Key vorhanden', 'ok');
  loadGoogleMaps(state.apiKey);
}

function setStatus(msg, cls) {
  const el = document.getElementById('api-status');
  el.textContent = msg;
  el.className = cls;
}


function loadGoogleMaps(key) {
  if (state.mapsLoaded || document.getElementById('gmaps-script')) return;
  const script = document.createElement('script');
  script.id = 'gmaps-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=onMapsReady&language=de&region=DE`;
  script.async = true;
  document.head.appendChild(script);
}

window.onMapsReady = function () {
  state.mapsLoaded = true;
};

// ─── Drop Zone / File Input ───────────────────────────────────────────────────
function setupDropZone() {
  const zone = document.getElementById('drop-zone');
  const input = document.getElementById('file-input');

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
  input.addEventListener('change', () => { if (input.files[0]) handleFile(input.files[0]); });
}

async function handleFile(file) {
  showLoading('Lese Excel-Datei...');
  try {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BACKEND}/import-excel`, { method: 'POST', body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload fehlgeschlagen');

    state.excelRows = data.rows;
    populateColumnDropdowns(data.columns);
    document.getElementById('column-mapping').classList.remove('hidden');
  } catch (err) {
    alert('Fehler: ' + err.message);
  } finally {
    hideLoading();
  }
}

function populateColumnDropdowns(columns) {
  const selects = ['col-name', 'col-street', 'col-zip', 'col-city', 'col-full-address'];
  selects.forEach(id => {
    const sel = document.getElementById(id);
    sel.innerHTML = id === 'col-full-address' ? '<option value="">-- Nicht verwenden --</option>' : '<option value="">-- Spalte wählen --</option>';
    columns.forEach(col => {
      const opt = document.createElement('option');
      opt.value = col;
      opt.textContent = col;
      sel.appendChild(opt);
    });
  });

  // Auto-detect common column names
  const lower = columns.map(c => c.toLowerCase());
  const trySet = (id, keywords) => {
    const idx = lower.findIndex(c => keywords.some(k => c.includes(k)));
    if (idx >= 0) document.getElementById(id).value = columns[idx];
  };

  trySet('col-name', ['firma', 'name', 'company', 'unternehmen', 'kunde']);
  trySet('col-street', ['straße', 'strasse', 'street', 'adresse', 'address']);
  trySet('col-zip', ['plz', 'zip', 'postleitzahl', 'postal']);
  trySet('col-city', ['ort', 'stadt', 'city', 'town', 'gemeinde']);
  trySet('col-full-address', ['vollständig', 'full', 'komplett', 'anschrift']);
}

async function processAddresses() {
  const colName = document.getElementById('col-name').value;
  const colStreet = document.getElementById('col-street').value;
  const colZip = document.getElementById('col-zip').value;
  const colCity = document.getElementById('col-city').value;
  const colFull = document.getElementById('col-full-address').value;

  if (!colName) return alert('Bitte Spalte für Firmenname wählen');
  if (!colFull && !colStreet) return alert('Bitte Adress-Spalten wählen');

  const items = state.excelRows.map((row, i) => {
    let address = '';
    if (colFull && row[colFull]) {
      address = row[colFull];
    } else {
      const parts = [row[colStreet], row[colZip], row[colCity]].filter(Boolean);
      address = parts.join(', ');
    }
    return {
      id: i,
      name: row[colName] || `Eintrag ${i+1}`,
      address: address.trim()
    };
  }).filter(item => item.address);

  if (!items.length) return alert('Keine Adressen gefunden');

  // Geocode all addresses
  document.getElementById('import-progress').classList.remove('hidden');
  document.getElementById('column-mapping').classList.add('hidden');

  showLoading('Geocodiere Adressen...');
  try {
    const res = await fetch(`${BACKEND}/geocode-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresses: items })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    state.addresses = data.results.map(r => ({
      ...r,
      selected: r.success
    }));

    renderAddressList();
    document.getElementById('card-addresses').style.display = '';
    document.getElementById('addr-count').textContent = state.addresses.length;
  } catch (err) {
    // Fallback: use addresses without geocoding (Maps will handle it)
    state.addresses = items.map(r => ({ ...r, success: null, selected: true }));
    renderAddressList();
    document.getElementById('card-addresses').style.display = '';
    document.getElementById('addr-count').textContent = state.addresses.length;
    console.warn('Geocoding failed, using raw addresses:', err.message);
  } finally {
    hideLoading();
    document.getElementById('import-progress').classList.add('hidden');
  }
}

function renderAddressList() {
  const list = document.getElementById('address-list');
  list.innerHTML = '';
  state.addresses.forEach(addr => {
    const div = document.createElement('div');
    div.className = 'address-item' + (addr.success === false ? ' error' : '');
    div.innerHTML = `
      <input type="checkbox" id="chk-${addr.id}" ${addr.selected ? 'checked' : ''}
        onchange="toggleAddress(${addr.id}, this.checked)" />
      <div class="addr-info">
        <div class="addr-name">${escHtml(addr.name)}</div>
        <div class="addr-address">${escHtml(addr.formatted_address || addr.address)}</div>
      </div>
      <span class="addr-status ${addr.success === true ? 'ok' : addr.success === false ? 'error' : 'pending'}">
        ${addr.success === true ? '✅ OK' : addr.success === false ? '❌ Fehler' : '⏳ Roh'}
      </span>`;
    list.appendChild(div);
  });
}

function toggleAddress(id, checked) {
  const addr = state.addresses.find(a => a.id === id);
  if (addr) addr.selected = checked;
}

function selectAll()  { state.addresses.forEach(a => { a.selected = true; }); renderAddressList(); }
function selectNone() { state.addresses.forEach(a => { a.selected = false; }); renderAddressList(); }

// ─── Route Building ───────────────────────────────────────────────────────────
async function buildRoute() {
  if (!state.mapsLoaded) return alert('Google Maps noch nicht geladen. Bitte API Key eingeben und Seite neu laden.');

  const selected = state.addresses.filter(a => a.selected);
  if (selected.length < 1) return alert('Bitte mindestens eine Adresse auswählen');

  const startAddr = document.getElementById('start-address').value.trim();
  if (!startAddr) return alert('Bitte Startadresse eingeben');

  const avgSpeed = parseInt(document.getElementById('avg-speed').value) || 80;
  const maxRange = parseInt(document.getElementById('max-range').value) || 400;
  const breakDuration = parseInt(document.getElementById('break-duration').value) || 30;
  const breakInterval = parseInt(document.getElementById('break-interval').value) || 200;
  const vehicleType = document.getElementById('vehicle-type').value;

  showLoading('Berechne optimierte Route...');

  // Build stops with breaks and fuel stops
  const stops = buildStopsWithBreaks(startAddr, selected, maxRange, breakInterval, vehicleType);

  try {
    // Show route panel first
    document.getElementById('setup-panel').classList.add('hidden');
    document.getElementById('route-panel').classList.remove('hidden');

    // Init map
    if (!state.map) initMap();

    // Calculate route via Directions API
    await calculateRoute(stops, avgSpeed, breakDuration, vehicleType);
  } catch (err) {
    alert('Fehler beim Berechnen der Route: ' + err.message);
    backToSetup();
  } finally {
    hideLoading();
  }
}

function buildStopsWithBreaks(startAddr, addresses, maxRange, breakInterval, vehicleType) {
  const stops = [];
  let kmSinceLastBreak = 0;
  let kmSinceLastFuel = 0;

  stops.push({ type: 'start', name: 'Start', address: startAddr });

  addresses.forEach((addr, i) => {
    // Estimate distance (rough: assume 50km avg between stops for planning)
    const estimatedLeg = 50;
    kmSinceLastBreak += estimatedLeg;
    kmSinceLastFuel += estimatedLeg;

    if (kmSinceLastFuel >= maxRange * 0.85) {
      stops.push({
        type: vehicleType === 'electric' ? 'fuel-stop' : 'fuel-stop',
        name: vehicleType === 'electric' ? '⚡ Ladestation' : '⛽ Tankstelle',
        address: addr.address, // near current location
        isServiceStop: true
      });
      kmSinceLastFuel = 0;
    }

    if (kmSinceLastBreak >= breakInterval) {
      stops.push({
        type: 'break',
        name: '☕ Pause',
        address: addr.address,
        isServiceStop: true
      });
      kmSinceLastBreak = 0;
    }

    stops.push({ type: 'destination', ...addr });
  });

  return stops;
}

function initMap() {
  const mapEl = document.getElementById('map');
  state.map = new google.maps.Map(mapEl, {
    zoom: 7,
    center: { lat: 51.1657, lng: 10.4515 }, // Germany center
    mapTypeControl: false,
    streetViewControl: false,
  });

  state.directionsRenderer = new google.maps.DirectionsRenderer({
    map: state.map,
    suppressMarkers: false,
  });

  state.trafficLayer = new google.maps.TrafficLayer();
  state.trafficLayer.setMap(state.map);

  // Traffic status check
  updateTrafficBadge();
}

function updateTrafficBadge() {
  const badge = document.getElementById('traffic-badge');
  const hour = new Date().getHours();
  const isRush = (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 19);
  const isWeekend = [0, 6].includes(new Date().getDay());

  if (isWeekend) {
    badge.textContent = '🟢 Wenig Verkehr (Wochenende)';
    badge.className = 'badge green';
  } else if (isRush) {
    badge.textContent = '🔴 Berufsverkehr möglich';
    badge.className = 'badge red';
  } else {
    badge.textContent = '🟡 Normaler Verkehr';
    badge.className = 'badge orange';
  }
}

async function calculateRoute(stops, avgSpeed, breakDuration, vehicleType) {
  const directionsService = new google.maps.DirectionsService();

  // Destinations = all non-service stops
  const destinations = stops.filter(s => s.type === 'destination' || s.type === 'start');
  const start = destinations[0].address;
  const end = destinations[destinations.length - 1].address;
  const waypoints = destinations.slice(1, -1).map(s => ({
    location: s.lat && s.lng ? new google.maps.LatLng(s.lat, s.lng) : s.address,
    stopover: true
  }));

  const request = {
    origin: start,
    destination: end,
    waypoints: waypoints.slice(0, 23), // Google limit: 23 waypoints
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
    drivingOptions: {
      departureTime: getNextWeekdayMorning(),
      trafficModel: google.maps.TrafficModel.BEST_GUESS
    },
    language: 'de',
    region: 'DE'
  };

  return new Promise((resolve, reject) => {
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        state.directionsRenderer.setDirections(result);

        // Parse route data
        const route = result.routes[0];
        const legs = route.legs;

        let totalDistance = 0;
        let totalDuration = 0;

        legs.forEach(leg => {
          totalDistance += leg.distance.value;
          totalDuration += leg.duration_in_traffic
            ? leg.duration_in_traffic.value
            : leg.duration.value;
        });

        totalDistance = Math.round(totalDistance / 1000);
        totalDuration = Math.round(totalDuration / 60);

        // Add break time
        const breakCount = Math.floor(totalDistance / 200);
        const fuelCount = Math.floor(totalDistance / (document.getElementById('max-range') ? parseInt(document.getElementById('max-range').value) * 0.85 : 340));
        const extraTime = breakCount * breakDuration + fuelCount * 20;
        const totalWithBreaks = totalDuration + extraTime;

        // Build ordered stops
        const orderedWaypoints = route.waypoint_order;
        const orderedDestinations = [destinations[0]];
        orderedWaypoints.forEach(i => orderedDestinations.push(destinations.slice(1, -1)[i]));
        if (destinations.length > 1) orderedDestinations.push(destinations[destinations.length - 1]);

        state.route = {
          stops: orderedDestinations,
          totalDistance,
          totalDuration: totalWithBreaks,
          breakCount,
          fuelCount,
          result,
          vehicleType
        };

        renderRouteDetails();
        resolve();
      } else {
        reject(new Error(`Directions API: ${status}`));
      }
    });
  });
}

function getNextWeekdayMorning() {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  if (d.getDay() === 6) d.setDate(d.getDate() + 2);
  if (d <= new Date()) d.setDate(d.getDate() + 1);
  return d;
}

function renderRouteDetails() {
  const r = state.route;
  const hours = Math.floor(r.totalDuration / 60);
  const mins = r.totalDuration % 60;

  document.getElementById('route-summary').innerHTML = `
    <div class="summary-item">
      <div class="value">${r.totalDistance} km</div>
      <div class="label">Gesamtstrecke</div>
    </div>
    <div class="summary-item">
      <div class="value">${hours}h ${mins}m</div>
      <div class="label">Fahrzeit inkl. Pausen</div>
    </div>
    <div class="summary-item">
      <div class="value">${r.stops.length - 1}</div>
      <div class="label">Haltepunkte</div>
    </div>`;

  const stopList = document.getElementById('stop-list');
  stopList.innerHTML = '';

  r.stops.forEach((stop, i) => {
    // Insert break/fuel stops between destinations
    if (i > 0 && r.breakCount > 0 && i % Math.ceil(r.stops.length / (r.breakCount + 1)) === 0) {
      stopList.appendChild(createStopEl({
        type: 'break', name: '☕ Pause (ca. 30 Min)',
        address: 'Raststätte empfohlen'
      }));
    }

    const leg = state.route.result.routes[0].legs[i > 0 ? i - 1 : 0];
    const dist = i > 0 && leg ? leg.distance.text : '';
    const dur = i > 0 && leg ? (leg.duration_in_traffic || leg.duration).text : '';

    stopList.appendChild(createStopEl({
      type: i === 0 ? 'start' : 'destination',
      name: stop.name,
      address: stop.formatted_address || stop.address,
      meta: dist && dur ? `${dist} · ${dur} Fahrzeit` : ''
    }));
  });
}

function createStopEl({ type, name, address, meta }) {
  const div = document.createElement('div');
  div.className = `stop-item ${type === 'break' ? 'break-stop' : type === 'start' ? 'start-stop' : type === 'fuel-stop' ? 'fuel-stop' : ''}`;
  const icons = { start: '🏠', destination: '📍', break: '☕', 'fuel-stop': '⛽' };
  div.innerHTML = `
    <div class="stop-icon">${icons[type] || '📍'}</div>
    <div class="stop-info">
      <div class="stop-name">${escHtml(name)}</div>
      ${address ? `<div class="stop-address">${escHtml(address)}</div>` : ''}
      ${meta ? `<div class="stop-meta">${escHtml(meta)}</div>` : ''}
    </div>`;
  return div;
}

function openInGoogleMaps() {
  if (!state.route) return;
  const stops = state.route.stops;
  if (stops.length === 0) return;

  const origin = encodeURIComponent(stops[0].formatted_address || stops[0].address);
  const dest = encodeURIComponent(stops[stops.length - 1].formatted_address || stops[stops.length - 1].address);
  const waypoints = stops.slice(1, -1)
    .map(s => encodeURIComponent(s.formatted_address || s.address))
    .join('|');

  let url = `https://www.google.de/maps/dir/${origin}/${waypoints ? waypoints + '/' : ''}${dest}`;
  window.open(url, '_blank');
}

function exportRoute() {
  if (!state.route) return;
  const r = state.route;
  const hours = Math.floor(r.totalDuration / 60);
  const mins = r.totalDuration % 60;

  let text = `Routenplan\n${'='.repeat(40)}\n`;
  text += `Gesamtstrecke: ${r.totalDistance} km\n`;
  text += `Fahrzeit (inkl. Pausen): ${hours}h ${mins}m\n`;
  text += `Pausen: ${r.breakCount} × ${document.getElementById('break-duration').value} Min\n\n`;
  text += `Haltepunkte:\n`;

  r.stops.forEach((s, i) => {
    text += `${i + 1}. ${s.name}\n   ${s.formatted_address || s.address}\n`;
  });

  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'route.txt';
  a.click();
}

function backToSetup() {
  document.getElementById('route-panel').classList.add('hidden');
  document.getElementById('setup-panel').classList.remove('hidden');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showLoading(text) {
  document.getElementById('loading-text').textContent = text || 'Lade...';
  document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
