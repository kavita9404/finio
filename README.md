
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

---


## Features Description

**Dashboard**
- Summary cards for total balance, income, and expenses — calculated from real transaction data
- Balance history area chart showing cumulative running balance month by month
- Weekly activity bar chart grouped by actual transaction dates
- Expense statistics pie chart from your top spending categories
- Recent transactions pulled live from Redux, sorted by date
- Quick Transfer creates a real transaction entry when you send

**Transactions**
- Search by description or category
- Filter by type, category, and month independently
- Click any column header to sort ascending or descending
- Add, edit, delete transactions (Admin only) with confirmation prompts
- Export current filtered view as CSV or JSON

**Role Based UI**
- Admin — full access to add, edit, delete, transfer
- Viewer — read-only with a banner shown on every page
- Switch using the dropdown in the navbar
- Role always resets to Admin on page refresh by design

**Insights**
- Highest spending category with percentage of total expenses
- Savings rate for the current month
- Month-over-month expense comparison
- Income vs expenses bar chart for last 6 months
- Category ranking with horizontal bars and detail table

**Dark Mode**
- Toggle between light and dark with the sun/moon slider in the navbar
- Preference saved to localStorage across sessions

**Other**
- Live search in navbar — results dropdown shows matching transactions instantly
- All data persists across page refreshes via redux-persist
- Empty state handling throughout — no blank screens when data is missing
- Responsive layout across mobile, tablet, and desktop

---


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
 
