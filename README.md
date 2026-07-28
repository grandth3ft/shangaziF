# Shangazi Foundation — Frontend

Modern, premium donation platform for Shangazi Foundation, a children's home in Kenya.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit VITE_API_BASE_URL to point to your Flask backend

# 3. Start dev server
npm run dev
# → http://localhost:5173
```

---

## Phase Progress

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Project scaffold, config, design tokens, routing, state | ✅ Complete |
| 2 | Design system — primitive UI components | 🔜 Next |
| 3 | Wireframes | 🔜 |
| 4 | Component library | 🔜 |
| 5 | Public pages (Home, About, Programs, Impact, Gallery, Contact) | 🔜 |
| 6 | API integration — Donate page + STK Push flow | 🔜 |
| 7 | Admin dashboard (Login, Dashboard, Donations, Audit Logs) | 🔜 |
| 8 | Framer Motion animations pass | 🔜 |
| 9 | Optimization & production readiness | 🔜 |

---

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3 (custom design system)
- **Animation:** Framer Motion 11
- **Routing:** React Router 6
- **HTTP:** Axios (with JWT interceptors)
- **State:** Zustand
- **Forms:** React Hook Form
- **Notifications:** React Toastify
- **Charts:** Recharts
- **Icons:** Lucide React

---

## Project Structure

```
src/
├── api/          # Axios instances + typed API functions
├── components/
│   ├── ui/       # Primitive design system components
│   ├── layout/   # Navbar, Footer, PageLayout, AdminLayout
│   ├── sections/ # Homepage section blocks
│   └── shared/   # Cross-page reusable components
├── hooks/        # Custom React hooks
├── pages/
│   ├── public/   # Public-facing pages
│   └── admin/    # Admin dashboard pages
├── router/       # AppRouter + ProtectedRoute
├── store/        # Zustand stores (auth, donation)
├── styles/       # Global CSS + Tailwind directives
└── utils/        # Constants, formatters, validators, animations
```

---

## Design System

**Colors:** Terracotta `#C1440E` · Forest `#1A3A2A` · Amber `#E8943A` · Ivory `#FAF7F2`

**Fonts:** Playfair Display (display) · Inter (body) · JetBrains Mono (data/amounts)

**Concept:** "Roots & Light" — warm, hopeful, East African landscape palette executed with premium global nonprofit polish.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | Yes | Flask backend URL (`http://localhost:5000`) |
| `VITE_APP_NAME` | No | App display name |
| `VITE_APP_ENV` | No | `development` or `production` |

---

## Backend API Contract

All API calls match the Shangazi Foundation backend exactly:

| Endpoint | Method | Auth |
|----------|--------|------|
| `/api/donations/initiate` | POST | Public |
| `/api/donations/status/:id` | GET | Public |
| `/api/auth/login` | POST | Public |
| `/api/auth/logout` | POST | JWT |
| `/api/auth/refresh` | POST | Refresh token |
| `/api/admin/donations` | GET | JWT |
| `/api/admin/donations/:id` | GET | JWT |
| `/api/admin/stats` | GET | JWT |
| `/api/admin/export` | GET | JWT |
| `/api/admin/audit-logs` | GET | JWT + super_admin |
# shangazi-frontend
# shangaziF
