
# Finio — Financial Dashboard

A fully responsive financial dashboard where you can track income, expenses, investments, loans, and more all in one place. Built with **Vite**, **React**, **TypeScript**, **TailwindCSS**.

## Key Features

- **Dashboard** — Summary cards (Balance, Income, Expenses), Balance History chart, Weekly Activity chart, Expense Statistics pie chart, Recent Transactions, Quick Transfer
- **Transactions** — Full list with search, filter by type/category/month, sortable columns, add/edit/delete (Admin only), export CSV & JSON
- **Insights** — Monthly income vs expenses chart, category breakdown, savings rate, month-over-month comparison
- **Role Based UI** — Switch between Admin (full access) and Viewer (read-only) from the navbar
- **Dark / Light Mode** — Toggle in navbar, preference saved to localStorage
- **Accounts, Investments, Credit Cards, Loans, Services, Privileges** — All pages built with realistic mock data
- **Persistent State** — Transaction data survives page refresh via redux-persist
- **Responsive** — Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** TailwindCSS
- **State Management:** Redux Toolkit + redux-persist
- **Charts:** ApexCharts + Chart.js
- **Build Tool:** Vite

---
 
## Pages
 
| Page | What's inside |
|---|---|
| **Dashboard** | Balance, income & expense cards, balance history chart, weekly activity, spending breakdown pie, recent transactions, quick transfer |
| **Transactions** | Full list with search, filters, sort, add/edit/delete, CSV & JSON export |
| **Insights** | Monthly comparison chart, category breakdown, savings rate, month-over-month trend |
| **Accounts** | Multi-account view with balance details and recent activity |
| **Investments** | Portfolio holdings table, performance chart, allocation breakdown |
| **Credit Cards** | Card details, utilization bar, recent charges |
| **Loans** | Active loans with payoff progress and payment history |
| **Services** | Quick transfer, bill payments, upcoming dues |
| **Privileges** | Membership tiers, rewards points, benefits breakdown |
| **Settings** | Edit profile, preferences, security — all three tabs functional |
 
---

## Installation
```bash
git clone https://github.com/kavita9404/finio.git
cd finio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)
---
 
## Project Structure
 
```
finio/
├── public/
│   └── assets/
│       ├── icons/          # SVG icons used throughout the app
│       └── images/         # Profile photos and contact avatars
├── src/
│   ├── assets/icons/       # React icon components
│   ├── components/         # Shared components (Navbar, Sidebar, Charts, Cards)
│   ├── global/             # ThemeContext, AppContext
│   ├── pages/              # One file per route
│   ├── store/
│   │   ├── selectors/      # Memoized Redux selectors
│   │   └── slices/         # transactionsSlice, menuSlice, userSlice
│   └── utils/              # Yup schemas, date helpers, constants
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```
 
---
 
