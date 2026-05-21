// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  apiKey: '',
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  excelRows: [],
  addresses: [],
  activeCities: new Set(),
  fileKey: '',
  route: null,
  map: null,
  directionsRenderer: null,
  trafficLayer: null,
  mapsLoaded: false,
};

const BACKEND = '/api';

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme') || 'light');
  if (state.token) {
    verifyAndInit();
  } else {
    showLogin();
  }
});

async function verifyAndInit() {
  try {
    const res = await apiFetch('/auth/me');
    if (!res.ok) { showLogin(); return; }
    const data = await res.json();
    state.user = data.user;
    localStorage.setItem('user', JSON.stringify(state.user));
    showApp();
  } catch {
    showLogin();
  }
}

function showLogin() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
}

function showApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  document.getElementById('header-user').textContent = '👤 ' + state.user.username;
  if (state.user.role === 'admin') {
    document.getElementById('admin-btn').classList.remove('hidden');
  }
  setupDropZone();
  checkConfig();
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
async function submitLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  try {
    const res = await fetch(`${BACKEND}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error; errEl.classList.remove('hidden'); return; }
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('token', state.token);
    localStorage.setItem('user', JSON.stringify(state.user));
    showApp();
  } catch {
    errEl.textContent = 'Connection error';
    errEl.classList.remove('hidden');
  }
}

function logout() {
  state.token = '';
  state.user = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showLogin();
}

function apiFetch(path, options = {}) {
  return fetch(`${BACKEND}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Authorization': `Bearer ${state.token}`
    }
  });
}

// ─── Theme ────────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

