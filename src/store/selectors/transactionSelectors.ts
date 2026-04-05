import { RootState } from "../store";
import { Transaction, TransactionsState } from "../slices/transactionsSlice";

export const selectAllTransactions = (state: RootState): Transaction[] =>
  state.transactions.transactions;

export const selectFilters = (state: RootState) =>
  state.transactions.filters;

export const selectRole = (state: RootState) =>
  state.transactions.role;

export const selectFilteredTransactions = (state: RootState): Transaction[] => {
  const { transactions, filters } = state.transactions as TransactionsState;
  const { search, type, category, month, sortKey, sortDir } = filters;

  let result = (transactions as Transaction[]).filter((t: Transaction) => {
    if (type && t.type !== type) return false;
    if (category && t.category !== category) return false;
    if (month && !t.date.startsWith(month)) return false;
    if (
      search &&
      !t.description.toLowerCase().includes(search.toLowerCase()) &&
      !t.category.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    const av = a[sortKey] as any;
    const bv = b[sortKey] as any;
    if (typeof av === "string") return av.localeCompare(bv) * sortDir;
    return ((av as number) - (bv as number)) * sortDir;
  });

  return result;
};

export const selectSummaryStats = (state: RootState) => {
  const transactions = state.transactions.transactions as Transaction[];
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  return { totalIncome, totalExpenses, balance };
};

export const selectMonthlyData = (state: RootState) => {
  const transactions = state.transactions.transactions as Transaction[];
  const map: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((t) => {
    const m = t.date.substring(0, 7);
    if (!map[m]) map[m] = { income: 0, expense: 0 };
    map[m][t.type] += t.amount;
  });
  return map;
};

export const selectCategoryTotals = (state: RootState) => {
  const transactions = state.transactions.transactions as Transaction[];
  const map: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return map;
};

export const selectUniqueCategories = (state: RootState): string[] => {
  const transactions = state.transactions.transactions as Transaction[];
  return [...new Set(transactions.map((t) => t.category))].sort();
};

export const selectUniqueMonths = (state: RootState): string[] => {
  const transactions = state.transactions.transactions as Transaction[];
  return [...new Set(transactions.map((t) => t.date.substring(0, 7)))].sort().reverse();
};
