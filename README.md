# Monitor Naborów Szkoleniowych v3

Inteligentny agent monitorujący strony z naborami szkoleniowymi. Codziennie o 9:00 sprawdza 44 strony, wykrywa daty naborów, kategoryzuje je i generuje raport HTML z powiadomieniem na pulpicie.

## Instalacja

```bash
npm install
```

## Szybki test

```bash
npm run check-now
```

Raport otworzy się w przeglądarce + powiadomienie na pulpicie.

## Uruchomienie w tle (PM2)

### 1. Zainstaluj PM2

```bash
sudo npm install -g pm2
```

### 2. Uruchom daemon

```bash
npm run start-daemon
```

Monitor działa teraz w tle i sprawdza strony codziennie o 9:00.

### 3. Zarządzanie

```bash
npm run status        # czy działa?
npm run logs          # logi na żywo
npm run stop-daemon   # zatrzymaj
npm run restart       # zrestartuj
npm run last-report   # otwórz ostatni raport
```

### 4. Autostart po restarcie systemu

```bash
pm2 startup           # wygeneruje komendę z sudo - wklej ją
pm2 save              # zapisze aktualną listę procesów
```

### 5. Sprawdź czy działa

```bash
pm2 status monitor-naborow
```

Powinno pokazać `online` i uptime.

## Alternatywa: systemd

```bash
sudo nano /etc/systemd/system/monitor-naborow.service
```

```ini
[Unit]
Description=Monitor Naborów Szkoleniowych
After=network.target

[Service]
Type=simple
User=dawiddomanski
WorkingDirectory=/home/dawiddomanski/Pulpit/Claude Code test/monitor-naborow
ExecStart=/usr/bin/node index.js
Restart=on-failure
RestartSec=10
Environment=DISPLAY=:0

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now monitor-naborow
sudo systemctl status monitor-naborow    # status
sudo journalctl -u monitor-naborow -f    # logi
```

## Jak działa

1. Pobiera treść każdej strony z listy (44 strony)
2. Szuka słów kluczowych: nabór, rekrutacja, trwa ciągle, zapisy, zgłoszenia, szkolenie, projekt
3. **Wykrywa zakresy dat** w treści — obsługiwane formaty:
   - `15.03.2025`, `15-03-2025`, `15/03/2025`
   - `od 1 marca do 30 kwietnia 2026`
   - `10-20 lutego 2026`
   - `do 15.03.2025`
   - `kwiecień 2026` (data przybliżona)
4. **Kategoryzuje nabory** względem dzisiejszej daty:
   - **Zakończone** — data końcowa < dzisiaj
   - **Trwające** — nabór aktywny teraz
   - **Przyszłe** — data rozpoczęcia > dzisiaj
5. **Wykrywa NOWE terminy** — daty których nie było przy poprzednim sprawdzeniu
6. Generuje raport HTML posortowany: zmiany na górze, z ikoną 🔥 przy nowych terminach
7. Wyświetla **powiadomienie na pulpicie** Ubuntu
8. Loguje do `logs/monitor.log`

## Struktura pliku data/hashes.json

```json
{
  "https://przyklad.pl/nabor": {
    "hash": "abc123...",
    "dates": [
      {
        "from": "2026-02-10",
        "to": "2026-02-28",
        "raw": "10.02 - 28.02.2026",
        "approximate": false
      }
    ],
    "lastCheck": "2026-02-16T19:00:00.000Z"
  }
}
```

Każda strona przechowuje:
- `hash` — MD5 treści strony (do wykrywania zmian)
- `dates` — lista wykrytych zakresów dat (do wykrywania nowych terminów)
- `lastCheck` — data ostatniego sprawdzenia

## Struktura projektu

```
├── index.js              - główny plik
├── ecosystem.config.js   - konfiguracja PM2
├── lib/
│   ├── dates.js          - parsowanie i kategoryzacja dat
│   └── report.js         - generowanie raportu HTML
├── config/urls.js        - lista URL-i i słów kluczowych
├── data/
│   ├── hashes.json       - hashe + historia dat per strona
│   └── history.json      - historia sprawdzeń
├── reports/              - raporty HTML
├── logs/monitor.log      - logi
└── package.json
```
