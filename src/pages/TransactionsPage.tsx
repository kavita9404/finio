import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilters,
  resetFilters,
  Transaction,
} from "../store/slices/transactionsSlice";
import {
  selectFilteredTransactions,
  selectFilters,
  selectRole,
  selectUniqueCategories,
  selectUniqueMonths,
} from "../store/selectors/transactionSelectors";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CATEGORIES = [
  "Salary","Freelance","Investment","Food","Housing",
  "Transport","Health","Shopping","Entertainment","Other",
];

const ICONS: Record<string, string> = {
  Salary: "/assets/icons/card-icon.svg",
  Freelance: "/assets/icons/cash-icon.svg",
  Investment: "/assets/icons/paypal-icon.svg",
  Food: "/assets/icons/cash-icon.svg",
  Housing: "/assets/icons/card-icon.svg",
  Transport: "/assets/icons/paypal-icon.svg",
  Health: "/assets/icons/cash-icon.svg",
  Shopping: "/assets/icons/card-icon.svg",
  Entertainment: "/assets/icons/paypal-icon.svg",
  Other: "/assets/icons/cash-icon.svg",
};

const emptyForm = {
  date: new Date().toISOString().split("T")[0],
  description: "",
  amount: "",
  type: "expense" as "income" | "expense",
  category: "Food",
};

