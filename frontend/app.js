// ─── Translations ─────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  de: {
    'login-username': 'Benutzername',
    'login-password': 'Passwort',
    'login-submit': 'Anmelden',
    'signin-btn': 'Anmelden',
    'signout-btn': 'Abmelden',
    'admin-btn': '⚙️ Admin',
    'settings-title': '⚙️ Fahrzeug & Einstellungen',
    'settings-start-label': 'Startadresse (Heimatort)',
    'settings-start-placeholder': 'z.B. Musterstraße 1, 12345 Berlin',
    'settings-speed-label': 'Ø Geschwindigkeit (km/h)',
    'settings-range-label': 'Max. Reichweite (km)',
    'settings-vehicle-label': 'Fahrzeugtyp',
    'settings-combustion': '🚗 Verbrenner',
    'settings-electric': '⚡ Elektroauto',
    'settings-break-duration': 'Pausendauer (Min)',
    'settings-break-interval': 'Pause alle (km)',
    'settings-visit-label': 'Ø Besuchszeit pro Kunde (Min)',
    'import-title': '📂 Excel importieren',
    'import-drop-line1': 'Excel-Datei hier ablegen',
    'import-drop-line2': 'oder klicken zum Auswählen',
    'import-map-title': 'Spalten zuordnen',
    'import-col-name': 'Firmenname',
    'import-col-street': 'Straße',
    'import-col-zip': 'PLZ',
    'import-col-city': 'Stadt',
    'import-col-full': 'Oder: Vollständige Adresse (eine Spalte)',
    'import-process-btn': '📍 Adressen verarbeiten',
    'import-processing': 'Verarbeite...',
    'addr-title': '📋 Adressen',
    'addr-select-all': 'Alle auswählen',
    'addr-select-none': 'Keine',
    'addr-build-route': '🗺️ Route berechnen',
    'traffic-loading': '🔄 Lade Verkehrsdaten...',
    'route-title': '📍 Routendetails',
    'route-back': '← Zurück',
    'route-open-maps': '🗺️ In Google Maps öffnen',
    'route-export': '💾 Route exportieren',
    'admin-title': '⚙️ Benutzerverwaltung',
    'admin-col-username': 'Benutzername',
    'admin-col-role': 'Rolle',
    'admin-col-created': 'Erstellt',
    'admin-form-add': 'Benutzer hinzufügen',
    'admin-form-edit': 'Benutzer bearbeiten',
    'admin-username-label': 'Benutzername',
    'admin-password-label': 'Passwort',
    'admin-password-placeholder': 'Leer lassen zum Behalten',
    'admin-role-label': 'Rolle',
    'role-user': 'Benutzer',
    'role-admin': 'Admin',
    'admin-save': 'Speichern',
    'admin-cancel': 'Abbrechen',
    'loading-default': 'Lade...',
    // dynamic
    'status-api-ok': '✅ API Key aktiv',
    'status-no-key': '⚠️ Kein API Key konfiguriert',
    'status-unreachable': '⚠️ Backend nicht erreichbar',
    'theme-dark': '🌙 Dunkel',
    'theme-light': '☀️ Hell',
    'lang-toggle': '🇬🇧 EN',
    'traffic-weekend': '🟢 Geringer Verkehr (Wochenende)',
    'traffic-rush': '🔴 Stoßzeiten möglich',
    'traffic-normal': '🟡 Normaler Verkehr',
    'stop-fuel-electric': '⚡ Ladestation',
    'stop-fuel-combustion': '⛽ Tankstelle',
    'stop-break': '☕ Pause',
    'stop-break-detail': '☕ Pause (~30 Min)',
    'stop-break-address': 'Rastplatz empfohlen',
    'summary-distance': 'Gesamtstrecke',
    'summary-duration': 'Fahrzeit inkl. Pausen',
    'summary-stops': 'Haltestellen',
    'cities-label': 'Städte',
    'col-select': '-- Spalte wählen --',
    'col-none': '-- Nicht verwenden --',
    'loading-excel': 'Lese Excel-Datei...',
    'loading-geocode': 'Adressen geocodieren...',
    'loading-route': 'Optimierte Route berechnen...',
    'alert-maps-not-loaded': 'Google Maps noch nicht geladen.',
    'alert-select-one': 'Bitte mindestens eine Adresse auswählen',
    'alert-enter-start': 'Bitte Startadresse eingeben',
    'alert-route-error': 'Fehler beim Berechnen der Route: ',
    'alert-select-name-col': 'Bitte Firmenname-Spalte auswählen',
    'alert-select-addr-col': 'Bitte Adressspalten auswählen',
    'alert-no-addresses': 'Keine Adressen gefunden',
    'alert-load-users-error': 'Fehler beim Laden der Benutzer: ',
    'alert-delete-user': 'Benutzer "{name}" löschen?',
    'alert-user-error': 'Fehler: ',
    'alert-username-required': 'Benutzername erforderlich',
    'alert-password-required': 'Passwort für neue Benutzer erforderlich',
    'alert-connection-error': 'Verbindungsfehler',
    'edit-btn': 'Bearbeiten',
    'delete-btn': 'Löschen',
    'export-title': 'Routenplan',
    'export-distance': 'Gesamtstrecke',
    'export-duration': 'Fahrzeit (inkl. Pausen)',
    'export-stops': 'Haltestellen',
  },
  en: {
    'login-username': 'Username',
    'login-password': 'Password',
    'login-submit': 'Sign in',
    'signin-btn': 'Sign in',
    'signout-btn': 'Sign out',
    'admin-btn': '⚙️ Admin',
    'settings-title': '⚙️ Vehicle & Settings',
    'settings-start-label': 'Start Address (Home)',
    'settings-start-placeholder': 'e.g. 123 Main St, City',
    'settings-speed-label': 'Avg Speed (km/h)',
    'settings-range-label': 'Max Range (km)',
    'settings-vehicle-label': 'Vehicle Type',
    'settings-combustion': '🚗 Combustion',
    'settings-electric': '⚡ Electric',
    'settings-break-duration': 'Break Duration (min)',
    'settings-break-interval': 'Break Every (km)',
    'settings-visit-label': 'Avg Visit Time per Customer (min)',
    'import-title': '📂 Import Excel',
    'import-drop-line1': 'Drop Excel file here',
    'import-drop-line2': 'or click to select',
    'import-map-title': 'Map Columns',
    'import-col-name': 'Company Name',
    'import-col-street': 'Street',
    'import-col-zip': 'ZIP',
    'import-col-city': 'City',
    'import-col-full': 'Or: Full Address (one column)',
    'import-process-btn': '📍 Process Addresses',
    'import-processing': 'Processing...',
    'addr-title': '📋 Addresses',
    'addr-select-all': 'Select All',
    'addr-select-none': 'None',
    'addr-build-route': '🗺️ Calculate Route',
    'traffic-loading': '🔄 Loading traffic data...',
    'route-title': '📍 Route Details',
    'route-back': '← Back',
    'route-open-maps': '🗺️ Open in Google Maps',
    'route-export': '💾 Export Route',
    'admin-title': '⚙️ User Management',
    'admin-col-username': 'Username',
    'admin-col-role': 'Role',
    'admin-col-created': 'Created',
    'admin-form-add': 'Add User',
    'admin-form-edit': 'Edit User',
    'admin-username-label': 'Username',
    'admin-password-label': 'Password',
    'admin-password-placeholder': 'Leave empty to keep',
    'admin-role-label': 'Role',
    'role-user': 'User',
    'role-admin': 'Admin',
    'admin-save': 'Save',
    'admin-cancel': 'Cancel',
    'loading-default': 'Loading...',
    // dynamic
    'status-api-ok': '✅ API Key active',
    'status-no-key': '⚠️ No API Key configured',
    'status-unreachable': '⚠️ Backend unreachable',
    'theme-dark': '🌙 Dark',
    'theme-light': '☀️ Light',
    'lang-toggle': '🇩🇪 DE',
    'traffic-weekend': '🟢 Low traffic (weekend)',
    'traffic-rush': '🔴 Rush hour possible',
    'traffic-normal': '🟡 Normal traffic',
    'stop-fuel-electric': '⚡ Charging station',
    'stop-fuel-combustion': '⛽ Gas station',
    'stop-break': '☕ Break',
    'stop-break-detail': '☕ Break (~30 min)',
    'stop-break-address': 'Rest area recommended',
    'summary-distance': 'Total distance',
    'summary-duration': 'Drive time incl. breaks',
    'summary-stops': 'Stops',
    'cities-label': 'Cities',
    'col-select': '-- Select column --',
    'col-none': '-- Do not use --',
    'loading-excel': 'Reading Excel file...',
    'loading-geocode': 'Geocoding addresses...',
    'loading-route': 'Calculating optimized route...',
    'alert-maps-not-loaded': 'Google Maps not loaded yet.',
    'alert-select-one': 'Please select at least one address',
    'alert-enter-start': 'Please enter start address',
    'alert-route-error': 'Error calculating route: ',
    'alert-select-name-col': 'Please select company name column',
    'alert-select-addr-col': 'Please select address columns',
    'alert-no-addresses': 'No addresses found',
    'alert-load-users-error': 'Error loading users: ',
    'alert-delete-user': 'Delete user "{name}"?',
    'alert-user-error': 'Error: ',
    'alert-username-required': 'Username required',
    'alert-password-required': 'Password required for new users',
    'alert-connection-error': 'Connection error',
    'edit-btn': 'Edit',
    'delete-btn': 'Delete',
    'export-title': 'Route Plan',
    'export-distance': 'Total distance',
    'export-duration': 'Drive time (incl. breaks)',
    'export-stops': 'Stops',
  }
};

