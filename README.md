# 🗺️ Routenplaner

Eine Web-App zur optimierten Routenplanung aus Excel-Adresslisten — mit Google Maps Integration, Pausen- und Tankstopplanung.

## Features

- **Excel-Import** — `.xlsx`, `.xls` und `.csv` Dateien per Drag & Drop
- **Automatische Geocodierung** — Adressen werden per Google Maps API in Koordinaten umgewandelt
- **Routenoptimierung** — optimale Reihenfolge der Haltepunkte via Google Directions API
- **Pausen & Tankstopps** — automatische Berechnung basierend auf Reichweite und Fahrzeit
- **Verkehrslage** — Live-Verkehrsdaten auf der Karte
- **Export** — Route als Textdatei speichern oder direkt in Google Maps öffnen

## Voraussetzungen

- Docker & Docker Compose
- Google Maps API Key (Maps JavaScript API, Geocoding API, Directions API)

## Installation

```bash
git clone https://github.com/markushartmann-dev/route.git
cd route
docker compose up --build -d
```

Die App ist erreichbar unter: `http://localhost:8081`

## Aktualisieren

```bash
git pull
docker compose up --build -d
```

## Projektstruktur

```
route/
├── frontend/        # HTML, CSS, JavaScript (nginx)
├── backend/         # Node.js / Express API
└── docker-compose.yml
```

## Verwendung

1. Startadresse eingeben
2. Fahrzeugtyp, Reichweite und Pauseneinstellungen festlegen
3. Excel-Datei importieren und Spalten zuordnen
4. Adressen auswählen und Route berechnen
5. Route in Google Maps öffnen oder exportieren
