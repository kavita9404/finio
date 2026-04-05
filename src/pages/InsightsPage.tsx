import { lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectCategoryTotals,
  selectMonthlyData,
  selectSummaryStats,
} from "../store/selectors/transactionSelectors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardLayout = lazy(() => import("../components/DashboardLayout"));

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const fmtFull = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface InsightCardProps {
  label: string;
  value: string;
  sub: string;
  accent: string;
  bg: string;
}

const InsightCard = ({ label, value, sub, accent, bg }: InsightCardProps) => (
  <div
    className="rounded-[1.5625rem] p-6 flex flex-col gap-2"
    style={{ backgroundColor: bg }}
  >
    <p className="text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: accent, opacity: 0.7 }}>
      {label}
    </p>
    <p className="text-[1.75rem] font-bold leading-tight" style={{ color: accent }}>
      {value}
    </p>
    <p className="text-[0.8125rem]" style={{ color: accent, opacity: 0.6 }}>
      {sub}
    </p>
  </div>
);

const CHART_COLORS = [
  "#343C6A", "#41D4A8", "#FF4B4A", "#FFB547",
  "#7B5EA7", "#0891B2", "#BE185D", "#3B9A3B",
];

const InsightsPage = () => {
  const { totalIncome, totalExpenses, balance } = useSelector(selectSummaryStats);
  const monthlyData = useSelector(selectMonthlyData);
  const categoryTotals = useSelector(selectCategoryTotals);

  // Sorted months
  const sortedMonths = useMemo(() => Object.keys(monthlyData).sort(), [monthlyData]);
  const last6Months = sortedMonths.slice(-6);

  const latest = sortedMonths[sortedMonths.length - 1] || "";
  const prev = sortedMonths[sortedMonths.length - 2] || "";
  const lm = monthlyData[latest] || { income: 0, expense: 0 };
  const pm = monthlyData[prev] || { income: 0, expense: 0 };

  // Insights values
  const savingsRate = lm.income > 0 ? Math.round(((lm.income - lm.expense) / lm.income) * 100) : 0;
  const momExpDiff = pm.expense > 0 ? Math.round(((lm.expense - pm.expense) / pm.expense) * 100) : 0;
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const allExpenses = Object.values(categoryTotals).reduce((s, v) => s + v, 0);

  // Monthly comparison chart
  const monthLabels = last6Months.map((m) => {
    const d = new Date(m + "-01");
    return d.toLocaleString("default", { month: "short", year: "2-digit" });
  });

  const comparisonChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Income",
        data: last6Months.map((m) => (monthlyData[m]?.income || 0)),
        backgroundColor: "rgba(65, 212, 168, 0.75)",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Expenses",
        data: last6Months.map((m) => (monthlyData[m]?.expense || 0)),
        backgroundColor: "rgba(255, 75, 74, 0.65)",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const comparisonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${fmtFull(ctx.parsed.y)}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: "#718EBF" } },
      y: {
        grid: { color: "rgba(223,234,242,0.8)" },
        ticks: {
          callback: (v: any) => fmt(v),
          font: { size: 11 },
          color: "#718EBF",
        },
      },
    },
  };

  // Category bar chart
  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  const categoryChartData = {
    labels: sortedCategories.map(([cat]) => cat),
    datasets: [
      {
        label: "Spending",
        data: sortedCategories.map(([, amt]) => amt),
        backgroundColor: CHART_COLORS.slice(0, sortedCategories.length),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const categoryChartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${fmtFull(ctx.parsed.x)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(223,234,242,0.8)" },
        ticks: { callback: (v: any) => fmt(v), font: { size: 11 }, color: "#718EBF" },
      },
      y: { grid: { display: false }, ticks: { font: { size: 11 }, color: "#343C6A" } },
    },
  };

  const hasNoData = Object.keys(categoryTotals).length === 0;

  return (
    <Suspense fallback={null}>
      <DashboardLayout>
        <div className="flex flex-col gap-8">

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InsightCard
              label="Highest spending category"
              value={topCategory ? topCategory[0] : "—"}
              sub={topCategory ? `${fmtFull(topCategory[1])} spent (${Math.round((topCategory[1] / allExpenses) * 100)}% of total)` : "No data yet"}
              accent="#343C6A"
              bg="#EEF0FA"
            />
            <InsightCard
              label="Savings rate this month"
              value={`${savingsRate}%`}
              sub={`${fmtFull(Math.max(0, lm.income - lm.expense))} saved of ${fmtFull(lm.income)} earned`}
              accent="#0F6E56"
              bg="#EDFAF6"
            />
            <InsightCard
              label="Expenses vs last month"
              value={`${momExpDiff >= 0 ? "+" : ""}${momExpDiff}%`}
              sub={
                momExpDiff > 0
                  ? `Up ${fmtFull(lm.expense - pm.expense)} — spending increased`
                  : momExpDiff < 0
                  ? `Down ${fmtFull(pm.expense - lm.expense)} — great job!`
                  : "Same as last month"
              }
              accent={momExpDiff > 0 ? "#FF4B4A" : "#41D4A8"}
              bg={momExpDiff > 0 ? "#FFF0F0" : "#EDFAF6"}
            />
          </div>

          {/* All-time summary strip */}
          <div className="bg-white rounded-[1.5625rem] px-6 py-5 grid grid-cols-3 divide-x divide-[#DFEAF2]">
            <div className="pr-6 flex flex-col gap-1">
              <p className="text-[0.75rem] text-[#718EBF] font-medium uppercase tracking-wider">All-time balance</p>
              <p className="text-[1.375rem] font-bold text-[#343C6A]">{fmtFull(balance)}</p>
            </div>
            <div className="px-6 flex flex-col gap-1">
              <p className="text-[0.75rem] text-[#718EBF] font-medium uppercase tracking-wider">Total income</p>
              <p className="text-[1.375rem] font-bold text-[#41D4A8]">{fmtFull(totalIncome)}</p>
            </div>
            <div className="pl-6 flex flex-col gap-1">
              <p className="text-[0.75rem] text-[#718EBF] font-medium uppercase tracking-wider">Total expenses</p>
              <p className="text-[1.375rem] font-bold text-[#FF4B4A]">{fmtFull(totalExpenses)}</p>
            </div>
          </div>

          {hasNoData ? (
            <div className="bg-white rounded-[1.5625rem] flex flex-col items-center justify-center py-20 gap-3">
              <p className="text-[#718EBF] text-[0.9375rem]">No transaction data to display insights.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[60%_38%] justify-between gap-6">

              {/* Monthly comparison */}
              <div className="bg-white rounded-[1.5625rem] p-6">
                <p className="text-base font-semibold text-[#343C6A] mb-1">Monthly income vs expenses</p>
                <p className="text-[0.8125rem] text-[#718EBF] mb-5">Last 6 months comparison</p>
                {/* Legend */}
                <div className="flex gap-5 mb-4 text-[0.75rem] text-[#718EBF]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "rgba(65,212,168,0.75)" }} />
                    Income
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "rgba(255,75,74,0.65)" }} />
                    Expenses
                  </span>
                </div>
                <div style={{ height: "260px", position: "relative" }}>
                  <Bar data={comparisonChartData} options={comparisonChartOptions} />
                </div>
              </div>

              {/* Category breakdown */}
              <div className="bg-white rounded-[1.5625rem] p-6">
                <p className="text-base font-semibold text-[#343C6A] mb-1">Spending by category</p>
                <p className="text-[0.8125rem] text-[#718EBF] mb-5">All-time totals</p>
                <div style={{ height: Math.max(260, sortedCategories.length * 38) + "px", position: "relative" }}>
                  <Bar data={categoryChartData} options={categoryChartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* Category table */}
          {!hasNoData && (
            <div className="bg-white rounded-[1.5625rem] p-6">
              <p className="text-base font-semibold text-[#343C6A] mb-5">Category details</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.8125rem]">
                  <thead>
                    <tr className="border-b border-[#DFEAF2]">
                      <th className="text-left px-4 py-3 text-[#718EBF] font-semibold">Category</th>
                      <th className="text-right px-4 py-3 text-[#718EBF] font-semibold">Total spent</th>
                      <th className="text-right px-4 py-3 text-[#718EBF] font-semibold">% of expenses</th>
                      <th className="px-4 py-3 text-[#718EBF] font-semibold">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCategories.map(([cat, amt], i) => {
                      const pct = allExpenses > 0 ? (amt / allExpenses) * 100 : 0;
                      return (
                        <tr key={cat} className="border-b border-[#F5F7FA] hover:bg-[#F5F7FA] transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-sm flex-shrink-0"
                                style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                              />
                              <span className="font-medium text-[#343C6A]">{cat}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-[#FF4B4A]">
                            {fmtFull(amt)}
                          </td>
                          <td className="px-4 py-3 text-right text-[#718EBF]">
                            {pct.toFixed(1)}%
                          </td>
                          <td className="px-4 py-3">
                            <div className="w-full bg-[#F5F7FA] rounded-full h-2 overflow-hidden">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${pct}%`,
                                  background: CHART_COLORS[i % CHART_COLORS.length],
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </Suspense>
  );
};

export default InsightsPage;