function t(key) {
  return (TRANSLATIONS[state.lang] || TRANSLATIONS.de)[key] || key;
}

function applyLang(lang) {
  state.lang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) el.textContent = text;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = t(key);
    if (text) el.placeholder = text;
  });
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.textContent = t('lang-toggle');
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeBtn.textContent = isDark ? t('theme-light') : t('theme-dark');
  }
}

function toggleLang() {
  applyLang(state.lang === 'de' ? 'en' : 'de');
}

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  apiKey: '',
  lang: localStorage.getItem('lang') || 'de',
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
  homeAddress: '',
  weekPlan: { selectedDays: [], calOffset: 0 },
};

const BACKEND = '/api';

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme') || 'light');
  applyLang(state.lang);
  if (state.token) { verifyToken(); loadHomeAddress(); }
  showApp();
});

async function verifyToken() {
  try {
    const res = await apiFetch('/auth/me');
    if (!res.ok) { clearAuth(); return; }
    const data = await res.json();
    state.user = data.user;
    localStorage.setItem('user', JSON.stringify(state.user));
    updateHeaderAuth();
  } catch {
    clearAuth();
  }
}

function showLogin() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
}

function hideLogin() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
}

function showApp() {
  document.getElementById('main-app').classList.remove('hidden');
  document.getElementById('login-screen').classList.add('hidden');
  updateHeaderAuth();
  setupDropZone();
  checkConfig();
}

