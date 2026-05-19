require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const XLSX = require('xlsx');
const axios = require('axios');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

// Parse Excel file and extract addresses
app.post('/api/import-excel', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Keine Datei hochgeladen' });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    if (rows.length === 0) return res.status(400).json({ error: 'Excel-Datei ist leer' });

    // Try to auto-detect columns
    const firstRow = rows[0];
    const keys = Object.keys(firstRow);

    res.json({
      columns: keys,
      rows: rows,
      preview: rows.slice(0, 5)
    });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Lesen der Excel-Datei: ' + err.message });
  }
});

// Geocode addresses via Google Maps Geocoding API
app.post('/api/geocode', async (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'Adresse fehlt' });
  if (!GOOGLE_MAPS_API_KEY) return res.status(400).json({ error: 'Google Maps API Key nicht konfiguriert' });

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: { address, key: GOOGLE_MAPS_API_KEY, language: 'de', region: 'de' }
    });

    if (response.data.status !== 'OK') {
      return res.status(404).json({ error: 'Adresse nicht gefunden', status: response.data.status });
    }

    const result = response.data.results[0];
    res.json({
      formatted_address: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    });
  } catch (err) {
    res.status(500).json({ error: 'Geocoding-Fehler: ' + err.message });
  }
});

// Batch geocode multiple addresses
app.post('/api/geocode-batch', async (req, res) => {
  const { addresses } = req.body;
  if (!Array.isArray(addresses)) return res.status(400).json({ error: 'Adressen-Array fehlt' });
  if (!GOOGLE_MAPS_API_KEY) return res.status(400).json({ error: 'Google Maps API Key nicht konfiguriert' });

  const results = [];
  for (const item of addresses) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: { address: item.address, key: GOOGLE_MAPS_API_KEY, language: 'de', region: 'de' }
      });

      if (response.data.status === 'OK') {
        const r = response.data.results[0];
        results.push({
          ...item,
          formatted_address: r.formatted_address,
          lat: r.geometry.location.lat,
          lng: r.geometry.location.lng,
          success: true
        });
      } else {
        results.push({ ...item, success: false, error: response.data.status });
      }
      // Respect Google rate limits
      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      results.push({ ...item, success: false, error: err.message });
    }
  }

  res.json({ results });
});

// Get config (API key presence check)
app.get('/api/config', (req, res) => {
  res.json({
    hasApiKey: !!GOOGLE_MAPS_API_KEY,
    apiKey: GOOGLE_MAPS_API_KEY || null
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend läuft auf Port ${PORT}`));
