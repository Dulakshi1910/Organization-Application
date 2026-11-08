# Orglytics — Organization Intelligence Dashboard

**Orglytics** is a full-stack web application for visualizing and managing how organizations, their companies, technology stacks, and engineering health fit together. It turns raw company data into a clean, modern, dark-themed dashboard — metrics, breakdowns, tech radar, and per-company detail views — instead of boring tables.

> **License:** MIT · Copyright (c) 2026 Dulakshi Nimeshani

---

## 📑 Table of Contents

- [What This Application Does](#what-this-application-does)
- [Tech Stack & Languages](#tech-stack--languages)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [How to Run — Full Guide](#how-to-run--full-guide)
- [Available Scripts](#available-scripts)
- [Application Features & Pages](#application-features--pages)
- [Data Models](#data-models)
- [REST API Reference](#rest-api-reference)
- [How the Frontend Connects to the Backend](#how-the-frontend-connects-to-the-backend)
- [Scoring Formula](#scoring-formula)
- [Troubleshooting](#troubleshooting)
- [Roadmap / Planned Features](#roadmap--planned-features)

---

## What This Application Does

Orglytics helps you answer questions like:

- 📊 **How many companies** does my organization have, and how many people work in them?
- 🏗️ What **architecture styles** (Monolith, Microservices, Serverless…) are used across companies?
- 🛠️ What **tech stacks** (frontend, backend, database, DevOps, cloud) are most popular?
- ❤️ How healthy is our engineering — **test coverage, tech debt, uptime** — and which company scores highest?
- 🛠️ Which **tools** (Jira, Slack, GitHub Actions, Datadog…) does each company use?

**Main capabilities:**

| Feature | Description |
|---|---|
| 🏢 **Organizations** | Create, list, filter, update and delete organizations. Each org shows company count, total employees, and a preview of its companies. |
| 🏭 **Companies** | Full CRUD for companies nested under an organization, with search and status filters (Active / Inactive / Stealth / Acquired). |
| ➕ **4-Step Company Wizard** | Guided creation flow: **Basic → Tech → Architecture → Tools**. |
| 📈 **Dashboard** | KPI metrics, top frontend/backend technology, organization list, activity feed, and top companies with computed health scores. |
| 📡 **Tech Radar** | Aggregated technology usage across all companies, grouped by category (Frontend / Backend / Database / DevOps / Cloud) with hot/stable/emerging status. |
| 🏥 **Engineering Health** | Per-company health metrics (test coverage %, tech debt %, uptime %) with a ranked health report endpoint. |
| 🔍 **Company Detail** | Deep view of a single company: tech stack, engineering health, tools, and notes. |

---

## Tech Stack & Languages

### Languages

| Language | Where it's used |
|---|---|
| **JavaScript (JSX)** | Entire codebase — frontend components (`.jsx`) and backend (`.js`, ES Modules) |
| **HTML5** | Single entry page ([client/index.html](client/index.html)) |
| **CSS3** | Tailwind CSS utility classes + custom theme ([client/src/index.css](client/src/index.css)) |
| **JSON** | Dependency manifests & configuration |

### Frontend — [client/](client/)

| Technology | Version | Role |
|---|---|---|
| **React** | ^19.2.4 | UI library (function components, hooks: `useState`, `useEffect`, `useMemo`) |
| **Vite** | ^8.0.4 | Dev server & build tool (fast HMR, production bundling) |
| **React Router DOM** | ^7.14.1 | Client-side routing (`BrowserRouter`, nested routes) |
| **Tailwind CSS** | ^3.4.19 | Utility-first styling (dark theme: `#0B1220` background, indigo accents) |
| **React Icons** | ^5.6.0 | Icon set (`react-icons/fi` — Feather icons in the sidebar) |
| **ESLint** | ^9.39.4 | Linting (`eslint-plugin-react-hooks`, `react-refresh`) |
| **PostCSS + Autoprefixer** | — | CSS processing for Tailwind |

### Backend — [server/](server/)

| Technology | Version | Role |
|---|---|---|
| **Node.js** | ≥ 18 (tested on v22) | Runtime (uses **ES Modules** — `"type": "module"`) |
| **Express** | ^4.19.0 | HTTP framework, routing, middleware |
| **Mongoose** | ^8.0.0 | MongoDB ODM — schemas, validation, aggregations |
| **MongoDB** | Atlas or local | Database (via connection string) |
| **Dotenv** | ^16.4.0 | Loads environment variables from `server/.env` |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **Body-Parser** | ^1.20.3 | JSON / URL-encoded request body parsing |
| **Nodemon** (dev) | ^3.1.0 | Auto-restarts server on file changes |

---

## System Architecture

```mermaid
flowchart LR
    subgraph Client["Client — React + Vite (port 5173)"]
        P[Pages<br/>Dashboard · Companies<br/>Organizations · Tech Radar]
        S[Service layer<br/>fetch wrappers]
        P --> S
    end

    subgraph Server["Server — Express (port 5000)"]
        R[REST Routes<br/>/api/*]
        C[Controllers<br/>business logic + aggregations]
        M[Mongoose Models<br/>Organization · Company]
        R --> C --> M
    end

    DB[("MongoDB<br/>Orglytics database")]

    S -- "HTTP: /api/*" --> |"Vite dev proxy"| R
    M --> |"mongoose connect"| DB
```

**Connection flow (development):**

1. Browser loads the React app from the **Vite dev server** → `http://localhost:5173`.
2. Frontend services call relative URLs like `fetch('/api/organizations')`.
3. **Vite's dev proxy** ([client/vite.config.js](client/vite.config.js)) forwards any `/api` request to `http://localhost:5000` — so no CORS issues and no hard-coded URLs in the frontend.
4. The **Express server** ([server/app.js](server/app.js)) matches the path to a route → controller → Mongoose model → **MongoDB**.
5. JSON responses flow back through the same chain to the UI.

---

## Project Structure

```
Organization-Application/
├── README.md                  ← you are here
├── LICENSE                    ← MIT
│
├── client/                    ← React frontend (Vite + Tailwind)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js         ← dev proxy /api → localhost:5000
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx           ← app entry point
│       ├── App.jsx
│       ├── routes/index.jsx   ← all page routes
│       ├── pages/
│       │   ├── Dashboard/
│       │   ├── Companies/          (list, CreateCompany wizard, CompanyDetail)
│       │   ├── Organizations/      (list, create)
│       │   └── Technology/         (tech radar)
│       ├── components/
│       │   ├── layout/        ← DashboardLayout, Sidebar, Header, PageContainer
│       │   ├── common/        ← MetricCard, CompanyCard, OrgCard, ActivityItem
│       │   ├── companies/     ← CompanyTable, AddCompanyModal, steps/*
│       │   ├── organizations/ ← OrganizationGrid, CreateOrganizationForm, filters
│       │   ├── technology/    ← TechnologyGrid, TechnologyStats, filters
│       │   └── ui/            ← Button, Card, Input, Badge, Avatar, TechChip…
│       ├── services/          ← API call layer (fetch)
│       ├── mocks/             ← legacy mock data (no longer imported by pages)
│       ├── styles/theme.js
│       └── utils/cn.js
│
└── server/                    ← Express backend
    ├── server.js              ← entry: loads env, connects DB, listens
    ├── app.js                 ← Express app: middleware + route mounting
    ├── package.json
    ├── .env                   ← environment config (NOT committed — gitignored)
    ├── config/db.js           ← Mongoose connection
    ├── models/
    │   ├── organization.js
    │   └── company.js
    ├── controllers/
    │   ├── organizationController.js
    │   ├── companyController.js
    │   ├── dashboardController.js
    │   └── technologyController.js
    └── routes/
        ├── organization.js
        ├── company.js        ← nested: /api/organizations/:orgId/companies
        ├── companyGlobal.js  ← /api/companies/:companyId
        ├── dashboard.js      ← nested: /api/organizations/:orgId/dashboard
        └── technology.js
```

---

## Prerequisites

Make sure you have installed:

| Tool | Version | Check with |
|---|---|---|
| **Node.js** | 18 or newer (v22 recommended) | `node --version` |
| **npm** | 9 or newer (comes with Node) | `npm --version` |
| **MongoDB** | Any — [MongoDB Atlas](https://www.mongodb.com/atlas) free cluster **or** a local `mongod` | — |

> **No Git required to run**, but you'll need it to clone the repository.

---

## Environment Variables

The server reads configuration from **`server/.env`** (gitignored — never commit it). Required variables:

| Variable | Example | Description |
|---|---|---|
| `PORT` | `5000` | Port the Express server listens on |
| `DATABASE` | `mongodb+srv://user:<db_password>@cluster0.../Orglytics?...` | Full MongoDB connection string. **Must contain the literal placeholder `<db_password>`** — the server replaces it with `DATABASE_PASSWORD` at startup ([server/config/db.js](server/config/db.js)) |
| `DATABASE_PASSWORD` | `your-db-password` | The actual password substituted into `DATABASE` |
| `NODE_ENV` | `development` | Runtime mode |

### Creating `server/.env`

Create a file named `.env` inside the `server/` folder:

```env
PORT=5000
NODE_ENV=development
DATABASE=mongodb+srv://YOUR_USER:<db_password>@YOUR_CLUSTER.mongodb.net/Orglytics?retryWrites=true&w=majority
DATABASE_PASSWORD=YOUR_ACTUAL_PASSWORD
```

> ⚠️ **Important:** keep the `<db_password>` placeholder literally inside `DATABASE` — that's how the connection string gets completed at runtime. For a **local** MongoDB use: `DATABASE=mongodb://localhost:27017/Orglytics` (no password substitution needed, but still define `DATABASE_PASSWORD` as an empty-safe value or adjust [server/config/db.js](server/config/db.js)).

---

## How to Run — Full Guide

### 1. Clone the repository

```bash
git clone https://github.com/Dulakshi1910/Organization-Application.git
cd Organization-Application
```

### 2. Start the backend (Terminal 1)

```bash
cd server
npm install
npm run dev          # development (nodemon, auto-restart)
# — or —
npm start            # production (plain node)
```

Expected output:

```
✅ Mongodb Connected at : cluster0....mongodb.net
server running on: http://localhost:5000
```

Verify it's alive: open <http://localhost:5000/api/health> → `{"message":"Server is running"}`

### 3. Start the frontend (Terminal 2)

Open a **second terminal**, then:

```bash
cd client
npm install
npm run dev
```

Expected output:

```
  VITE v8.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

### 4. Open the app

Visit **<http://localhost:5173>** 🎉

> **Keep both terminals running.** The frontend proxies `/api` calls to the backend automatically — no extra configuration needed.

### 5. First-use walkthrough

1. Go to **Organizations → "+ Add Organization"** and create your first organization (only *Name* is required).
2. Go to **Companies → "+ Add Company"** and walk through the 4-step wizard (Basic → Tech → Architecture → Tools).
3. Return to the **Dashboard** — metrics, top tech, activity, and company cards will populate from real data.
4. Explore the **Tech Radar** for aggregated technology usage.

---

## Available Scripts

### Client (`cd client`)

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with hot reload (port 5173) |
| `npm run build` | Production build → `client/dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

### Server (`cd server`)

| Command | What it does |
|---|---|
| `npm start` | Start the Express server (`node server.js`) |
| `npm run dev` | Start with Nodemon (restarts on file changes) |

---

## Application Features & Pages

| Route | Page | What you can do |
|---|---|---|
| `/` | **Dashboard** | See KPI cards (Total Companies, Total Employees, Active Companies, Organizations), top frontend/backend tech, organization list, activity feed, and top companies with health scores |
| `/organizations` | **Organizations** | Grid of organizations with status filter, company count, employees, and company previews |
| `/organizations/create` | **Add Organization** | Form: name*, slug, description, industry, founded year, website, contact email, HQ (city/country), logo URL |
| `/companies` | **Companies** | Searchable, filterable table (All / Active / Inactive / Stealth / Acquired) |
| `/companies/create` | **Company Wizard** | 4-step guided creation: **Basic** (name, industry, org, employees…) → **Tech** (frontend/backend/database/devops/cloud) → **Architecture** (architecture, methodology, lifecycle, health) → **Tools** (PM, communication, CI/CD, monitoring) |
| `/companies/:companyId` | **Company Detail** | Full profile: basic info, tech stack, engineering health, tools & notes |
| `/tech-radar` | **Tech Radar** | Aggregated technologies by category with usage counts, stats, and category filters |
| `/api/health` | Health check | Backend liveness endpoint |

**Sidebar extras:** collapsible navigation, plus *Architecture Map* and *Settings* shown as disabled "coming soon" items.

---

## Data Models

### Organization ([server/models/organization.js](server/models/organization.js))

| Field | Type | Notes |
|---|---|---|
| `name` | String | **required**, trimmed |
| `slug` | String | unique, auto-generated from `name` before save |
| `description`, `website`, `logoUrl`, `contactEmail`, `industry` | String | optional profile data |
| `foundedYear` | Number | |
| `headquarters` | `{ city, country }` | |
| `isActive` | Boolean | default `true` |
| `companies` | Virtual | auto-populated list of related companies |
| `timestamps` | — | `createdAt` / `updatedAt` |

### Company ([server/models/company.js](server/models/company.js))

| Field | Type | Notes |
|---|---|---|
| `organization` | ObjectId → Organization | **required**, indexed — companies belong to an org |
| `name` | String | **required** |
| `industry` | Enum | FinTech, SaaS/EdTech, Cybersecurity, E-Commerce, Data & Analytics, HealthTech, PropTech, Logistics/Supply Chain, AI/ML, Other |
| `status` | Enum | `active` (default), `inactive`, `stealth`, `acquired` |
| `employees`, `foundedYear`, `description`, `website`, `brandColor`, `notes`, `tags` | — | profile fields |
| `techStack` | Object | `frontend[]`, `backend[]`, `database[]`, `devops[]` (arrays) + `cloud` (AWS, GCP, Azure, Vercel, Cloudflare, DigitalOcean, On-premise, Hybrid, Other) |
| `architecture` | Enum | Monolith, Microservices, Event-Driven, Serverless, Headless/Composable, Data Mesh, Hybrid, Other |
| `methodology` | Enum | Scrum, Kanban, SAFe Agile, Shape Up, XP, Waterfall, Lean, Other |
| `lifecycle` | Enum | Continuous Delivery/Deployment, Weekly/Biweekly Sprints, Monthly, Quarterly, Annual, Other |
| `engineeringHealth` | Object | `testCoverage` 0–100, `techDebt` 0–100, `uptime` 0–100 (default 99) |
| `tools` | Object | `projectManagement` (Jira, Linear, Notion…), `communication` (Slack, Teams, Discord…), `cicd` (GitHub Actions, GitLab CI, Jenkins…), `monitoring` (Datadog, Grafana, Sentry…) |
| Index | — | `{ organization: 1, status: 1 }` for fast filtered lookups |

---

## REST API Reference

Base URL: `http://localhost:5000` · All responses are JSON: `{ success, data | message }`

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server liveness check |

### Organizations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/organizations` | List orgs **with stats** (`companyCount`, `employees`, `companiesPreview`) |
| POST | `/api/organizations` | Create an organization |
| GET | `/api/organizations/:id` | Get one org (populated with its companies) |
| PUT | `/api/organizations/:id` | Update an organization |
| DELETE | `/api/organizations/:id` | Delete — **blocked (400)** if the org still has companies |

### Companies (nested under an organization)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/organizations/:orgId/companies` | List companies. **Query filters:** `?status=`, `?architecture=`, `?methodology=`, `?cloud=`, `?search=<name>` |
| POST | `/api/organizations/:orgId/companies` | Create a company in that org |
| GET | `/api/organizations/:orgId/companies/:companyId` | Get one company (org-scoped) |
| PUT | `/api/organizations/:orgId/companies/:companyId` | Update a company |
| DELETE | `/api/organizations/:orgId/companies/:companyId` | Delete a company |
| PATCH | `/api/organizations/:orgId/companies/:companyId/health` | Update only `engineeringHealth` (`testCoverage`, `techDebt`, `uptime`) |
| GET | `/api/companies/:companyId` | Get any company by id (global, no org needed) |

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/organizations/:orgId/dashboard` | Full dashboard payload: `summary` (totals & averages), `breakdowns` (architecture, methodology, cloud, lifecycle, status, industry), `recentCompanies` (with computed `score`), `topTechnologies` (frontend/backend) |
| GET | `/api/organizations/:orgId/dashboard/health` | Ranked per-company health report (sorted by score, desc) |

### Technologies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/technologies` | Aggregated tech usage across **all** orgs — categories: Frontend, Backend, Database, DevOps, Cloud |
| GET | `/api/technologies?orgId=<id>` | Same, scoped to one organization |

Each item: `{ id, name, category, companies, status }` where `status` is `hot` (≥50 companies), `stable` (≥10), or `emerging`.

### Example requests

```bash
# Health check
curl http://localhost:5000/api/health

# All organizations with stats
curl http://localhost:5000/api/organizations

# Create an organization
curl -X POST http://localhost:5000/api/organizations \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme Corp","industry":"SaaS / EdTech","description":"Demo org"}'

# List active companies of an org
curl "http://localhost:5000/api/organizations/<orgId>/companies?status=active"

# Dashboard for an org
curl http://localhost:5000/api/organizations/<orgId>/dashboard

# Technology radar (all orgs)
curl http://localhost:5000/api/technologies
```

---

## How the Frontend Connects to the Backend

All API calls live in **[client/src/services/](client/src/services/)** and use the native `fetch` API with **relative URLs**:

| Service | File | Used by |
|---|---|---|
| `getOrganizations`, `createOrganization` | [organizationService.js](client/src/services/organizationService.js) | Organizations page, create form, dashboard |
| `getCompanies`, `getCompanyById`, `createCompany` | [companyService.js](client/src/services/companyService.js) | Companies table, wizard, detail page |
| `getDashboardData` | [dashboardService.js](client/src/services/dashboardService.js) | Dashboard (aggregates dashboard + orgs endpoints) |
| `getTechnologies` | [technologyService.js](client/src/services/technologyService.js) | Tech Radar |

**The glue** is the Vite dev proxy in [client/vite.config.js](client/vite.config.js):

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',   // Express backend
      changeOrigin: true,
      secure: false,
    },
  },
},
```

So `fetch('/api/organizations')` in the browser → `http://localhost:5000/api/organizations` on the server. Services also normalize backend payloads (`_id` → `id`, nested shapes) into the exact shapes the UI components expect.

---

## Scoring Formula

Dashboard company cards and the health report compute a **0–100 health score**:

$$\text{score} = \mathrm{round}\left(\frac{\text{testCoverage} + \text{uptime} + (100 - \text{techDebt})}{3}\right)$$

Implemented as a MongoDB aggregation (`$avg`-style `$divide`) in [dashboardController.js](server/controllers/dashboardController.js) and mirrored on the client in [dashboardService.js](client/src/services/dashboardService.js).

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Mongoose ServerSelectionError` / no `✅ Mongodb Connected` | Check `server/.env`: `DATABASE` must contain the literal `<db_password>` placeholder, and `DATABASE_PASSWORD` must be correct. Verify network access in MongoDB Atlas (IP allowlist: `0.0.0.0/0` for dev) |
| `DATABASE.replace is not a function` | `DATABASE` is missing from `.env` |
| Frontend shows empty data / `Failed to load` | Make sure the **server is running on port 5000** — the Vite proxy targets that port. Check `curl http://localhost:5000/api/health` |
| Port already in use | Change `PORT` in `server/.env`, or change the Vite proxy target accordingly |
| `EADDRINUSE :5173` | Another Vite instance is running — stop it or use `npm run dev -- --port 5174` |
| Blank page or 404 on deep links | Run `npm run build` in `client/` and serve `dist/` behind a static host that rewrites all paths to `index.html` (SPA fallback). The Vite dev server handles this automatically |
| Cannot delete an organization | The API refuses (400) while the org still has companies — delete its companies first |
| `ERR_MODULE_NOT_FOUND` in server | Run `npm install` inside `server/`; the project uses ES Modules (`"type": "module"`) — use `import` syntax, not `require` |

---

## Roadmap / Planned Features

### 🚀 Quick wins (UI already backed by existing APIs)

These endpoints **already exist** — only the UI is missing:

| Feature | Description |
|---|---|
| ✏️ **Company edit & delete UI** | The API supports `PUT`/`DELETE`, but the UI only has "Add Company" — add row actions to [CompanyTable](client/src/components/companies/CompanyTable) |
| ✏️ **Organization edit & delete UI** | Same for organizations (delete is already guarded server-side when companies exist) |
| 📊 **Dashboard breakdown charts** | `/dashboard` already returns `breakdowns` (architecture, methodology, cloud, lifecycle, status, industry) — render them as donut/bar charts (Recharts or Chart.js) |
| 🏥 **Health Report page** | `/dashboard/health` already returns a ranked, scored company list — build a leaderboard UI from it |
| 🔍 **Server-side pagination & filtering** | Companies list will outgrow the current client-side `useMemo` filter — push `?page=&limit=&status=` into the existing query filters |
| 🏷️ **Tags & advanced filters** | `tags[]` exists on the Company model but is unused — add tag chips as filters across Companies and Tech Radar |

### 🎨 UX & Interface

| Feature | Description |
|---|---|
| 🗺️ **Architecture Map** | *(already in sidebar)* Visual graph of companies by architecture style — e.g., React Flow / D3 force layout showing Monolith vs Microservices vs Serverless clusters |
| ⚙️ **Settings** | *(already in sidebar)* Profile, organization defaults, theme, and data-management preferences |
| 🌓 **Dark / light theme toggle** | The UI is dark-only today — add a theme switcher (Tailwind `dark:` variants + context) |
| ⌘K **Command palette** | Modern global search overlay (React `cmdk`) to jump to any organization, company, or page instantly |
| 📱 **Responsive / PWA polish** | Mobile-friendly tables and an installable app shell for on-the-go checks |
| 💾 **Saved views** | Let users save filter combinations ("Active FinTechs", "AWS companies > 100 employees") |

### 📊 Analytics & Insights

| Feature | Description |
|---|---|
| 📈 **Health score trends** | Snapshot `engineeringHealth` over time and plot score/coverage/debt/uptime as trend lines instead of a single static value |
| 📉 **Tech adoption over time** | The Tech Radar is a static count today — show quarter-over-quarter adoption trends (which technologies are rising or fading) |
| 🎯 **ThoughtWorks-style quadrant radar** | Evolve Tech Radar into the classic radar: *Adopt / Trial / Assess / Hold* quadrants per category |
| 🏭 **Industry benchmarking** | Compare a company's health score against the industry average (the `industryBreakdown` aggregation already groups by industry) |
| 📤 **Export & reporting** | CSV/Excel export of companies and health reports; printable PDF summary for stakeholders |
| 📥 **Bulk import** | CSV/JSON upload to onboard many companies at once (pair with export for portability) |
| 🔔 **Threshold alerts** | Notify when a company's tech debt exceeds 80% or uptime drops below SLA |

### 🤖 AI-Powered (modern)

| Feature | Description |
|---|---|
| 🧠 **AI health summaries** | LLM-generated plain-language digests: *"3 companies have high tech debt; frontend is dominated by React…"* |
| 💡 **Smart recommendations** | Suggest actions from the data (add test coverage, consolidate monitoring tools, migrate off deprecated tech) |
| 🗣️ **Natural-language querying** | Ask questions in a search box — *"which AWS companies use Scrum?"* — resolved into API filters |

### 🔗 Integrations

| Feature | Description |
|---|---|
| 🐙 **GitHub / GitLab sync** | Auto-populate tech stacks and repo activity instead of manual entry |
| 🛠️ **Jira / Linear sync** | Pull delivery metrics (velocity, cycle time) into engineering health |
| 💬 **Slack notifications** | Post health-score changes and new-company events to a channel |
| 🔌 **Public REST API + API keys** | Token-authenticated access so other tools can consume Orglytics data |

### 🛡️ Security & Multi-tenancy

| Feature | Description |
|---|---|
| 🔐 **Authentication & RBAC** | JWT or OAuth (GitHub/Google) login with roles: `admin`, `editor`, `viewer` |
| 🏢 **Multi-tenant organizations** | Scope users to organizations so each tenant only sees its own data |
| 🛡️ **API hardening** | `helmet` headers, `express-rate-limit`, stricter input validation (e.g., Joi/Zod), and MongoDB query sanitization |
| 🔑 **Secrets management** | Move off `.env` files to a secrets manager for production deploys |

### ⚙️ DevOps & Quality

| Feature | Description |
|---|---|
| 🐳 **Docker & Compose** | One-command startup: `docker compose up` launching server + client + MongoDB |
| 🧪 **Automated tests** | Vitest/Jest + Supertest for API endpoints, React Testing Library for components |
| 🔄 **CI/CD pipeline** | GitHub Actions: lint → test → build → deploy on every push |
| ⚡ **Redis caching** | Cache expensive dashboard aggregations (13 parallel queries per request) with short TTLs |
| 📜 **OpenAPI docs** | Auto-generated Swagger UI from route definitions |

---

## Legacy Note

[client/src/mocks/](client/src/mocks/) contains early mock data used before the backend was connected. Pages now fetch **real data** through the service layer; the mocks are kept for reference only.

---

## License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE).