function updateHeaderAuth() {
  const userEl = document.getElementById('header-user');
  const adminBtn = document.getElementById('admin-btn');
  const routesBtn = document.getElementById('routes-btn');
  const saveRouteBtn = document.getElementById('save-route-btn');
  const signInBtn = document.getElementById('signin-btn');
  const signOutBtn = document.getElementById('signout-btn');
  if (state.user) {
    userEl.textContent = '👤 ' + state.user.username;
    if (state.user.role === 'admin') adminBtn.classList.remove('hidden');
    if (routesBtn) routesBtn.classList.remove('hidden');
    if (saveRouteBtn) saveRouteBtn.classList.remove('hidden');
    signInBtn.classList.add('hidden');
    signOutBtn.classList.remove('hidden');
  } else {
    userEl.textContent = '';
    adminBtn.classList.add('hidden');
    if (routesBtn) routesBtn.classList.add('hidden');
    if (saveRouteBtn) saveRouteBtn.classList.add('hidden');
    signInBtn.classList.remove('hidden');
    signOutBtn.classList.add('hidden');
  }
  updateHomeAddressUI();
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
    hideLogin();
    updateHeaderAuth();
    loadHomeAddress();
  } catch {
    errEl.textContent = t('alert-connection-error');
    errEl.classList.remove('hidden');
  }
}

function logout() {
  clearAuth();
  updateHeaderAuth();
}

function clearAuth() {
  state.token = '';
  state.user = null;
  state.homeAddress = '';
  updateHomeAddressUI();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}


// ─── Home Address ─────────────────────────────────────────────────────────────
async function loadHomeAddress() {
  if (!state.token) return;
  try {
    const res = await apiFetch('/profile');
    if (!res.ok) return;
    const user = await res.json();
    state.homeAddress = user.homeAddress || '';
    updateHomeAddressUI();
  } catch {}
}

function updateHomeAddressUI() {
  const dl = document.getElementById('home-addr-list');
  const useBtn = document.getElementById('use-home-addr-btn');
  const saveBtn = document.getElementById('save-home-addr-btn');
  if (dl) {
    dl.innerHTML = state.homeAddress
      ? '<option value="' + state.homeAddress.replace(/"/g, '&quot;') + '">&#127968; Heimatadresse</option>'
      : '';
  }
  if (useBtn) useBtn.style.display = state.homeAddress && state.token ? '' : 'none';
  if (saveBtn) saveBtn.style.display = state.token ? '' : 'none';
}

function useHomeAddress() {
  if (state.homeAddress) document.getElementById('start-address').value = state.homeAddress;
}

async function saveHomeAddress() {
  const addr = document.getElementById('start-address').value.trim();
  if (!addr) return alert(t('alert-enter-start'));
  try {
    const res = await apiFetch('/profile/home-address', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ homeAddress: addr })
    });
    if (!res.ok) return;
    state.homeAddress = addr;
    updateHomeAddressUI();
    const btn = document.getElementById('save-home-addr-btn');
    if (btn) { const orig = btn.textContent; btn.textContent = '✓ Gespeichert!'; setTimeout(() => btn.textContent = orig, 2000); }
  } catch {}
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
  if (btn) btn.textContent = theme === 'dark' ? t('theme-light') : t('theme-dark');
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
      setStatus(t('status-api-ok'), 'ok');
      loadGoogleMaps(cfg.apiKey);
    } else {
      setStatus(t('status-no-key'), 'error');
    }
  } catch {
    setStatus(t('status-unreachable'), 'error');
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
  showAdminTab('users');
  await loadUsers();
}

function showAdminTab(tab) {
  document.getElementById('admin-tab-users').classList.toggle('hidden', tab !== 'users');
  document.getElementById('admin-tab-logs').classList.toggle('hidden', tab !== 'logs');
  document.getElementById('tab-users').classList.toggle('active', tab === 'users');
  document.getElementById('tab-logs').classList.toggle('active', tab === 'logs');
  if (tab === 'logs') loadLogs();
}

async function loadLogs() {
  try {
    const res = await apiFetch('/admin/logs');
    if (!res.ok) {
      document.getElementById('logs-tbody').innerHTML =
        '<tr><td colspan="5" style="padding:16px;text-align:center;color:var(--danger,#ef4444)">' +
        'Fehler ' + res.status + ' – Backend mit neuem server.js neu starten.</td></tr>';
      if (document.getElementById('log-count')) document.getElementById('log-count').textContent = '';
      return;
    }
    const logs = await res.json();
    renderLogs(Array.isArray(logs) ? logs : []);
  } catch (err) {
    document.getElementById('logs-tbody').innerHTML =
      '<tr><td colspan="5" style="padding:16px;text-align:center">Fehler: ' + err.message + '</td></tr>';
  }
}

function renderLogs(logs) {
  const tbody = document.getElementById('logs-tbody');
  const countEl = document.getElementById('log-count');
  if (countEl) countEl.textContent = logs.length + ' Einträge';
  if (!logs.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="padding:20px;text-align:center;opacity:.6">Keine Einträge vorhanden</td></tr>';
    return;
  }
  const actionLabel = { login: '🔑 Anmeldung', import: '📂 Import', geocode: '📍 Geocodierung' };
  tbody.innerHTML = logs.map(l => {
    const d = new Date(l.timestamp);
    const dateStr = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    let details = '–';
    if (l.action === 'import')  details = escHtml((l.filename || '') + ' (' + (l.rows || 0) + ' Zeilen)');
    if (l.action === 'geocode') details = (l.count || 0) + ' Adressen';
    const dur = l.duration_ms != null ? (l.duration_ms / 1000).toFixed(1) + ' s' : '–';
    return `<tr>
      <td style="white-space:nowrap">${dateStr}</td>
      <td><strong>${escHtml(l.user)}</strong></td>
      <td>${actionLabel[l.action] || escHtml(l.action)}</td>
      <td>${details}</td>
      <td>${dur}</td>
    </tr>`;
  }).join('');
}

