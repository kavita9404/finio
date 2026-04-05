import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";

const tiers = [
  { id: "silver", label: "Silver", minBalance: 0, color: "#718EBF", bg: "#F5F7FA", perks: ["Free ATM withdrawals (3/mo)", "Standard customer support", "Basic cashback (0.5%)", "Mobile banking app"] },
  { id: "gold", label: "Gold", minBalance: 10000, color: "#FFB547", bg: "#FFF9EE", perks: ["Free ATM withdrawals (10/mo)", "Priority customer support", "Enhanced cashback (1.5%)", "Free wire transfers (2/mo)", "Travel accident insurance", "Airport lounge access (2/mo)"] },
  { id: "platinum", label: "Platinum", minBalance: 50000, color: "#7B5EA7", bg: "#F3EEFF", perks: ["Unlimited ATM withdrawals", "Dedicated relationship manager", "Premium cashback (3%)", "Unlimited wire transfers", "Comprehensive travel insurance", "Unlimited airport lounge access", "Concierge service 24/7", "Exclusive investment opportunities"] },
];

const currentBalance = 12450;
const currentTier = currentBalance >= 50000 ? "platinum" : currentBalance >= 10000 ? "gold" : "silver";

const rewardsHistory = [
  { desc: "Cashback on grocery spend", date: "Jan 28, 2025", points: 145, type: "earn" },
  { desc: "Cashback on travel booking", date: "Jan 22, 2025", points: 320, type: "earn" },
  { desc: "Redeemed for statement credit", date: "Jan 15, 2025", points: -500, type: "redeem" },
  { desc: "Cashback on dining", date: "Jan 10, 2025", points: 89, type: "earn" },
  { desc: "Bonus for on-time payment", date: "Jan 1, 2025", points: 200, type: "earn" },
];

const totalPoints = rewardsHistory.reduce((s, r) => s + r.points, 0);

const PrivilegesPage = () => {
  const [activeTier, setActiveTier] = useState(currentTier);
  const tier = tiers.find(t => t.id === activeTier)!;
  const nextTier = tiers[tiers.findIndex(t => t.id === currentTier) + 1];
  const progressToNext = nextTier ? Math.min((currentBalance / nextTier.minBalance) * 100, 100) : 100;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* Current status */}
        <div className="bg-gradient-to-r from-[#343C6A] to-[#5B5A6F] rounded-[1.5625rem] p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="text-sm opacity-60 mb-1">Your Current Tier</p>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold capitalize">{currentTier}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/20 capitalize">{currentTier} Member</span>
              </div>
              <p className="text-sm opacity-70">Member since January 2023</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-60 mb-1">Reward Points</p>
              <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
              <p className="text-sm opacity-70">≈ ${(totalPoints * 0.01).toFixed(2)} value</p>
            </div>
          </div>
          {nextTier && (
            <div className="mt-5 pt-5 border-t border-white/20">
              <div className="flex justify-between text-sm mb-2">
                <span className="opacity-70">Progress to {nextTier.label}</span>
                <span className="font-medium">${currentBalance.toLocaleString()} / ${nextTier.minBalance.toLocaleString()}</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: progressToNext + "%" }} />
              </div>
              <p className="text-xs opacity-60 mt-1.5">Maintain ${(nextTier.minBalance - currentBalance).toLocaleString()} more to unlock {nextTier.label}</p>
            </div>
          )}
        </div>

        {/* Tier cards */}
        <div>
          <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Membership Tiers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                className={`text-left rounded-[1.5625rem] p-5 border-2 transition-all ${activeTier === t.id ? "border-[#343C6A]" : "border-transparent"}`}
                style={{ backgroundColor: t.bg }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-lg" style={{ color: t.color }}>{t.label}</p>
                    <p className="text-xs text-[#718EBF]">{t.minBalance === 0 ? "All members" : "$" + t.minBalance.toLocaleString() + "+ balance"}</p>
                  </div>
                  {currentTier === t.id && (
                    <span className="text-xs bg-[#343C6A] text-white px-2 py-0.5 rounded-full">Current</span>
                  )}
                </div>
                <ul className="flex flex-col gap-1.5">
                  {t.perks.slice(0, 4).map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-[#343C6A]">
                      <span style={{ color: t.color }} className="flex-shrink-0 mt-0.5">✓</span>
                      {p}
                    </li>
                  ))}
                  {t.perks.length > 4 && <li className="text-xs text-[#718EBF]">+{t.perks.length - 4} more benefits</li>}
                </ul>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_43%] gap-8">
          {/* Selected tier full perks */}
          <div className="bg-white rounded-[1.5625rem] p-6">
            <p className="text-base font-semibold text-[#343C6A] mb-4 capitalize">{tier.label} — Full Benefits</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tier.perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 bg-[#F5F7FA] rounded-[0.9375rem] px-4 py-3">
                  <span style={{ color: tier.color }} className="text-sm font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-[#343C6A]">{perk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards history */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Rewards History</p>
            <div className="bg-white rounded-[1.5625rem] overflow-hidden">
              {rewardsHistory.map((r, i) => (
                <div key={i} className={`flex justify-between items-center px-5 py-4 ${i < rewardsHistory.length - 1 ? "border-b border-[#F5F7FA]" : ""} hover:bg-[#F5F7FA] transition-colors`}>
                  <div>
                    <p className="text-sm font-medium text-[#343C6A]">{r.desc}</p>
                    <p className="text-xs text-[#718EBF]">{r.date}</p>
                  </div>
                  <p className={`font-semibold text-sm ${r.type === "earn" ? "text-[#41D4A8]" : "text-[#FF4B4A]"}`}>
                    {r.type === "earn" ? "+" : ""}{r.points} pts
                  </p>
                </div>
              ))}
              <div className="px-5 py-4 border-t border-[#DFEAF2] flex justify-between items-center">
                <span className="text-sm text-[#718EBF]">Total Balance</span>
                <span className="font-bold text-[#343C6A]">{totalPoints.toLocaleString()} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrivilegesPage;
