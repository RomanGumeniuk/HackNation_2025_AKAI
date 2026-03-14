<div align="center">

![HackNation Logo](./client/public/logo.png)

# HackNation 2025 — AKAI

<strong>Intelligent Legislative Platform for Poland</strong>

[![Built at HackNation 2025](https://img.shields.io/badge/Built%20at-HackNation%202025-blue?style=for-the-badge)](https://hacknation.gov.pl)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

</div>

---

> 🏛️ **Built during HackNation 2025** (6–7 December 2025, Bydgoszcz) — Poland's first nationwide implementation hackathon organized by the Ministry of Digitization, GovTech Polska, and the City of Bydgoszcz.

Front‑end for a civic-tech prototype built with **Next.js 15** (App Router) and **TypeScript**. The app helps users browse, track, and discuss Polish legislative proposals, surfacing the hottest laws, latest updates, and related consultations.

## 🎯 Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🏛️ Legislative Dashboard</h3>
      <p>Browse hottest and most recently updated Polish laws in real-time</p>
    </td>
    <td width="50%">
      <h3>💬 AI-Powered Chat</h3>
      <p>Ask questions about laws with integrated chatbot powered by Gemini</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📊 Live Analytics</h3>
      <p>Animated counters and trending data visualization</p>
    </td>
    <td>
      <h3>🗓️ Consultations Hub</h3>
      <p>Track public consultations and stakeholder feedback</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📄 PDF Analysis</h3>
      <p>Upload and analyze legislative documents with AI</p>
    </td>
    <td>
      <h3>🗺️ Interactive Maps</h3>
      <p>Visualize legislation by region and location</p>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

**Frontend Core**
- ⚡ **Next.js 15** — App Router with React 19
- 🎨 **TypeScript 5** — Type-safe development
- 💨 **Tailwind CSS 4** — Modern utility-first styling
- 🎭 **Radix UI** — Accessible component primitives

**Real-time & Data**
- 🔌 **Socket.IO** — Live updates and WebSocket communication
- 📚 **React PDF** — Document viewing and analysis
- 📍 **Leaflet** — Interactive mapping

**Animation & Polish UX**
- ✨ **GSAP** — Advanced animations
- 🎬 **Lucide React** — Beautiful icons
- 🔢 **CountUp** — Animated counters
- 🎯 **Motion** — Smooth transitions

</div>

---


## 📁 Project Structure

```
HackNation_2025_AKAI/
├── client/                          # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                     # 🗺️ Routing & Pages (App Router)
│   │   │   ├── page.tsx             # Landing dashboard
│   │   │   ├── edukacja/            # Education & legislative process
│   │   │   ├── konsultacje/         # Public consultations
│   │   │   ├── map/                 # Interactive map view
│   │   │   ├── pdf/                 # Document analysis with AI
│   │   │   └── ustawy/              # Laws listing & details
│   │   ├── components/              # 🧩 Reusable UI Components
│   │   │   ├── chatbot/             # AI Chat interface
│   │   │   ├── consultations/       # Consultation filters & tables
│   │   │   ├── education/           # Legislative process graph
│   │   │   ├── map/                 # Leaflet integration
│   │   │   ├── pdf/                 # PDF viewer
│   │   │   └── ui/                  # Radix primitives & shared UI
│   │   ├── contexts/                # 🔄 React Context Providers
│   │   ├── lib/                     # 🧰 Utilities & Helpers
│   │   ├── mock_data/               # 📊 Static datasets (hackathon data)
│   │   ├── socket.ts                # 🔌 Socket.IO configuration
│   │   └── app/globals.css          # 🎨 Global styles
│   ├── public/                      # 📦 Static assets
│   └── package.json                 # Dependencies & scripts
└── README.md                        # This file
```

---

## 🚀 Quick Start

### Installation

```bash
cd client
npm install
# or with pnpm
pnpm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the page will auto-reload on changes.

### Production Build

```bash
npm run build
npm start
```

### Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint with TypeScript support |

---

## ⚙️ Environment Configuration


## ⚙️ Environment Configuration

Create a `.env.local` file in the `client/` directory to enable Socket.IO and AI features:

```env
# Backend API Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
# or legacy name for compatibility
NEXT_PUBLIC_SOCKET_URL=http://your-backend-host:8080
```

The Socket.IO client reads this at runtime. Without this variable set, the app gracefully falls back to offline mode.

**Configuration Files:**
- `postcss.config.mjs` — Tailwind CSS & PostCSS settings
- `tsconfig.json` — TypeScript configuration  
- `next.config.ts` — Next.js build configuration
- `src/app/globals.css` — Global styles & CSS variables

---

## 📖 Routes & Pages

| Route | Purpose | Features |
|-------|---------|----------|
| `/` | Landing Dashboard | Trending laws, recent updates, statistics |
| `/ustawy` | Laws Directory | Full searchable list with filters |
| `/ustawy/[id]` | Law Details | Single law page with full details |
| `/konsultacje` | Consultations Hub | Public consultation browser |
| `/edukacja` | Education | Interactive legislative process graph |
| `/map` | Regional Map | Laws by location visualization |
| `/pdf` | Document Viewer | PDF upload & AI analysis |

---

## 📊 Data Structure

Sample law object from `src/mock_data/laws.ts`:

```typescript
{
  id: "LAW_001",
  name: "ustawa_o_podatku",
  title: "Ustawa o podatku dochodowym osób fizycznych",
  lastUpdate: "2025-03-14",
  createdDate: "2024-12-15",
  category: "Podatki",
  stage: "Czytanie I",
  follows: 4520,
  location: "Warszawa",
  tags: ["podatki", "podatnik", "PIT"]
  // ... additional fields
}
```

---

## 🔧 Development Notes

- **Server Components & Client Boundary**: Uses Next.js App Router with server components; interactive parts explicitly marked with `"use client"`
- **Client-Side Heavy Lifting**: Animations, counters, and real-time features run client-side
- **Mock Data**: `src/mock_data/` contains static datasets. Replace with API calls as backend solidifies
- **Socket Context**: Global `SocketContext` provider manages Socket.IO state across app
- **Type Safety**: Full TypeScript coverage with strict mode for reliability

### Best Practices

✅ Keep real-time logic in client components  
✅ Use context for global state (socket, accessibility)  
✅ Fetch laws/consultation data from backend API  
✅ Implement loading & error states for async operations  
✅ Test on actual backend connection before deploying  

---

## 🚀 Roadmap & Extensions

### Phase 2 Enhancements
- [ ] Connect to real government legislation API
- [ ] Build full authentication & user profiles
- [ ] Implement WebSocket auth & reconnection logic
- [ ] Add email notifications for tracked laws
- [ ] Expand consultation detail pages (`/konsultacje/[id]`)

### Quality & Deployment
- [ ] Add comprehensive unit & integration tests
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Performance optimization & image lazy-loading
- [ ] Dark mode & accessibility audit (WCAG 2.1 AA)
- [ ] Multi-language support (EN/PL)

---

## 🤝 Contributing

This project was built during **HackNation 2025** as a rapid prototype. For improvements:

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes and test thoroughly
3. Submit a PR with description of changes
4. Update README if adding new features or environment variables

---

## 📝 License

Built for HackNation 2025 — GovTech Polska initiative  
Ministry of Digitization collaboration

---

<div align="center">

**Made with ❤️ at HackNation 2025 (Bydgoszcz, December 6–7, 2025)**

*For more info: [hacknation.gov.pl](https://hacknation.gov.pl)*

![Sejm Logo](./client/public/Sejm_logo.svg)

</div>