async function clearLogs() {
  if (!confirm('Protokoll wirklich leeren?')) return;
  await apiFetch('/admin/logs', { method: 'DELETE' });
  await loadLogs();
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
        <td><span class="role-badge ${u.role}">${t('role-' + u.role)}</span></td>
        <td>${new Date(u.createdAt).toLocaleDateString()}</td>
        <td>
          <button class="btn-table" onclick="editUser(${u.id},'${escHtml(u.username)}','${u.role}')">${t('edit-btn')}</button>
          ${u.id !== state.user.id ? `<button class="btn-table danger" onclick="deleteUser(${u.id},'${escHtml(u.username)}')">${t('delete-btn')}</button>` : ''}
        </td>
      </tr>`).join('');
  } catch (err) {
    alert(t('alert-load-users-error') + err.message);
  }
}

function editUser(id, username, role) {
  document.getElementById('uf-id').value = id;
  document.getElementById('uf-username').value = username;
  document.getElementById('uf-password').value = '';
  document.getElementById('uf-role').value = role;
  document.getElementById('user-form-title').textContent = t('admin-form-edit');
}

function resetUserForm() {
  document.getElementById('uf-id').value = '';
  document.getElementById('uf-username').value = '';
  document.getElementById('uf-password').value = '';
  document.getElementById('uf-role').value = 'user';
  document.getElementById('user-form-title').textContent = t('admin-form-add');
  document.getElementById('user-form-error').classList.add('hidden');
}

async function saveUser() {
  const id = document.getElementById('uf-id').value;
  const username = document.getElementById('uf-username').value.trim();
  const password = document.getElementById('uf-password').value;
  const role = document.getElementById('uf-role').value;
  const errEl = document.getElementById('user-form-error');
  errEl.classList.add('hidden');

  if (!username) { errEl.textContent = t('alert-username-required'); errEl.classList.remove('hidden'); return; }
  if (!id && !password) { errEl.textContent = t('alert-password-required'); errEl.classList.remove('hidden'); return; }

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
    errEl.textContent = t('alert-user-error') + err.message;
    errEl.classList.remove('hidden');
  }
}

async function deleteUser(id, username) {
  if (!confirm(t('alert-delete-user').replace('{name}', username))) return;
  try {
    const res = await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    await loadUsers();
  } catch (err) {
    alert(t('alert-user-error') + err.message);
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
  showLoading(t('loading-excel'));
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
    sel.innerHTML = id === 'col-full-address'
      ? `<option value="">${t('col-none')}</option>`
      : `<option value="">${t('col-select')}</option>`;
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

  if (!colName) return alert(t('alert-select-name-col'));
  if (!colFull && !colStreet) return alert(t('alert-select-addr-col'));

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

  if (!items.length) return alert(t('alert-no-addresses'));

  document.getElementById('import-progress').classList.remove('hidden');
  document.getElementById('column-mapping').classList.add('hidden');
  showLoading(t('loading-geocode'));

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
    const filterDiv = document.createElement('div');
    filterDiv.className = 'city-filter';
    filterDiv.innerHTML = `<span class="city-filter-label">${t('cities-label')}</span>`;
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
    // First chip click from empty state → deselect all other cities first
    if (state.activeCities.size === 0) {
      state.addresses.filter(a => a.city !== city).forEach(a => a.selected = false);
    }
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
  if (!state.mapsLoaded) return alert(t('alert-maps-not-loaded'));
  const selected = state.addresses.filter(a => a.selected);
  if (selected.length < 1) return alert(t('alert-select-one'));
  const startAddr = document.getElementById('start-address').value.trim();
  if (!startAddr) return alert(t('alert-enter-start'));

  const avgSpeed = parseInt(document.getElementById('avg-speed').value) || 80;
  const maxRange = parseInt(document.getElementById('max-range').value) || 400;
  const breakDuration = parseInt(document.getElementById('break-duration').value) || 30;
  const breakInterval = parseInt(document.getElementById('break-interval').value) || 200;
  const vehicleType = document.getElementById('vehicle-type').value;
  const visitDuration = parseInt(document.getElementById('avg-visit-time').value) || 60;
  const wantFastfood = document.getElementById('fastfood-stop').checked;
  const wantDKV      = document.getElementById('dkv-stop').checked;

  showLoading(t('loading-route'));
  let stops = buildStopsWithBreaks(startAddr, selected, maxRange, breakInterval, vehicleType);

  try {
    document.getElementById('setup-panel').classList.add('hidden');
    document.getElementById('route-panel').classList.remove('hidden');
    if (!state.map) initMap();
    if (wantFastfood) {
      const ff = await findFastfoodNearMidpoint(selected);
      if (ff) stops.splice(Math.floor(stops.length / 2), 0, ff);
    }
    if (wantDKV) {
      const dkv = await findDKVStation(selected);
      if (dkv) stops.splice(Math.floor(stops.length * 0.75), 0, dkv);
    }
    await calculateRoute(stops, avgSpeed, breakDuration, vehicleType, visitDuration);
  } catch (err) {
    alert(t('alert-route-error') + err.message);
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
      stops.push({ type: 'fuel-stop', name: vehicleType === 'electric' ? t('stop-fuel-electric') : t('stop-fuel-combustion'), address: addr.address, isServiceStop: true });
      kmFuel = 0;
    }
    if (kmBreak >= breakInterval) {
      stops.push({ type: 'break', name: t('stop-break'), address: addr.address, isServiceStop: true });
      kmBreak = 0;
    }
    stops.push({ type: 'destination', ...addr });
  });
  return stops;
}

function findFastfoodNearMidpoint(addresses) {
  const withCoords = addresses.filter(a => a.lat && a.lng);
  if (!withCoords.length) return Promise.resolve(null);
  const lat = withCoords.reduce((s, a) => s + parseFloat(a.lat), 0) / withCoords.length;
  const lng = withCoords.reduce((s, a) => s + parseFloat(a.lng), 0) / withCoords.length;
  const center = new google.maps.LatLng(lat, lng);
  const service = new google.maps.places.PlacesService(state.map);
  const search = keyword => new Promise(resolve => {
    service.nearbySearch(
      { location: center, radius: 20000, keyword },
      (results, status) => resolve(
        status === google.maps.places.PlacesServiceStatus.OK && results && results.length
          ? results[0] : null
      )
    );
  });
  return Promise.all([search("McDonald's"), search('Burger King')]).then(([mc, bk]) => {
    const p = mc || bk;
    if (!p) return null;
    return {
      type: 'fastfood',
      name: '🍔 ' + p.name,
      address: p.vicinity,
      lat: p.geometry.location.lat(),
      lng: p.geometry.location.lng(),
    };
  });
}

function findDKVStation(addresses) {
  const withCoords = addresses.filter(a => a.lat && a.lng);
  if (!withCoords.length) return Promise.resolve(null);
  const lat = withCoords.reduce((s, a) => s + parseFloat(a.lat), 0) / withCoords.length;
  const lng = withCoords.reduce((s, a) => s + parseFloat(a.lng), 0) / withCoords.length;
  const center = new google.maps.LatLng(lat, lng);
  const service = new google.maps.places.PlacesService(state.map);
  const DKV_BRANDS = ['aral', 'shell', 'total', 'esso', 'jet', 'hem', 'agip', 'eni', 'omv', 'q1', 'tamoil', 'avia', 'bft', 'orlen', 'westfalen', 'star', 'allguth', 'score', 'tankpoint'];
  const search = keyword => new Promise(resolve => {
    const req = { location: center, radius: 25000, type: 'gas_station' };
    if (keyword) req.keyword = keyword;
    service.nearbySearch(req, (results, status) =>
      resolve(status === google.maps.places.PlacesServiceStatus.OK && results ? results : [])
    );
  });
  return Promise.all([search('Autobahn Tankstelle'), search(null)]).then(([highway, general]) => {
    const all = [...highway, ...general];
    const p = all.find(r => DKV_BRANDS.some(b => r.name.toLowerCase().includes(b)));
    if (!p) return null;
    return {
      type: 'dkv',
      name: '⛽ ' + p.name + ' (DKV)',
      address: p.vicinity,
      lat: p.geometry.location.lat(),
      lng: p.geometry.location.lng(),
    };
  });
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
  if (isWeekend)     { badge.textContent = t('traffic-weekend'); badge.className = 'badge green'; }
  else if (isRush)   { badge.textContent = t('traffic-rush');    badge.className = 'badge red'; }
  else               { badge.textContent = t('traffic-normal');  badge.className = 'badge orange'; }
}

async function calculateRoute(stops, avgSpeed, breakDuration, vehicleType, visitDuration = 0) {
  const directionsService = new google.maps.DirectionsService();
  const destinations = stops.filter(s => ['destination', 'start', 'fastfood', 'dkv'].includes(s.type));
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
      const destinationCount = stops.filter(s => s.type === 'destination').length;
      const orderedDestinations = [destinations[0]];
      result.routes[0].waypoint_order.forEach(i => orderedDestinations.push(destinations.slice(1, -1)[i]));
      if (destinations.length > 1) orderedDestinations.push(destinations[destinations.length - 1]);
      state.route = { stops: orderedDestinations, totalDistance, totalDuration: totalDuration + breakCount * breakDuration + fuelCount * 20 + destinationCount * visitDuration, breakCount, fuelCount, result, vehicleType, visitDuration, destinationCount };
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
  const visitItem = r.visitDuration > 0
    ? `<div class="summary-item"><div class="value">${r.visitDuration} Min</div><div class="label">Ø Besuchszeit</div></div>`
    : '';
  document.getElementById('route-summary').innerHTML = `
    <div class="summary-item"><div class="value">${r.totalDistance} km</div><div class="label">${t('summary-distance')}</div></div>
    <div class="summary-item"><div class="value">${hours}h ${mins}m</div><div class="label">${t('summary-duration')}</div></div>
    <div class="summary-item"><div class="value">${r.stops.length - 1}</div><div class="label">${t('summary-stops')}</div></div>
    ${visitItem}`;

  const stopList = document.getElementById('stop-list');
  stopList.innerHTML = '';
  r.stops.forEach((stop, i) => {
    if (i > 0 && r.breakCount > 0 && i % Math.ceil(r.stops.length / (r.breakCount + 1)) === 0) {
      stopList.appendChild(createStopEl({ type: 'break', name: t('stop-break-detail'), address: t('stop-break-address') }));
    }
    const leg = r.result.routes[0].legs[i > 0 ? i - 1 : 0];
    stopList.appendChild(createStopEl({
      type: stop.type || (i === 0 ? 'start' : 'destination'),
      name: stop.name,
      address: stop.formatted_address || stop.address,
      meta: i > 0 && leg ? `${leg.distance.text} · ${(leg.duration_in_traffic || leg.duration).text}` : ''
    }));
  });
}

function createStopEl({ type, name, address, meta }) {
  const div = document.createElement('div');
  const typeClass = { 'break': 'break-stop', 'start': 'start-stop', 'fuel-stop': 'fuel-stop', 'fastfood': 'fastfood-stop', 'dkv': 'dkv-stop' };
  div.className = `stop-item ${typeClass[type] || ''}`;
  const icons = { start: '🏠', destination: '📍', break: '☕', 'fuel-stop': '⛽', fastfood: '🍔', dkv: '⛽' };
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

function openInAppleMaps() {
  if (!state.route) return;
  const stops = state.route.stops;
  const first = stops[0];
  const last  = stops[stops.length - 1];
  const saddr = first.lat && first.lng
    ? `${first.lat},${first.lng}`
    : encodeURIComponent(first.formatted_address || first.address);
  const daddr = last.lat && last.lng
    ? `${last.lat},${last.lng}`
    : encodeURIComponent(last.formatted_address || last.address);
  // maps:// opens natively on iOS/macOS, https fallback works everywhere
  const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
  const url = isApple
    ? `maps://?saddr=${saddr}&daddr=${daddr}&dirflg=d`
    : `https://maps.apple.com/?saddr=${saddr}&daddr=${daddr}&dirflg=d`;
  window.open(url, '_blank');
}

