import { lazy } from "react";

const BalanceHistoryChart = lazy(() => import("../components/BalanceHistoryChart"));
const CardDetails = lazy(() => import("../components/CardDetails"));
const DashboardLayout = lazy(() => import("../components/DashboardLayout"));
const ExpenseStatistics = lazy(() => import("../components/ExpenseStatistics"));
const QuickTransfer = lazy(() => import("../components/QuickTransfer"));
const RecentTransactions = lazy(() => import("../components/RecentTransactions"));
const WeeklyActivityChart = lazy(() => import("../components/WeeklyActivityChart"));
const SummaryCards = lazy(() => import("../components/SummaryCards"));

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* ── Summary Cards: Total Balance, Income, Expenses from real transactions ── */}
        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-[65%_30%] justify-between gap-8 lg:gap-0 w-full">
          <CardDetails />
          {/* ── Recent Transactions: live from Redux store ── */}
          <RecentTransactions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[65%_30%] justify-between gap-8 lg:gap-0 w-full">
          {/* ── Weekly Activity: deposit/withdraw from real transactions ── */}
          <WeeklyActivityChart />
          {/* ── Expense Statistics pie: top 4 categories from real transactions ── */}
          <ExpenseStatistics />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_55%] justify-between gap-8 lg:gap-0 w-full">
          <QuickTransfer />
          {/* ── Balance History: cumulative running balance from real transactions ── */}
          <BalanceHistoryChart />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
