# QuickSOS

QuickSOS is a lightweight, mobile-first safety app for one-tap SOS and a clean, shareable emergency profile. Add trusted contacts and key medical info once; when you need help, everything is instantly accessible—even offline. It’s an installable PWA, privacy-first (no AI SDKs or third-party backends), and easy to fork and deploy.

---

## Features
- **One-tap SOS** UI with clear state (recording/offline indicators)
- **Emergency profile** (contacts + medical info) in a simple card layout
- **Shareable profile** view for quick access by helpers
- **Installable PWA** with proper icons & offline-friendly shell
- **Brandable** (swap logo, colors, and app name in minutes)
- **Privacy-first**: no analytics, no AI, no external data services

---

##  Tech Stack
- **React + TypeScript** (Vite)
- **Tailwind CSS**
- **shadcn/ui** components
- **PWA** via `manifest.webmanifest`

---

##  Quick Start

```bash
# 1) Install deps
npm ci   # or: npm install

# 2) Run locally
npm run dev

# 3) Production build
npm run build
npm run preview
Requires Node 18+.

🗂 Project Structure (high level)
css
Copy code
QuickSOS/
├─ public/
│  ├─ avatar.png
│  ├─ favicon-16.png
│  ├─ favicon-32.png
│  ├─ icon-192.png
│  ├─ icon-512.png
│  ├─ logo.svg
│  └─ sosband-icon.png
├─ src/
│  ├─ components/                # UI + feature components
│  ├─ pages/                     # Index, Dashboard, NotFound
│  ├─ hooks/                     # small utilities
│  ├─ App.tsx / main.tsx
│  └─ index.css
├─ index.html
├─ manifest.webmanifest
└─ vite.config.ts
 Branding / Icons
Favicon & tab icon: public/logo.svg (+ 16/32 PNG fallbacks)

Apple touch icon: public/sosband-icon.png (180×180)

PWA icons: public/icon-192.png, public/icon-512.png

App name: in manifest.webmanifest (name, short_name)

Social preview (optional): meta tags in index.html

Swap these files with your own assets to rebrand quickly.

⚙ Configuration
This template is intentionally backend-free. The sample data (contacts & profile) lives in React state. To customize:

Edit src/pages/Dashboard.tsx default contacts and profile fields.

Tweak copy and styles in the components under src/components/.

Update the landing experience in src/pages/Index.tsx.

Deploy
Vercel (recommended)
Push this repo to GitHub.

Import the repo at vercel.com/new and deploy.

For CLI deploys, ensure your Vercel account/scope is correct and run:

bash
Copy code
vercel --prod
Static hosting
The dist/ folder is a static bundle. Serve it on any static host (e.g., GitHub Pages, Cloudflare Pages, Netlify).

 Privacy & Security
No AI SDKs or model calls.

No telemetry or external analytics.

No third-party backends.

Everything shown is local UI state unless you connect your own services.

Not a substitute for emergency services. In a real emergency, call your local emergency number (e.g., 911, 112) immediately.

 Troubleshooting
Vite build complains about /assets/*.js in index.html:
Ensure your entry script is <script type="module" src="/src/main.tsx"></script> and do a clean build:

bash
Copy code
rm -rf node_modules .vite dist
npm ci && npm run build
Icons not updating:
Clear browser cache or bump the query string (e.g., logo.svg?v=4). Confirm manifest.webmanifest lists your PNG icons.

Roadmap (ideas)
Share SOS via SMS with location

Optional PIN/disarm flow

Contact groups & escalation timers

Local encryption for sensitive fields

