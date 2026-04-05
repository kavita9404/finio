import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Tooltip, Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const portfolio = [
  { id: 1, name: "Apple Inc.", ticker: "AAPL", shares: 12, price: 189.30, change: +2.4, value: 2271.60, color: "#343C6A" },
  { id: 2, name: "Tesla Inc.", ticker: "TSLA", shares: 5, price: 248.50, change: -1.2, value: 1242.50, color: "#FF4B4A" },
  { id: 3, name: "Microsoft", ticker: "MSFT", shares: 8, price: 415.20, change: +0.8, value: 3321.60, color: "#41D4A8" },
  { id: 4, name: "S&P 500 ETF", ticker: "SPY", shares: 10, price: 520.10, change: +0.3, value: 5201.00, color: "#FFB547" },
  { id: 5, name: "Bitcoin ETF", ticker: "IBIT", shares: 20, price: 38.75, change: +5.1, value: 775.00, color: "#7B5EA7" },
];

const trendLabels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const trendData = [10200, 11400, 10800, 12300, 13100, 12811.70];

const InvestmentsPage = () => {
  const [tab, setTab] = useState<"portfolio" | "performance">("portfolio");
  const totalValue = portfolio.reduce((s, p) => s + p.value, 0);
  const totalGain = 12811.70 - 10200;
  const gainPct = ((totalGain / 10200) * 100).toFixed(1);

  const chartData = {
    labels: trendLabels,
    datasets: [{
      label: "Portfolio Value",
      data: trendData,
      borderColor: "#343C6A",
      backgroundColor: "rgba(52,60,106,0.08)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#343C6A",
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#718EBF", font: { size: 11 } } },
      y: { grid: { color: "rgba(223,234,242,0.8)" }, ticks: { callback: (v: any) => "$" + (v / 1000).toFixed(0) + "k", color: "#718EBF", font: { size: 11 } } },
    },
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Portfolio Value", value: "$" + totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 }), sub: "5 holdings", bg: "#EEF0FA", accent: "#343C6A" },
            { label: "Total Gain", value: "+$" + totalGain.toLocaleString("en-US", { minimumFractionDigits: 2 }), sub: "+" + gainPct + "% all time", bg: "#EDFAF6", accent: "#41D4A8" },
            { label: "Today's Change", value: "+$184.20", sub: "+1.46% today", bg: "#EDFAF6", accent: "#41D4A8" },
          ].map(({ label, value, sub, bg, accent }) => (
            <div key={label} className="rounded-[1.5625rem] p-5" style={{ backgroundColor: bg }}>
              <p className="text-xs font-medium text-[#718EBF] mb-1">{label}</p>
              <p className="text-2xl font-bold" style={{ color: accent }}>{value}</p>
              <p className="text-xs mt-1" style={{ color: accent, opacity: 0.7 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-[1.5625rem] p-6">
          <div className="flex gap-6 border-b border-[#DFEAF2] mb-6">
            {(["portfolio", "performance"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative pb-3 text-sm font-medium capitalize transition-colors ${tab === t ? "text-[#343C6A]" : "text-[#718EBF]"}`}>
                {t}
                {tab === t && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#343C6A] rounded-t" />}
              </button>
            ))}
          </div>

          {tab === "portfolio" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#DFEAF2]">
                    {["Asset", "Ticker", "Shares", "Price", "Change", "Value", "Weight"].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-[#718EBF]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((p) => (
                    <tr key={p.id} className="border-b border-[#F5F7FA] hover:bg-[#F5F7FA] transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                          <span className="font-medium text-[#343C6A]">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4"><span className="text-xs bg-[#EEF0FA] text-[#343C6A] px-2 py-1 rounded-full font-mono">{p.ticker}</span></td>
                      <td className="py-4 px-4 text-[#718EBF]">{p.shares}</td>
                      <td className="py-4 px-4 text-[#343C6A] font-medium">${p.price.toFixed(2)}</td>
                      <td className={`py-4 px-4 font-medium ${p.change > 0 ? "text-[#41D4A8]" : "text-[#FF4B4A]"}`}>{p.change > 0 ? "+" : ""}{p.change}%</td>
                      <td className="py-4 px-4 font-bold text-[#343C6A]">${p.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#F5F7FA] rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${(p.value / totalValue * 100).toFixed(0)}%`, background: p.color }} />
                          </div>
                          <span className="text-xs text-[#718EBF]">{(p.value / totalValue * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p className="text-sm text-[#718EBF] mb-4">Portfolio value over the last 6 months</p>
              <div style={{ height: "280px", position: "relative" }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>

        {/* Allocation */}
        <div className="bg-white rounded-[1.5625rem] p-6">
          <p className="text-base font-semibold text-[#343C6A] mb-5">Allocation Breakdown</p>
          <div className="flex flex-col gap-3">
            {portfolio.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs text-[#718EBF] w-28 flex-shrink-0">{p.name}</span>
                <div className="flex-1 h-2 bg-[#F5F7FA] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(p.value / totalValue * 100).toFixed(0)}%`, background: p.color }} />
                </div>
                <span className="text-xs font-medium text-[#343C6A] w-10 text-right">{(p.value / totalValue * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestmentsPage;