const SortIcon = ({ col, sortKey, sortDir }: { col: string; sortKey: string; sortDir: number }) => {
  if (col !== sortKey) return <span className="text-[#718EBF] opacity-40 ml-1">↕</span>;
  return <span className="text-[#343C6A] ml-1">{sortDir === 1 ? "↑" : "↓"}</span>;
};

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectFilteredTransactions);
  const filters = useSelector(selectFilters);
  const role = useSelector(selectRole);
  const categories = useSelector(selectUniqueCategories);
  const months = useSelector(selectUniqueMonths);
  const isAdmin = role === "admin";

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const monthLabels = useMemo(
    () => months.reduce<Record<string, string>>((acc, m) => {
      const d = new Date(m + "-01");
      acc[m] = d.toLocaleString("default", { month: "long", year: "numeric" });
      return acc;
    }, {}),
    [months]
  );

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (t: Transaction) => {
    setEditTarget(t);
    setForm({ date: t.date, description: t.description, amount: String(t.amount), type: t.type, category: t.category });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.date || !form.description.trim() || !form.amount) { setFormError("Please fill in all fields."); return; }
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) { setFormError("Amount must be a positive number."); return; }
    const payload = {
      date: form.date, description: form.description.trim(), amount: amt,
      type: form.type, category: form.category, icon: ICONS[form.category] || "/assets/icons/cash-icon.svg",
    };
    if (editTarget) { dispatch(updateTransaction({ ...payload, id: editTarget.id })); }
    else { dispatch(addTransaction(payload)); }
    setModalOpen(false);
  };

  // FIX: properly dispatch delete
  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
    setDeleteConfirm(null);
  };

  const handleSort = (key: keyof Transaction) => {
    if (filters.sortKey === key) { dispatch(setFilters({ sortDir: filters.sortDir === 1 ? -1 : 1 })); }
    else { dispatch(setFilters({ sortKey: key, sortDir: -1 })); }
  };

  const exportCSV = () => {
    const header = "Date,Description,Category,Type,Amount\n";
    const rows = transactions.map((t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([header + rows], { type: "text/csv" }));
    a.download = "transactions.csv"; a.click();
  };

  const exportJSON = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" }));
    a.download = "transactions.json"; a.click();
  };

  const inputCls = "flex shadow-none text-[0.8125rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-[#343C6A] rounded-[0.9375rem] border border-[#DFEAF2] items-center focus:outline-none focus:border-[#343C6A] w-full";
  const cols: [keyof Transaction, string][] = [["date","Date"],["description","Description"],["category","Category"],["type","Type"],["amount","Amount"]];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* Filters + actions */}
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="/assets/icons/search-icon.svg" alt="search" className="w-4 h-4" />
              </div>
              <input
                className="pl-9 pr-4 py-2 text-[0.8125rem] bg-[#F5F7FA] border border-[#DFEAF2] rounded-full focus:outline-none focus:border-[#343C6A] text-[#343C6A] w-[13rem]"
                placeholder="Search transactions…"
                value={filters.search}
                onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
              />
            </div>
            <select className="text-[0.8125rem] text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-full px-3 py-2 focus:outline-none cursor-pointer"
              value={filters.type} onChange={(e) => dispatch(setFilters({ type: e.target.value as "income" | "expense" | "" }))}>
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select className="text-[0.8125rem] text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-full px-3 py-2 focus:outline-none cursor-pointer"
              value={filters.category} onChange={(e) => dispatch(setFilters({ category: e.target.value }))}>
              <option value="">All categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="text-[0.8125rem] text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-full px-3 py-2 focus:outline-none cursor-pointer"
              value={filters.month} onChange={(e) => dispatch(setFilters({ month: e.target.value }))}>
              <option value="">All months</option>
              {months.map((m) => <option key={m} value={m}>{monthLabels[m]}</option>)}
            </select>
            {(filters.search || filters.type || filters.category || filters.month) && (
              <button onClick={() => dispatch(resetFilters())} className="text-[0.8125rem] text-[#718EBF] hover:text-[#343C6A] underline">Clear filters</button>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={exportCSV} className="text-[0.8125rem] text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-full px-4 py-2 hover:bg-[#DFEAF2] transition-colors">Export CSV</button>
            <button onClick={exportJSON} className="text-[0.8125rem] text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-full px-4 py-2 hover:bg-[#DFEAF2] transition-colors">Export JSON</button>
            {isAdmin && (
              <button onClick={openAdd} className="text-[0.8125rem] text-white bg-[#343C6A] rounded-full px-5 py-2 hover:bg-[#232952] transition-colors font-medium">+ Add Transaction</button>
            )}
          </div>
        </div>

        {/* Viewer notice */}
        {!isAdmin && (
          <div className="flex items-center gap-2 bg-[#EEF0FA] border border-[#DFEAF2] rounded-[0.9375rem] px-4 py-3">
            <span className="text-[0.8125rem] text-[#343C6A]">👁️ <strong>Viewer mode</strong> — you can browse and filter transactions but cannot add, edit, or delete.</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-[1.5625rem] overflow-hidden">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <img src="/assets/icons/search-icon.svg" alt="empty" className="w-10 h-10 opacity-30" />
              <p className="text-[#718EBF] text-[0.9375rem]">No transactions match your filters.</p>
              <button onClick={() => dispatch(resetFilters())} className="text-[0.8125rem] text-[#343C6A] underline">Clear all filters</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[0.8125rem] text-[#343C6A]">
                <thead>
                  <tr className="border-b border-[#DFEAF2]">
                    {cols.map(([key, label]) => (
                      <th key={key} onClick={() => handleSort(key)}
                        className="text-left px-5 py-4 font-semibold text-[#718EBF] cursor-pointer select-none whitespace-nowrap hover:text-[#343C6A] transition-colors">
                        {label}<SortIcon col={key} sortKey={filters.sortKey} sortDir={filters.sortDir} />
                      </th>
                    ))}
                    {isAdmin && <th className="text-left px-5 py-4 font-semibold text-[#718EBF]">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-[#F5F7FA] hover:bg-[#F5F7FA] transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-[#718EBF]">
                        {new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={t.icon || "/assets/icons/cash-icon.svg"} alt="" className="w-8 h-8 flex-shrink-0" />
                          <span className="font-medium">{t.description}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#EEF0FA] text-[#343C6A]">{t.category}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${t.type === "income" ? "bg-[#EDFAF6] text-[#41D4A8]" : "bg-[#FFF0F0] text-[#FF4B4A]"}`}>{t.type}</span>
                      </td>
                      <td className={`px-5 py-4 font-semibold whitespace-nowrap ${t.type === "income" ? "text-[#41D4A8]" : "text-[#FF4B4A]"}`}>
                        {t.type === "income" ? "+ " : "- "}{fmt(t.amount)}
                      </td>
                      {isAdmin && (
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(t)} className="text-xs text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-full px-3 py-1 hover:bg-[#DFEAF2] transition-colors">Edit</button>
                            <button onClick={() => setDeleteConfirm(t.id)} className="text-xs text-[#FF4B4A] bg-[#FFF0F0] border border-[#FFD6D6] rounded-full px-3 py-1 hover:bg-[#FFD6D6] transition-colors">Delete</button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer summary */}
        {transactions.length > 0 && (
          <div className="flex flex-wrap gap-4 text-[0.8125rem] text-[#718EBF]">
            <span>{transactions.length} transaction(s) shown</span>
            <span className="text-[#41D4A8]">Income: {fmt(transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0))}</span>
            <span className="text-[#FF4B4A]">Expenses: {fmt(transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0))}</span>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="bg-white rounded-[1.5625rem] p-8 w-full max-w-md shadow-xl">
            <h2 className="text-[1.25rem] font-semibold text-[#343C6A] mb-6">{editTarget ? "Edit Transaction" : "Add Transaction"}</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[0.875rem] text-[#343C6A]">Date</label>
                <input className={inputCls} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.875rem] text-[#343C6A]">Description</label>
                <input className={inputCls} type="text" placeholder="e.g. Grocery run" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.875rem] text-[#343C6A]">Amount ($)</label>
                <input className={inputCls} type="number" min="0" step="0.01" placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.875rem] text-[#343C6A]">Type</label>
                  <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "income" | "expense" })}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.875rem] text-[#343C6A]">Category</label>
                  <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              {formError && <p className="text-xs text-[#FF4B4A] font-medium">{formError}</p>}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="text-[0.9375rem] text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-[0.9375rem] px-6 py-2.5 hover:bg-[#DFEAF2] transition-colors">Cancel</button>
              <button onClick={handleSave} className="text-[0.9375rem] text-white bg-[#343C6A] rounded-[0.9375rem] px-6 py-2.5 hover:bg-[#232952] transition-colors font-medium">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm - FIXED: calls handleDelete which properly dispatches */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[1.5625rem] p-8 w-full max-w-sm shadow-xl text-center">
            <h2 className="text-[1.125rem] font-semibold text-[#343C6A] mb-3">Delete transaction?</h2>
            <p className="text-[0.875rem] text-[#718EBF] mb-6">This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="text-[0.9375rem] text-[#343C6A] bg-[#F5F7FA] border border-[#DFEAF2] rounded-[0.9375rem] px-6 py-2.5 hover:bg-[#DFEAF2] transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="text-[0.9375rem] text-white bg-[#FF4B4A] rounded-[0.9375rem] px-6 py-2.5 hover:bg-[#e03a39] transition-colors font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TransactionsPage;
