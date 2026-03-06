# Sigless + Sigmark Measurement Pipeline

This setup is used to measure power consumption of a Raspberry Pi 5 using an
external Siglent SPD3303X-E power supply. All measurements are collected
externally; the Raspberry Pi does not expose internal power telemetry.

---

## Components

- **Siglent SPD3303X-E**  
  Provides 5 V DC power to the Raspberry Pi and reports voltage/current readings.

- **MacBook Pro M3**  
  Runs:
  - `sigless` → exposes Siglent measurements via REST API  
  - SSH → controls the Raspberry Pi  
  - Stores CSV measurement logs

- **Raspberry Pi 5**  
  Runs:
  - `sigmark_siglent_markers.sh` → sends start/tick/stop markers  
  - Optional `stress-ng` CPU load

- **Ethernet Switch**  
  Connects all devices on the same LAN.

---

## How It Works

### 1. Sigless (running on MacBook)

```bash
./sigless-1.0.3-macos-arm64 -ch1 --web 8000 --verbose

This tool:
	•	Connects to the Siglent via Ethernet
	•	Queries CH1 voltage/current at fixed intervals
	•	Computes CH1 power
	•	Logs everything into a CSV file
	•	Provides a REST API at:
http://192.168.50.2:8000/api/log

⸻

2. Sigmark (running on Raspberry Pi)

Two scripts work together.

sigmark.sh
Sends marker messages (start, tick, stop) into the Sigless log:

curl -X POST -H "Content-Type: application/json" \
  -d '{ "message": "tick,sigmark,20", "channelId": "CH1" }' \
  http://<macbook-ip>:8000/api/log

sigmark_siglent_markers.sh
Controls timing and optional CPU load (stress-ng):
	•	Emits a start marker
	•	Runs workload
	•	Emits timed tick markers
	•	Emits a stop marker

This makes segmentation trivial during data analysis.

⸻

Output

Sigless produces a CSV file like:

timestamp_ms, voltage, current, power, message
1700000123456, 5.02, 0.48, 2.41, start,sigmark,0
1700000128456, 5.01, 0.60, 3.01, tick,sigmark,20
...

This file is used as the complete measurement dataset.

⸻

Notes
	•	Only external measurements (Siglent) are used.
	•	Raspberry Pi only generates workload + timing markers.
	•	Segmentation is time-driven using markers logged by Sigless.

⸻


