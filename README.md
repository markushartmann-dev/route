# 🗺️ Route Planner

A self-hosted route planning web app for field sales teams — runs on a Synology NAS via Docker.

Upload an Excel file with customer addresses, configure your vehicle settings, and get an optimized route with live traffic, break planning, and direct export to Google Maps or Apple Maps.

---

## Features

| | |
|---|---|
| 📂 | Excel / CSV import with automatic column detection |
| 📍 | Google Maps geocoding & route optimization |
| 🏙️ | City filter — select/deselect customer cities |
| ⛽ | Automatic fuel/charging and break stop planning |
| 🍔 | Optional McDonald's / Burger King stop along the route |
| ⛽ | Optional DKV fuel stop (filters by known DKV partner brands near Autobahn) |
| 📅 | Save & load named routes per user (weekly planning: Mon, Tue, …) |
| 🕐 | Average visit time per customer — added to total route duration |
| 🗺️ | Open route in Google Maps or Apple Maps (native on iPhone) |
| 🚦 | Live traffic layer |
| 🏠 | Save home address per user account |
| 🌙 | Dark / Light mode |
| 🇩🇪🇬🇧 | German / English language toggle |
| 👤 | JWT login with per-user data, admin panel, activity log |
| 📱 | Mobile-optimized for iPhone (safe-area, touch targets, bottom sheet modals) |

---

## Requirements

- Synology NAS with **Container Manager** installed
- A **Google Maps API Key** with the following APIs enabled:
  - Maps JavaScript API
  - Geocoding API
  - Directions API
  - Places API

---

## Step 1: Google Maps API Key

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project (e.g. "Route Planner")
3. Enable: **Maps JavaScript API**, **Geocoding API**, **Directions API**, **Places API**
4. Go to **Credentials → Create API key** and copy it
5. Optionally set a budget alert under **Billing → Budgets & Alerts** (the $200/month free tier covers typical usage easily)

---

## Step 2: Install on Synology NAS

```bash
ssh admin@YOUR-NAS-IP
cd /volume2/docker
git clone https://github.com/markushartmann-dev/route.git route-planner
cd route-planner
```

Edit `backend/server.js` and set your API key:
```js
const GOOGLE_MAPS_API_KEY = 'YOUR_KEY_HERE';
```

Then start:
```bash
docker compose up --build -d
```

The app is then available at:
```
http://YOUR-NAS-IP:8081
```

---

## Step 3: First Login

1. Open the app and click **Anmelden** (Sign in)
2. Default credentials: `admin` / `admin123`
3. Click **⚙️ Admin** to manage users and change the password

> **Important:** Change the default admin password after first login.

---

## Updating (without full rebuild)

For quick frontend updates (no backend changes):
```bash
cd /volume2/docker/route-planner
git pull
docker cp frontend/index.html route-planner-frontend:/usr/share/nginx/html/index.html
docker cp frontend/app.js     route-planner-frontend:/usr/share/nginx/html/app.js
docker cp frontend/style.css  route-planner-frontend:/usr/share/nginx/html/style.css
```

For backend changes (server.js):
```bash
git pull
docker cp backend/server.js route-planner-backend:/app/server.js
docker restart route-planner-backend
```

For full rebuild:
```bash
docker compose down
docker compose up --build -d
```

> If using Cloudflare, purge the cache after frontend updates.

---

## How to Use

### 1. Import
- Upload an `.xlsx`, `.xls`, or `.csv` file via drag & drop
- Map the columns (Company, Street, ZIP, City — or a single address column)
- Click **📍 Adressen verarbeiten** to geocode all addresses

### 2. Settings
| Setting | Description |
|---|---|
| Start address | Your home or office. Logged-in users can save & reuse it. |
| Avg. speed | Used for total duration estimate |
| Max. range | Triggers fuel/charging stop insertion |
| Break interval | Inserts a break stop every N km |
| Break duration | Duration of each break in minutes |
| Ø Visit time | Minutes per customer visit, added to total duration |
| 🍔 Fastfood stop | Searches for McDonald's or Burger King near the route midpoint |
| ⛽ DKV fuel stop | Searches for DKV-compatible gas stations (Aral, Shell, Total, Esso, Jet, …) near the Autobahn |

### 3. Route
- Select customers (filter by city if needed)
- Click **🗺️ Route berechnen**
- View optimized route with distances, durations, and all stops
- Open in **Google Maps** (all waypoints) or **Apple Maps** (start + end)
- Export as text file or **📅 Route speichern** to save it for later

### 4. Saved Routes
- Click **📅 Routen** in the header to open your saved routes
- Give each route a name (e.g. "Montag KW21")
- **▶ Laden** restores all addresses and settings and recalculates the route automatically
- Routes are saved per user account

---

## Excel Format

**Option A — separate columns:**
| Firma | Straße | PLZ | Ort |
|---|---|---|---|
| Example GmbH | Musterstraße 1 | 12345 | Berlin |

**Option B — single address column:**
| Firma | Adresse |
|---|---|
| Example GmbH | Musterstraße 1, 12345 Berlin |

---

## Admin Panel

Accessible via **⚙️ Admin** (admin role required):

- **👥 Benutzer** — create, edit, delete users; assign roles (user / admin)
- **📋 Protokoll** — activity log showing logins, Excel imports, geocoding calls (user, timestamp, duration)

---

## Data Storage

All data is stored in a Docker volume (`route-planner-data`) that persists across restarts:

| File | Contents |
|---|---|
| `users.json` | User accounts incl. hashed passwords and saved home addresses |
| `logs.json` | Activity log (max. 2000 entries) |
| `routes.json` | Saved routes per user |

---

## Troubleshooting

**Port already in use?**
Change in `docker-compose.yml`: `"8082:80"` → access via new port

**Container not starting?**
```bash
docker compose logs
```

**Backend not responding?**
```bash
docker restart route-planner-backend
docker logs route-planner-backend
```

**Frontend not updating after deploy?**
Purge Cloudflare cache (if applicable) or hard-reload in browser (`Ctrl+Shift+R`).