function exportRoute() {
  if (!state.route) return;
  const r = state.route;
  const hours = Math.floor(r.totalDuration / 60), mins = r.totalDuration % 60;
  let text = `${t('export-title')}\n${'='.repeat(40)}\n${t('export-distance')}: ${r.totalDistance} km\n${t('export-duration')}: ${hours}h ${mins}m\n\n${t('export-stops')}:\n`;
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

// ─── Saved Routes ─────────────────────────────────────────────────────────────
async function openSavedRoutes() {
  document.getElementById('routes-modal').classList.remove('hidden');
  await loadRoutesList();
}

function closeSavedRoutes() {
  document.getElementById('routes-modal').classList.add('hidden');
}

async function loadRoutesList() {
  const content = document.getElementById('routes-list-content');
  try {
    const res = await apiFetch('/routes');
    if (!res.ok) { content.innerHTML = '<p style="color:var(--danger,#ef4444);padding:16px">Fehler beim Laden.</p>'; return; }
    const routes = await res.json();
    if (!routes.length) {
      content.innerHTML = '<p style="opacity:.6;text-align:center;padding:20px">Noch keine Routen gespeichert.</p>';
      return;
    }
    content.innerHTML = routes.reverse().map(r => {
      const d = new Date(r.createdAt);
      const dateStr = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const h = Math.floor((r.summary.totalDuration || 0) / 60), m = (r.summary.totalDuration || 0) % 60;
      const parts = [];
      if (r.summary.totalDistance) parts.push(r.summary.totalDistance + ' km');
      if (r.summary.totalDuration)  parts.push(h + 'h ' + m + 'm');
      if (r.summary.destinationCount) parts.push(r.summary.destinationCount + ' Kunden');
      return `<div class="saved-route-item">
        <div class="saved-route-info">
          <div class="saved-route-name">${escHtml(r.name)}</div>
          <div class="saved-route-meta">${dateStr}${parts.length ? ' · ' + parts.join(' · ') : ''}</div>
        </div>
        <div class="saved-route-btns">
          <button class="btn-primary" onclick="loadSavedRoute(${r.id})">▶ Laden</button>
          <button class="btn-secondary" style="color:var(--danger,#ef4444)" onclick="deleteSavedRoute(${r.id})">🗑</button>
        </div>
      </div>`;
    }).join('');
  } catch (err) {
    content.innerHTML = '<p style="color:var(--danger,#ef4444);padding:16px">Fehler: ' + escHtml(err.message) + '</p>';
  }
}

async function saveCurrentRoute() {
  if (!state.route) return;
  const name = prompt('Routenname (z.B. "Montag KW21"):');
  if (name === null) return;
  const settings = {
    startAddress: document.getElementById('start-address').value.trim(),
    avgSpeed: document.getElementById('avg-speed').value,
    maxRange: document.getElementById('max-range').value,
    breakDuration: document.getElementById('break-duration').value,
    breakInterval: document.getElementById('break-interval').value,
    vehicleType: document.getElementById('vehicle-type').value,
    visitDuration: document.getElementById('avg-visit-time').value,
    fastfoodStop: document.getElementById('fastfood-stop').checked,
  };
  const addresses = state.addresses.filter(a => a.selected);
  const summary = {
    totalDistance: state.route.totalDistance,
    totalDuration: state.route.totalDuration,
    destinationCount: state.route.destinationCount || addresses.length,
  };
  try {
    const res = await apiFetch('/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim() || 'Route ' + new Date().toLocaleDateString('de-DE'), addresses, settings, summary })
    });
    if (!res.ok) { alert('Fehler beim Speichern.'); return; }
    const btn = document.getElementById('save-route-btn');
    if (btn) { const orig = btn.textContent; btn.textContent = '✓ Gespeichert!'; setTimeout(() => btn.textContent = orig, 2000); }
  } catch (err) { alert('Fehler: ' + err.message); }
}

