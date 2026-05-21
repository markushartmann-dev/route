require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const XLSX = require('xlsx');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const GOOGLE_MAPS_API_KEY = 'AIzaSyDzdc9GUQN6X2r8vw1_7kcVGRyvP5ZLoNM';
const JWT_SECRET = process.env.JWT_SECRET || 'route-planner-change-me';
const USERS_FILE = path.join('/app/data', 'users.json');

// ─── User Storage ─────────────────────────────────────────────────────────────
function readUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      const dir = path.dirname(USERS_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const admin = {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      fs.writeFileSync(USERS_FILE, JSON.stringify([admin], null, 2));
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading users:', err);
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const token = (req.headers.authorization || '').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin required' });
    next();
  });
}

// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// ─── Admin User Routes ────────────────────────────────────────────────────────
app.get('/api/admin/users', requireAdmin, (req, res) => {
  res.json(readUsers().map(({ password, ...u }) => u));
});

app.post('/api/admin/users', requireAdmin, (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const users = readUsers();
  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'Username already taken' });
  const newUser = {
    id: Math.max(0, ...users.map(u => u.id)) + 1,
    username,
    password: bcrypt.hashSync(password, 10),
    role: role === 'admin' ? 'admin' : 'user',
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  writeUsers(users);
  const { password: _, ...safe } = newUser;
  res.json(safe);
});

app.put('/api/admin/users/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password, role } = req.body;
  const users = readUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  if (username) users[idx].username = username;
  if (password) users[idx].password = bcrypt.hashSync(password, 10);
  if (role) users[idx].role = role === 'admin' ? 'admin' : 'user';
  writeUsers(users);
  const { password: _, ...safe } = users[idx];
  res.json(safe);
});

app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const users = readUsers();
  const target = users.find(u => u.id === id);
  if (!target) return res.status(404).json({ error: 'User not found' });
  if (target.role === 'admin' && users.filter(u => u.role === 'admin').length === 1) {
    return res.status(400).json({ error: 'Cannot delete last admin' });
  }
  writeUsers(users.filter(u => u.id !== id));
  res.json({ ok: true });
});

// ─── Protected API Routes ─────────────────────────────────────────────────────
app.post('/api/import-excel', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    if (rows.length === 0) return res.status(400).json({ error: 'Excel file is empty' });
    res.json({ columns: Object.keys(rows[0]), rows, preview: rows.slice(0, 5) });
  } catch (err) {
    res.status(500).json({ error: 'Error reading Excel file: ' + err.message });
  }
});

app.post('/api/geocode', async (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'Address missing' });
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: { address, key: GOOGLE_MAPS_API_KEY, language: 'de', region: 'de' }
    });
    if (response.data.status !== 'OK') {
      return res.status(404).json({ error: 'Address not found', status: response.data.status });
    }
    const result = response.data.results[0];
    res.json({
      formatted_address: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    });
  } catch (err) {
    res.status(500).json({ error: 'Geocoding error: ' + err.message });
  }
});

app.post('/api/geocode-batch', async (req, res) => {
  const { addresses } = req.body;
  if (!Array.isArray(addresses)) return res.status(400).json({ error: 'Addresses array missing' });
  const results = [];
  for (const item of addresses) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: { address: item.address, key: GOOGLE_MAPS_API_KEY, language: 'de', region: 'de' }
      });
      if (response.data.status === 'OK') {
        const r = response.data.results[0];
        results.push({ ...item, formatted_address: r.formatted_address, lat: r.geometry.location.lat, lng: r.geometry.location.lng, success: true });
      } else {
        results.push({ ...item, success: false, error: response.data.status });
      }
      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      results.push({ ...item, success: false, error: err.message });
    }
  }
  res.json({ results });
});

app.get('/api/config', (req, res) => {
  res.json({ hasApiKey: !!GOOGLE_MAPS_API_KEY, apiKey: GOOGLE_MAPS_API_KEY || null });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
