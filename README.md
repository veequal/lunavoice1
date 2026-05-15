# LunaVoice

Modern **React + Vite** demo for **LunaVoice** — an AI-forward pediatric speech therapy SaaS UI (mock data only).

## Stack

- React 18, Vite 5
- Tailwind CSS 3
- React Router 6
- Framer Motion
- Lucide React
- Recharts

## Setup

```bash
cd voxera-health
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Routes

- `/` — Portal selection (Parent / Doctor / Child)
- `/login/parent`, `/login/doctor`, `/login/child` — Simulated sign-in (any credentials)
- `/doctor-dashboard` — Clinician workspace
- `/parent-dashboard` — Family hub
- `/child-dashboard` — Child practice experience

## Notes

- No authentication or backend; all analytics and records are **mocked** for presentation.
- Toggle **light/dark** from the theme control on dashboards and the landing page.