async function loadSavedRoute(id) {
  try {
    showLoading('Route laden...');
    const res = await apiFetch('/routes/' + id);
    if (!res.ok) { hideLoading(); alert('Route nicht gefunden.'); return; }
    const saved = await res.json();
    const s = saved.settings;
    document.getElementById('start-address').value  = s.startAddress  || '';
    document.getElementById('avg-speed').value       = s.avgSpeed       || 80;
    document.getElementById('max-range').value       = s.maxRange       || 400;
    document.getElementById('break-duration').value  = s.breakDuration  || 30;
    document.getElementById('break-interval').value  = s.breakInterval  || 200;
    document.getElementById('vehicle-type').value    = s.vehicleType    || 'car';
    document.getElementById('avg-visit-time').value  = s.visitDuration  || 60;
    document.getElementById('fastfood-stop').checked = s.fastfoodStop   || false;
    state.addresses = saved.addresses.map(a => ({ ...a, selected: true }));
    state.activeCities = new Set();
    state.fileKey = 'saved:' + id;
    closeSavedRoutes();
    document.getElementById('route-panel').classList.add('hidden');
    document.getElementById('setup-panel').classList.remove('hidden');
    document.getElementById('card-addresses').style.display = '';
    document.getElementById('addr-count').textContent = state.addresses.length;
    renderAddressList();
    hideLoading();
    await buildRoute();
  } catch (err) {
    hideLoading();
    alert('Fehler beim Laden: ' + err.message);
  }
}

