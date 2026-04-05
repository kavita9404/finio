import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
  icon?: string;
}

export interface TransactionFilters {
  search: string;
  type: TransactionType | "";
  category: string;
  month: string;
  sortKey: keyof Transaction;
  sortDir: 1 | -1;
}

export type AppRole = "admin" | "viewer";

export interface TransactionsState {
  transactions: Transaction[];
  filters: TransactionFilters;
  role: AppRole;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1",  date: "2025-10-05", description: "Monthly Salary",       category: "Salary",        type: "income",  amount: 4800, icon: "/assets/icons/card-icon.svg" },
  { id: "2",  date: "2025-10-08", description: "Netflix Subscription", category: "Entertainment", type: "expense", amount: 18,   icon: "/assets/icons/paypal-icon.svg" },
  { id: "3",  date: "2025-10-10", description: "Grocery Run",          category: "Food",          type: "expense", amount: 145,  icon: "/assets/icons/cash-icon.svg" },
  { id: "4",  date: "2025-10-12", description: "Rent Payment",         category: "Housing",       type: "expense", amount: 1400, icon: "/assets/icons/card-icon.svg" },
  { id: "5",  date: "2025-10-15", description: "Freelance Project",    category: "Freelance",     type: "income",  amount: 1200, icon: "/assets/icons/cash-icon.svg" },
  { id: "6",  date: "2025-10-17", description: "Pharmacy",             category: "Health",        type: "expense", amount: 55,   icon: "/assets/icons/cash-icon.svg" },
  { id: "7",  date: "2025-10-19", description: "Uber Rides",           category: "Transport",     type: "expense", amount: 62,   icon: "/assets/icons/paypal-icon.svg" },
  { id: "8",  date: "2025-10-22", description: "Online Shopping",      category: "Shopping",      type: "expense", amount: 210,  icon: "/assets/icons/card-icon.svg" },
  { id: "9",  date: "2025-10-25", description: "Restaurant Dinner",    category: "Food",          type: "expense", amount: 89,   icon: "/assets/icons/cash-icon.svg" },
  { id: "10", date: "2025-10-28", description: "Gym Membership",       category: "Health",        type: "expense", amount: 45,   icon: "/assets/icons/paypal-icon.svg" },
  { id: "11", date: "2025-11-01", description: "Monthly Salary",       category: "Salary",        type: "income",  amount: 4800, icon: "/assets/icons/card-icon.svg" },
  { id: "12", date: "2025-11-03", description: "Electricity Bill",     category: "Housing",       type: "expense", amount: 130,  icon: "/assets/icons/cash-icon.svg" },
  { id: "13", date: "2025-11-06", description: "Coffee Shops",         category: "Food",          type: "expense", amount: 47,   icon: "/assets/icons/paypal-icon.svg" },
  { id: "14", date: "2025-11-09", description: "Freelance Payment",    category: "Freelance",     type: "income",  amount: 800,  icon: "/assets/icons/cash-icon.svg" },
  { id: "15", date: "2025-11-12", description: "Clothing Purchase",    category: "Shopping",      type: "expense", amount: 175,  icon: "/assets/icons/card-icon.svg" },
  { id: "16", date: "2025-11-14", description: "Rent Payment",         category: "Housing",       type: "expense", amount: 1400, icon: "/assets/icons/card-icon.svg" },
  { id: "17", date: "2025-11-18", description: "Doctor Visit",         category: "Health",        type: "expense", amount: 120,  icon: "/assets/icons/cash-icon.svg" },
  { id: "18", date: "2025-11-22", description: "Transport Pass",       category: "Transport",     type: "expense", amount: 80,   icon: "/assets/icons/paypal-icon.svg" },
  { id: "19", date: "2025-11-26", description: "Movie Tickets",        category: "Entertainment", type: "expense", amount: 34,   icon: "/assets/icons/cash-icon.svg" },
  { id: "20", date: "2025-11-29", description: "Investment Return",    category: "Investment",    type: "income",  amount: 400,  icon: "/assets/icons/paypal-icon.svg" },
  { id: "21", date: "2025-12-01", description: "Monthly Salary",       category: "Salary",        type: "income",  amount: 4800, icon: "/assets/icons/card-icon.svg" },
  { id: "22", date: "2025-12-04", description: "Groceries",            category: "Food",          type: "expense", amount: 162,  icon: "/assets/icons/cash-icon.svg" },
  { id: "23", date: "2025-12-07", description: "Rent Payment",         category: "Housing",       type: "expense", amount: 1400, icon: "/assets/icons/card-icon.svg" },
  { id: "24", date: "2025-12-10", description: "Holiday Shopping",     category: "Shopping",      type: "expense", amount: 380,  icon: "/assets/icons/paypal-icon.svg" },
  { id: "25", date: "2025-12-14", description: "Freelance Bonus",      category: "Freelance",     type: "income",  amount: 1600, icon: "/assets/icons/cash-icon.svg" },
  { id: "26", date: "2025-12-17", description: "Restaurant",           category: "Food",          type: "expense", amount: 95,   icon: "/assets/icons/cash-icon.svg" },
  { id: "27", date: "2025-12-20", description: "Travel Booking",       category: "Transport",     type: "expense", amount: 290,  icon: "/assets/icons/paypal-icon.svg" },
  { id: "28", date: "2025-12-23", description: "Streaming Services",   category: "Entertainment", type: "expense", amount: 52,   icon: "/assets/icons/card-icon.svg" },
  { id: "29", date: "2025-12-27", description: "Pharmacy Refill",      category: "Health",        type: "expense", amount: 38,   icon: "/assets/icons/cash-icon.svg" },
  { id: "30", date: "2025-12-30", description: "Investment Return",    category: "Investment",    type: "income",  amount: 520,  icon: "/assets/icons/paypal-icon.svg" },
];

const initialState: TransactionsState = {
  transactions: MOCK_TRANSACTIONS,
  filters: {
    search: "",
    type: "",
    category: "",
    month: "",
    sortKey: "date",
    sortDir: -1,
  },
  role: "admin",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, "id">>) => {
      state.transactions.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const idx = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (idx !== -1) state.transactions[idx] = action.payload;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<TransactionFilters>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setRole: (state, action: PayloadAction<AppRole>) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Always reset role to "admin" when state is rehydrated from localStorage
    builder.addCase(REHYDRATE, (state) => {
      state.role = "admin";
    });
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilters,
  resetFilters,
  setRole,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;

