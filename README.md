# 🗺️ Route Planner – Setup Guide for Synology NAS

## Step 1: Get a Google Maps API Key

1. Go to: https://console.cloud.google.com/
2. Create a new project (e.g. "Route Planner")
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Directions API**
4. Go to "Credentials" → Create API key
5. Copy the key

## Step 2: Set Up on Synology NAS

### Install Container Manager
- Open DSM → Package Center → Install "Container Manager"

### Clone the Repository
```bash
ssh admin@YOUR-NAS-IP
cd /volume2/docker
git clone https://github.com/markushartmann-dev/route.git route-planner
cd route-planner
```

## Step 3: Start Docker

```bash
docker compose up --build -d
```

## Step 4: Open the App

After starting, the app is available at:
```
http://YOUR-NAS-IP:8081
```

## Step 5: Update

To pull the latest changes and restart:
```bash
cd /volume2/docker/route-planner
git pull
docker compose up --build -d
```

## How to Use

1. **Upload Excel file** (xlsx, xls or csv)
2. **Map columns** (Company, Street, ZIP, City)
3. **Configure settings**:
   - Start address (your home / office)
   - Average speed
   - Max. range (for fuel / charging stops)
   - Break interval
4. **Filter by city** → select/deselect cities via chips above the address list
5. **Calculate route** → optimized route with live traffic
6. **Open in Google Maps** for navigation

## Excel Format

Your Excel file needs columns for:
| Company | Street | ZIP | City |
|---------|--------|-----|------|
| Example GmbH | Example Street 1 | 12345 | Berlin |

Or a single combined address column:
| Company | Address |
|---------|---------|
| Example GmbH | Example Street 1, 12345 Berlin |

## User Management

The app can be used without login. To access the admin panel:

1. Click **Sign in** in the header
2. Default credentials: `admin` / `admin123`
3. Click **⚙️ Admin** to manage users

> **Important:** Change the default admin password after first login.

User data is stored in a Docker volume (`route-planner-data`) and persists across container restarts.

## Features

- 🗺️ Excel import with automatic column detection
- 📍 Google Maps geocoding & route optimization
- 🏙️ City filter — select/deselect cities per import file
- ⛽ Automatic fuel/charging and break stop planning
- 🚦 Live traffic layer
- 🌙 Dark / Light mode
- 👤 Optional login with admin panel for user management

## Troubleshooting

**Port already in use?**
Change in `docker-compose.yml`: `"8082:80"` → then access via the new port

**Container not starting?**
```bash
docker compose logs
```

**Force full rebuild:**
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```