async function deleteSavedRoute(id) {
  if (!confirm('Route wirklich löschen?')) return;
  try {
    const res = await apiFetch('/routes/' + id, { method: 'DELETE' });
    if (!res.ok) { alert('Fehler beim Löschen.'); return; }
    await loadRoutesList();
  } catch (err) { alert('Fehler: ' + err.message); }
}

// ─── Week Planner ─────────────────────────────────────────────────────────────
function openWeekPlanner() {
  const selected = state.addresses.filter(a => a.selected);
  if (!selected.length) { alert('Bitte zuerst Adressen auswählen.'); return; }
  document.getElementById('week-modal').classList.remove('hidden');
  renderWeekCal();
  updateWeekDayList();
  updateWeekPreview();
}

function closeWeekPlanner() {
  document.getElementById('week-modal').classList.add('hidden');
}

function shiftWeekCal(dir) {
  state.weekPlan.calOffset += dir;
  renderWeekCal();
}

function renderWeekCal() {
  const today = new Date(); today.setHours(0,0,0,0);
  const ref   = new Date(today.getFullYear(), today.getMonth() + state.weekPlan.calOffset, 1);
  document.getElementById('wcal-month').textContent =
    ref.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

  // Monday-anchored first cell
  const firstDay = new Date(ref);
  const dow = firstDay.getDay();
  firstDay.setDate(firstDay.getDate() - (dow === 0 ? 6 : dow - 1));

  const grid = document.getElementById('wcal-grid');
  grid.innerHTML = '';

  for (let row = 0; row < 6; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'wcal-row';
    for (let col = 0; col < 7; col++) {
      const d = new Date(firstDay);
      d.setDate(firstDay.getDate() + row * 7 + col);
      const dateStr = d.toISOString().split('T')[0];
      const isPast   = d < today;
      const isToday  = d.getTime() === today.getTime();
      const isSel    = state.weekPlan.selectedDays.some(x => x.date === dateStr);
      const isWknd   = col >= 5;
      const isCurMo  = d.getMonth() === ref.getMonth();

      const cell = document.createElement('div');
      cell.className = 'wcal-day'
        + (isPast      ? ' past'        : '')
        + (isToday     ? ' today'       : '')
        + (isWknd      ? ' wknd'        : '')
        + (isSel       ? ' sel'         : '')
        + (!isCurMo    ? ' other-month' : '');
      cell.textContent = d.getDate();
      cell.setAttribute('data-date', dateStr);
      if (!isPast) cell.onclick = () => toggleWeekDay(dateStr);
      rowDiv.appendChild(cell);
    }
    grid.appendChild(rowDiv);
    // Stop rendering once we've passed the month and completed the week
    const lastInRow = new Date(firstDay);
    lastInRow.setDate(firstDay.getDate() + row * 7 + 6);
    if (row >= 4 && lastInRow.getMonth() !== ref.getMonth()) break;
  }
}

function toggleWeekDay(dateStr) {
  const idx = state.weekPlan.selectedDays.findIndex(x => x.date === dateStr);
  if (idx >= 0) {
    state.weekPlan.selectedDays.splice(idx, 1);
  } else {
    state.weekPlan.selectedDays.push({ date: dateStr, hours: 8 });
    state.weekPlan.selectedDays.sort((a, b) => a.date.localeCompare(b.date));
  }
  renderWeekCal();
  updateWeekDayList();
  updateWeekPreview();
}

function updateDayHours(dateStr, hours) {
  const day = state.weekPlan.selectedDays.find(x => x.date === dateStr);
  if (day) { day.hours = Math.max(1, parseInt(hours) || 8); updateWeekPreview(); }
}

function updateWeekDayList() {
  const container = document.getElementById('week-day-list');
  if (!state.weekPlan.selectedDays.length) {
    container.innerHTML = '<p style="opacity:.6;font-size:0.85rem;text-align:center;padding:8px 0">Wähle Tage im Kalender aus</p>';
    return;
  }
  const dayNames = ['So','Mo','Di','Mi','Do','Fr','Sa'];
  container.innerHTML = state.weekPlan.selectedDays.map(day => {
    const d = new Date(day.date + 'T12:00:00');
    const label = d.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    return `<div class="week-day-row">
      <span class="week-day-label">${label}</span>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
        <input type="number" class="wcal-dh" value="${day.hours}" min="1" max="16"
          onchange="updateDayHours('${day.date}',this.value)" />
        <span style="font-size:0.8rem;color:var(--text-muted)">Std</span>
      </div>
    </div>`;
  }).join('');
}

