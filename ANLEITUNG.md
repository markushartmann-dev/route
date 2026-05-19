# Routenplaner – Einrichtungsanleitung für Synology NAS

## Schritt 1: Google Maps API Key besorgen

1. Gehe zu: https://console.cloud.google.com/
2. Neues Projekt erstellen (z.B. "Routenplaner")
3. APIs aktivieren:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Directions API**
4. Unter "Anmeldedaten" → API-Schlüssel erstellen
5. Den Key kopieren

## Schritt 2: Auf dem Synology NAS einrichten

### Container Manager installieren
- DSM öffnen → Package Center → "Container Manager" installieren

### Dateien hochladen
1. FileStation öffnen
2. Ordner erstellen: `/docker/routeplaner`
3. Alle Dateien aus diesem Repository dort hochladen

### .env Datei erstellen
1. In FileStation: Neue Datei `.env` im Ordner `/docker/routeplaner` erstellen
2. Inhalt:
```
GOOGLE_MAPS_API_KEY=DEIN_KEY_HIER
```

## Schritt 3: Docker starten

### Per SSH (empfohlen)
```bash
# SSH auf NAS verbinden
ssh admin@DEINE-NAS-IP

# In den Projektordner wechseln
cd /volume1/docker/routeplaner

# Container starten
docker-compose up -d
```

### Alternativ: Per Container Manager UI
1. Container Manager → Projekte → Erstellen
2. Pfad: `/docker/routeplaner`
3. Starten klicken

## Schritt 4: Website aufrufen

Nach dem Start erreichbar unter:
```
http://DEINE-NAS-IP:8080
```

## Nutzung der Website

1. **API Key eingeben** (falls nicht per .env gesetzt)
2. **Excel-Datei hochladen** (xlsx, xls oder csv)
3. **Spalten zuordnen** (Firma, Straße, PLZ, Stadt)
4. **Einstellungen setzen**:
   - Startadresse (dein Büro/Zuhause)
   - Durchschnittsgeschwindigkeit
   - Max. Reichweite (für Tanken/Laden)
   - Pausenintervall
5. **Route berechnen** → optimierte Route mit Verkehrsinfos
6. **In Google Maps öffnen** für Navigation

## Excel-Format

Deine Excel-Tabelle braucht Spalten für:
| Firma | Straße | PLZ | Stadt |
|-------|--------|-----|-------|
| Musterfirma GmbH | Musterstraße 1 | 12345 | Berlin |

Oder eine kombinierte Adressspalte:
| Firma | Adresse |
|-------|---------|
| Musterfirma GmbH | Musterstraße 1, 12345 Berlin |

## Fehlerbehebung

**Port 8080 belegt?**
In `docker-compose.yml` ändern: `"8081:80"` → dann via Port 8081 aufrufen

**Container startet nicht?**
```bash
docker-compose logs
```