// ─── Config / Maps ────────────────────────────────────────────────────────────
async function checkConfig() {
  try {
    const res = await apiFetch('/config');
    const cfg = await res.json();
    if (cfg.apiKey) {
      state.apiKey = cfg.apiKey;
      setStatus('✅ API Key active', 'ok');
      loadGoogleMaps(cfg.apiKey);
    } else {
      setStatus('⚠️ No API Key configured', 'error');
    }
  } catch {
    setStatus('⚠️ Backend unreachable', 'error');
  }
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

window.onMapsReady = function () { state.mapsLoaded = true; };

// ─── Admin Panel ──────────────────────────────────────────────────────────────
async function openAdmin() {
  document.getElementById('admin-modal').classList.remove('hidden');
  await loadUsers();
}

function closeAdmin() {
  document.getElementById('admin-modal').classList.add('hidden');
  resetUserForm();
}

async function loadUsers() {
  try {
    const res = await apiFetch('/admin/users');
    const users = await res.json();
    const tbody = document.getElementById('user-tbody');
    tbody.innerHTML = users.map(u => `
      <tr>
        <td>${escHtml(u.username)}</td>
        <td><span class="role-badge ${u.role}">${u.role}</span></td>
        <td>${new Date(u.createdAt).toLocaleDateString()}</td>
        <td>
          <button class="btn-table" onclick="editUser(${u.id},'${escHtml(u.username)}','${u.role}')">Edit</button>
          ${u.id !== state.user.id ? `<button class="btn-table danger" onclick="deleteUser(${u.id},'${escHtml(u.username)}')">Delete</button>` : ''}
        </td>
      </tr>`).join('');
  } catch (err) {
    alert('Error loading users: ' + err.message);
  }
}

function editUser(id, username, role) {
  document.getElementById('uf-id').value = id;
  document.getElementById('uf-username').value = username;
  document.getElementById('uf-password').value = '';
  document.getElementById('uf-role').value = role;
  document.getElementById('user-form-title').textContent = 'Edit User';
}

function resetUserForm() {
  document.getElementById('uf-id').value = '';
  document.getElementById('uf-username').value = '';
  document.getElementById('uf-password').value = '';
  document.getElementById('uf-role').value = 'user';
  document.getElementById('user-form-title').textContent = 'Add User';
  document.getElementById('user-form-error').classList.add('hidden');
}

async function saveUser() {
  const id = document.getElementById('uf-id').value;
  const username = document.getElementById('uf-username').value.trim();
  const password = document.getElementById('uf-password').value;
  const role = document.getElementById('uf-role').value;
  const errEl = document.getElementById('user-form-error');
  errEl.classList.add('hidden');

  if (!username) { errEl.textContent = 'Username required'; errEl.classList.remove('hidden'); return; }
  if (!id && !password) { errEl.textContent = 'Password required for new users'; errEl.classList.remove('hidden'); return; }

  try {
    const body = { username, role };
    if (password) body.password = password;
    const res = id
      ? await apiFetch(`/admin/users/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await apiFetch('/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error; errEl.classList.remove('hidden'); return; }
    resetUserForm();
    await loadUsers();
  } catch (err) {
    errEl.textContent = 'Error: ' + err.message;
    errEl.classList.remove('hidden');
  }
}

async function deleteUser(id, username) {
  if (!confirm(`Delete user "${username}"?`)) return;
  try {
    const res = await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    await loadUsers();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

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
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files[0]) handleFile(input.files[0]); });
}

async function handleFile(file) {
  showLoading('Reading Excel file...');
  try {
    const form = new FormData();
    form.append('file', file);
    const res = await apiFetch('/import-excel', { method: 'POST', body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    state.excelRows = data.rows;
    state.fileKey = `${file.name}:${data.rows.length}`;
    populateColumnDropdowns(data.columns);
    document.getElementById('column-mapping').classList.remove('hidden');
  } catch (err) {
    alert('Error: ' + err.message);
  } finally {
    hideLoading();
  }
}

function populateColumnDropdowns(columns) {
  const selects = ['col-name', 'col-street', 'col-zip', 'col-city', 'col-full-address'];
  selects.forEach(id => {
    const sel = document.getElementById(id);
    sel.innerHTML = id === 'col-full-address' ? '<option value="">-- Do not use --</option>' : '<option value="">-- Select column --</option>';
    columns.forEach(col => {
      const opt = document.createElement('option');
      opt.value = col;
      opt.textContent = col;
      sel.appendChild(opt);
    });
  });
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

  if (!colName) return alert('Please select company name column');
  if (!colFull && !colStreet) return alert('Please select address columns');

  const items = state.excelRows.map((row, i) => {
    const address = colFull && row[colFull]
      ? row[colFull]
      : [row[colStreet], row[colZip], row[colCity]].filter(Boolean).join(', ');
    return {
      id: i,
      name: row[colName] || `Entry ${i+1}`,
      address: address.trim(),
      city: (row[colCity] || '').trim()
    };
  }).filter(item => item.address);

  if (!items.length) return alert('No addresses found');

  document.getElementById('import-progress').classList.remove('hidden');
  document.getElementById('column-mapping').classList.add('hidden');
  showLoading('Geocoding addresses...');

  try {
    const res = await apiFetch('/geocode-batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresses: items })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    state.addresses = data.results.map(r => ({ ...r, selected: r.success, city: r.city || '' }));
  } catch {
    state.addresses = items.map(r => ({ ...r, success: null, selected: true }));
    console.warn('Geocoding failed, using raw addresses');
  } finally {
    state.activeCities = new Set();
    renderAddressList();
    document.getElementById('card-addresses').style.display = '';
    document.getElementById('addr-count').textContent = state.addresses.filter(a => a.selected).length;
    hideLoading();
    document.getElementById('import-progress').classList.add('hidden');
  }
}

// ─── City Filter ──────────────────────────────────────────────────────────────
function renderAddressList() {
  const list = document.getElementById('address-list');
  list.innerHTML = '';

  const cities = [...new Set(state.addresses.map(a => a.city).filter(Boolean))].sort();
  if (cities.length > 1) {
    if (state.activeCities.size === 0) {
      const saved = loadCityFilter();
      (saved ? saved.filter(c => cities.includes(c)) : cities).forEach(c => state.activeCities.add(c));
    }
    const filterDiv = document.createElement('div');
    filterDiv.className = 'city-filter';
    filterDiv.innerHTML = `<span class="city-filter-label">Cities</span>`;
    cities.forEach(city => {
      const chip = document.createElement('span');
      chip.className = 'city-chip' + (state.activeCities.has(city) ? ' active' : '');
      chip.textContent = city;
      chip.onclick = () => toggleCity(city);
      filterDiv.appendChild(chip);
    });
    list.appendChild(filterDiv);
  }

  state.addresses
    .filter(a => !a.city || state.activeCities.size === 0 || state.activeCities.has(a.city))
    .forEach(addr => {
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
          ${addr.success === true ? '✅ OK' : addr.success === false ? '❌ Error' : '⏳ Raw'}
        </span>`;
      list.appendChild(div);
    });
}

function toggleCity(city) {
  if (state.activeCities.has(city)) {
    state.activeCities.delete(city);
    state.addresses.filter(a => a.city === city).forEach(a => a.selected = false);
  } else {
    state.activeCities.add(city);
    state.addresses.filter(a => a.city === city).forEach(a => a.selected = true);
  }
  saveCityFilter();
  renderAddressList();
  document.getElementById('addr-count').textContent = state.addresses.filter(a => a.selected).length;
}

function toggleAddress(id, checked) {
  const addr = state.addresses.find(a => a.id === id);
  if (addr) addr.selected = checked;
}

function selectAll() {
  state.addresses.forEach(a => { a.selected = true; });
  state.addresses.map(a => a.city).filter(Boolean).forEach(c => state.activeCities.add(c));
  saveCityFilter();
  renderAddressList();
}

function selectNone() {
  state.addresses.forEach(a => { a.selected = false; });
  state.activeCities.clear();
  saveCityFilter();
  renderAddressList();
}

// ─── Route Building ───────────────────────────────────────────────────────────
async function buildRoute() {
  if (!state.mapsLoaded) return alert('Google Maps not loaded yet.');
  const selected = state.addresses.filter(a => a.selected);
  if (selected.length < 1) return alert('Please select at least one address');
  const startAddr = document.getElementById('start-address').value.trim();
  if (!startAddr) return alert('Please enter start address');

  const avgSpeed = parseInt(document.getElementById('avg-speed').value) || 80;
  const maxRange = parseInt(document.getElementById('max-range').value) || 400;
  const breakDuration = parseInt(document.getElementById('break-duration').value) || 30;
  const breakInterval = parseInt(document.getElementById('break-interval').value) || 200;
  const vehicleType = document.getElementById('vehicle-type').value;

  showLoading('Calculating optimized route...');
  const stops = buildStopsWithBreaks(startAddr, selected, maxRange, breakInterval, vehicleType);

  try {
    document.getElementById('setup-panel').classList.add('hidden');
    document.getElementById('route-panel').classList.remove('hidden');
    if (!state.map) initMap();
    await calculateRoute(stops, avgSpeed, breakDuration, vehicleType);
  } catch (err) {
    alert('Error calculating route: ' + err.message);
    backToSetup();
  } finally {
    hideLoading();
  }
}

function buildStopsWithBreaks(startAddr, addresses, maxRange, breakInterval, vehicleType) {
  const stops = [{ type: 'start', name: 'Start', address: startAddr }];
  let kmBreak = 0, kmFuel = 0;
  addresses.forEach(addr => {
    kmBreak += 50; kmFuel += 50;
    if (kmFuel >= maxRange * 0.85) {
      stops.push({ type: 'fuel-stop', name: vehicleType === 'electric' ? '⚡ Charging station' : '⛽ Gas station', address: addr.address, isServiceStop: true });
      kmFuel = 0;
    }
    if (kmBreak >= breakInterval) {
      stops.push({ type: 'break', name: '☕ Break', address: addr.address, isServiceStop: true });
      kmBreak = 0;
    }
    stops.push({ type: 'destination', ...addr });
  });
  return stops;
}

function initMap() {
  state.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7, center: { lat: 51.1657, lng: 10.4515 }, mapTypeControl: false, streetViewControl: false
  });
  state.directionsRenderer = new google.maps.DirectionsRenderer({ map: state.map, suppressMarkers: false });
  state.trafficLayer = new google.maps.TrafficLayer();
  state.trafficLayer.setMap(state.map);
  updateTrafficBadge();
}