function updateWeekPreview() {
  const preview   = document.getElementById('week-preview');
  const createBtn = document.getElementById('week-create-btn');
  const selected  = state.addresses.filter(a => a.selected);
  const days      = state.weekPlan.selectedDays;

  if (!days.length || !selected.length) {
    preview.innerHTML = '';
    if (createBtn) createBtn.style.display = 'none';
    return;
  }

  const visitMin   = parseInt(document.getElementById('avg-visit-time').value) || 60;
  const distribution = distributeToWeek(selected, days);

  preview.innerHTML = '<div class="week-preview-box">' +
    days.map((day, i) => {
      const customers = distribution[i] || [];
      const totalMin  = customers.length * visitMin;
      const availMin  = day.hours * 60;
      const isOver    = totalMin > availMin;
      const h = Math.floor(totalMin / 60), m = totalMin % 60;
      const d = new Date(day.date + 'T12:00:00');
      const label = d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
      return `<div class="week-prev-row${isOver ? ' over' : ''}">
        <span class="week-prev-day">${label}</span>
        <span class="week-prev-count">${customers.length} Kunden</span>
        <span class="week-prev-time">${h > 0 ? h + 'h ' : ''}${m}m${isOver ? ' ⚠️' : ''}</span>
      </div>`;
    }).join('') + '</div>';

  if (createBtn) createBtn.style.display = '';
}

// ─── Geographic distribution (K-means++) ──────────────────────────────────────
function distributeToWeek(addresses, days) {
  const k = days.length;
  if (k === 0) return [];
  if (k === 1) return [addresses];

  const withCoords    = addresses.filter(a => a.lat && a.lng);
  const withoutCoords = addresses.filter(a => !a.lat || !a.lng);

  if (withCoords.length === 0) {
    const groups = Array.from({ length: k }, () => []);
    addresses.forEach((a, i) => groups[i % k].push(a));
    return groups;
  }

  const clusters = kMeansCluster(withCoords, k);

  // Distribute addresses without coords into the smallest clusters first
  withoutCoords.forEach(a => {
    const smallest = clusters.reduce((best, c, i) => c.length < clusters[best].length ? i : best, 0);
    clusters[smallest].push(a);
  });

  return clusters;
}

function kMeansCluster(points, k) {
  if (points.length <= k) {
    const groups = Array.from({ length: k }, () => []);
    points.forEach((p, i) => groups[i].push(p));
    return groups;
  }

  // K-means++ initialisation
  const centroids = [{ lat: parseFloat(points[0].lat), lng: parseFloat(points[0].lng) }];
  while (centroids.length < k) {
    const distances = points.map(p => Math.min(...centroids.map(c => dist2(p, c))));
    const total = distances.reduce((s, d) => s + d, 0);
    let r = Math.random() * total;
    let idx = points.length - 1;
    for (let i = 0; i < distances.length; i++) { r -= distances[i]; if (r <= 0) { idx = i; break; } }
    centroids.push({ lat: parseFloat(points[idx].lat), lng: parseFloat(points[idx].lng) });
  }

  let assignments = new Array(points.length).fill(0);
  for (let iter = 0; iter < 30; iter++) {
    // Assign each point to nearest centroid
    const next = points.map(p => {
      let best = 0, bestD = Infinity;
      centroids.forEach((c, ci) => { const d = dist2(p, c); if (d < bestD) { bestD = d; best = ci; } });
      return best;
    });
    const changed = next.some((a, i) => a !== assignments[i]);
    assignments = next;
    if (!changed) break;
    // Recompute centroids
    for (let c = 0; c < k; c++) {
      const pts = points.filter((_, i) => assignments[i] === c);
      if (pts.length) {
        centroids[c] = {
          lat: pts.reduce((s, p) => s + parseFloat(p.lat), 0) / pts.length,
          lng: pts.reduce((s, p) => s + parseFloat(p.lng), 0) / pts.length
        };
      }
    }
  }

  const groups = Array.from({ length: k }, () => []);
  points.forEach((p, i) => groups[assignments[i]].push(p));
  return groups;
}

function dist2(a, b) {
  const dl = parseFloat(a.lat) - parseFloat(b.lat);
  const dn = parseFloat(a.lng) - parseFloat(b.lng);
  return dl * dl + dn * dn;
}

async function createWeekRoutes() {
  const selected = state.addresses.filter(a => a.selected);
  const days     = state.weekPlan.selectedDays;
  if (!days.length || !selected.length) return;
  if (!state.token) { alert('Bitte anmelden, um Routen zu speichern.'); return; }

  const startAddr = document.getElementById('start-address').value.trim();
  if (!startAddr) return alert(t('alert-enter-start'));

  const settings = {
    startAddress:  startAddr,
    avgSpeed:      document.getElementById('avg-speed').value,
    maxRange:      document.getElementById('max-range').value,
    breakDuration: document.getElementById('break-duration').value,
    breakInterval: document.getElementById('break-interval').value,
    vehicleType:   document.getElementById('vehicle-type').value,
    visitDuration: document.getElementById('avg-visit-time').value,
    fastfoodStop:  false,
  };

  const visitMin     = parseInt(settings.visitDuration) || 60;
  const distribution = distributeToWeek(selected, days);
  let saved = 0, failed = 0;

  showLoading('Routen werden gespeichert...');

  for (let i = 0; i < days.length; i++) {
    const dayData  = days[i];
    const addrs    = distribution[i] || [];
    if (!addrs.length) continue;

    const d    = new Date(dayData.date + 'T12:00:00');
    const name = d.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    const summary = {
      totalDistance:    null,
      totalDuration:    addrs.length * visitMin,
      destinationCount: addrs.length
    };

    try {
      const res = await apiFetch('/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, addresses: addrs, settings, summary })
      });
      if (res.ok) saved++; else failed++;
    } catch { failed++; }
  }

  hideLoading();
  closeWeekPlanner();
  alert(`${saved} Route${saved !== 1 ? 'n' : ''} gespeichert${failed ? ', ' + failed + ' fehlgeschlagen' : ''}.`);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showLoading(text) {
  document.getElementById('loading-text').textContent = text || t('loading-default');
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

