# 🔍 GovSOC OSINT Threat Scanner

A CLI-based Threat Intelligence tool built in Node.js. It allows Security Operations Center (SOC) analysts to instantly query Open Source Intelligence (OSINT) databases to identify the geolocation, ISP, and ASN of suspicious IP addresses.

## 🚀 Features
* **Instant OSINT Profiling:** Queries `ip-api` for real-time network data.
* **Automated Risk Analysis:** Flags IPs originating from datacenters (often associated with VPNs, proxies, or botnets).
* **Colorized CLI Output:** Uses `chalk` for clear, readable terminal reports.

## ⚙️ Usage
Clone the repo, run `npm install`, and execute the scanner with a target IP:
