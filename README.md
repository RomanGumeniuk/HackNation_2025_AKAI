# HackNation 2025 — AKAI

> Built during **HackNation 2025** (6–7 December 2025, Bydgoszcz) — Poland's first nationwide implementation hackathon organized by the Ministry of Digitization, GovTech Polska, and the City of Bydgoszcz.

Front‑end for a civic-tech prototype built with **Next.js 15** (App Router) and **TypeScript**. The app helps users browse, track, and discuss Polish legislative proposals, surfacing the hottest laws, latest updates, and related consultations.

## Key Features

- 🏛️ **Landing dashboard**: Highlights "Najgorętsze ustawy" (most popular) and the 5 most recently updated laws.
- 📚 **Law browsing**: Link through to detailed law pages under `/ustawy/[id]`.
- 🗓️ **Consultations flow**: Quick access to consultations via `/konsultacje`.
- 📊 **Live counters**: Animated follower counts using a custom `CountUp` component.
- 🗺️ **Mapping & PDF stack**: Dependencies include `leaflet`/`react-leaflet` and `react-pdf` for map and document views.
- 🔌 **Realtime-ready**: `socket.io-client` integration with a typed message composer (backend URL configurable via environment variable).

## Tech Stack

- **Framework**: Next.js 15, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 (PostCSS), Radix UI primitives, custom CSS in `src/app/globals.css`
- **Animation/UX**: GSAP, `motion`, `lucide-react` icons, `CountUp`
- **Data & Utils**: date-fns, class-variance-authority, clsx
- **Maps / Docs / Graph**: leaflet + react-leaflet, react-pdf/pdfjs, reagraph
- **Realtime**: socket.io-client
- **Linting/Build**: ESLint 9, SWC, Babel React Compiler

## Project Structure (key folders)

```
client/
  src/
    app/           # Next.js App Router routes (home, edukacja, konsultacje, map, pdf, ustawy)
    components/    # Reusable UI + CountUp, Radix wrappers, etc.
    contexts/      # React context providers (state management)
    lib/           # Helpers/utilities
    mock_data/     # Static datasets (e.g., laws.ts) — hackathon prototype data
    socket.ts      # Socket.io client + message composer
```

## Getting Started

```bash
cd client
npm install          # or pnpm i
npm run dev          # starts Next.js dev server
```

Then visit **http://localhost:3000**.

### Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — lint with ESLint

## Configuration & Env

Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_SOCKET_URL=http://your-backend-host:8080
```

The Socket.io client reads this variable at runtime. Tailwind/PostCSS config lives in `postcss.config.mjs`; global styles in `src/app/globals.css`. TypeScript config: `tsconfig.json`.

## Data Model (mock)

`src/mock_data/laws.ts` provides sample laws with fields like:

- `id`, `name`, `title`, `lastUpdate`, `createdDate`
- `category`, `projectType`, `superCategory`
- `location` / `locationCode`, `tags`, `stage`, `applicant`, `legislativeNumber`
- `euLaw`, `constitutionalCourt`, `lawBased`, `separateProcess`, `journalPublished`, `sejm`
- `follows` (used for popularity ranking)

## Routes Overview

- `/` — Landing dashboard with hottest + recent laws
- `/ustawy/[id]` — Law detail (links from home cards/table)
- `/konsultacje` — Consultations hub
- `/map` — Map experience (Leaflet-ready)
- `/pdf` — PDF viewer (React-PDF ready)
- `/edukacja` — Education section
- `/ustawy` — Full laws list (landing CTA target)

## Development Notes

- Uses App Router (`src/app`) with server components; interactive parts marked `"use client"`.
- Animations and counters rely on client components; keep heavy logic client-side.
- Mock data lives in `mock_data/` — swap to API fetches as the backend solidifies.
- When deploying, set `NEXT_PUBLIC_SOCKET_URL` via environment variable.

## Potential Extensions

- Hook real API for laws & consultations; replace mock data with live endpoints.
- Build out law detail pages (`/ustawy/[id]`) and full consultation flows.
- Handle socket reconnect/auth logic.
- Expand test coverage and add a CI pipeline.

---

Built with ❤️ for HackNation 2025 by the **AKAI** team  
*(Akademickie Koło Aplikacji Internetowych, Politechnika Poznańska)*