function updateTrafficBadge() {
  const badge = document.getElementById('traffic-badge');
  const hour = new Date().getHours();
  const isRush = (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 19);
  const isWeekend = [0, 6].includes(new Date().getDay());
  if (isWeekend)     { badge.textContent = '🟢 Low traffic (weekend)'; badge.className = 'badge green'; }
  else if (isRush)   { badge.textContent = '🔴 Rush hour possible';    badge.className = 'badge red'; }
  else               { badge.textContent = '🟡 Normal traffic';         badge.className = 'badge orange'; }
}

async function calculateRoute(stops, avgSpeed, breakDuration, vehicleType) {
  const directionsService = new google.maps.DirectionsService();
  const destinations = stops.filter(s => s.type === 'destination' || s.type === 'start');
  const waypoints = destinations.slice(1, -1).map(s => ({
    location: s.lat && s.lng ? new google.maps.LatLng(s.lat, s.lng) : s.address,
    stopover: true
  }));

  return new Promise((resolve, reject) => {
    directionsService.route({
      origin: destinations[0].address,
      destination: destinations[destinations.length - 1].address,
      waypoints: waypoints.slice(0, 23),
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: { departureTime: getNextWeekdayMorning(), trafficModel: google.maps.TrafficModel.BEST_GUESS },
      language: 'de', region: 'DE'
    }, (result, status) => {
      if (status !== 'OK') return reject(new Error(`Directions API: ${status}`));
      state.directionsRenderer.setDirections(result);
      const legs = result.routes[0].legs;
      let totalDistance = 0, totalDuration = 0;
      legs.forEach(leg => {
        totalDistance += leg.distance.value;
        totalDuration += (leg.duration_in_traffic || leg.duration).value;
      });
      totalDistance = Math.round(totalDistance / 1000);
      totalDuration = Math.round(totalDuration / 60);
      const breakCount = Math.floor(totalDistance / 200);
      const fuelCount = Math.floor(totalDistance / (parseInt(document.getElementById('max-range').value) * 0.85 || 340));
      const orderedDestinations = [destinations[0]];
      result.routes[0].waypoint_order.forEach(i => orderedDestinations.push(destinations.slice(1, -1)[i]));
      if (destinations.length > 1) orderedDestinations.push(destinations[destinations.length - 1]);
      state.route = { stops: orderedDestinations, totalDistance, totalDuration: totalDuration + breakCount * breakDuration + fuelCount * 20, breakCount, fuelCount, result, vehicleType };
      renderRouteDetails();
      resolve();
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
  const hours = Math.floor(r.totalDuration / 60), mins = r.totalDuration % 60;
  document.getElementById('route-summary').innerHTML = `
    <div class="summary-item"><div class="value">${r.totalDistance} km</div><div class="label">Total distance</div></div>
    <div class="summary-item"><div class="value">${hours}h ${mins}m</div><div class="label">Drive time incl. breaks</div></div>
    <div class="summary-item"><div class="value">${r.stops.length - 1}</div><div class="label">Stops</div></div>`;

  const stopList = document.getElementById('stop-list');
  stopList.innerHTML = '';
  r.stops.forEach((stop, i) => {
    if (i > 0 && r.breakCount > 0 && i % Math.ceil(r.stops.length / (r.breakCount + 1)) === 0) {
      stopList.appendChild(createStopEl({ type: 'break', name: '☕ Break (~30 min)', address: 'Rest area recommended' }));
    }
    const leg = r.result.routes[0].legs[i > 0 ? i - 1 : 0];
    stopList.appendChild(createStopEl({
      type: i === 0 ? 'start' : 'destination',
      name: stop.name,
      address: stop.formatted_address || stop.address,
      meta: i > 0 && leg ? `${leg.distance.text} · ${(leg.duration_in_traffic || leg.duration).text}` : ''
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
  const origin = encodeURIComponent(stops[0].formatted_address || stops[0].address);
  const dest = encodeURIComponent(stops[stops.length - 1].formatted_address || stops[stops.length - 1].address);
  const wps = stops.slice(1, -1).map(s => encodeURIComponent(s.formatted_address || s.address)).join('|');
  window.open(`https://www.google.de/maps/dir/${origin}/${wps ? wps + '/' : ''}${dest}`, '_blank');
}

function exportRoute() {
  if (!state.route) return;
  const r = state.route;
  const hours = Math.floor(r.totalDuration / 60), mins = r.totalDuration % 60;
  let text = `Route Plan\n${'='.repeat(40)}\nTotal distance: ${r.totalDistance} km\nDrive time (incl. breaks): ${hours}h ${mins}m\n\nStops:\n`;
  r.stops.forEach((s, i) => { text += `${i + 1}. ${s.name}\n   ${s.formatted_address || s.address}\n`; });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = 'route.txt';
  a.click();
}

function backToSetup() {
  document.getElementById('route-panel').classList.add('hidden');
  document.getElementById('setup-panel').classList.remove('hidden');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showLoading(text) {
  document.getElementById('loading-text').textContent = text || 'Loading...';
  document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() { document.getElementById('loading').classList.add('hidden'); }

function saveCityFilter() {
  if (!state.fileKey) return;
  localStorage.setItem('cityFilter:' + state.fileKey, JSON.stringify([...state.activeCities]));
}

function loadCityFilter() {
  if (!state.fileKey) return null;
  const raw = localStorage.getItem('cityFilter:' + state.fileKey);
  return raw ? JSON.parse(raw) : null;
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
