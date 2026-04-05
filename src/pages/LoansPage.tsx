import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";

const loans = [
  { id: 1, name: "Home Mortgage", lender: "Chase Bank", principal: 320000, remaining: 287450, monthly: 1820, rate: 3.75, term: 360, paid: 48, dueDate: "Feb 1, 2025", status: "Active", color: "#343C6A" },
  { id: 2, name: "Car Loan", lender: "Toyota Financial", principal: 28000, remaining: 14200, monthly: 485, rate: 4.9, term: 60, paid: 30, dueDate: "Feb 5, 2025", status: "Active", color: "#41D4A8" },
  { id: 3, name: "Personal Loan", lender: "SoFi", principal: 10000, remaining: 3100, monthly: 210, rate: 7.2, term: 48, paid: 34, dueDate: "Feb 10, 2025", status: "Active", color: "#FFB547" },
];

const paymentHistory = [
  { month: "Jan 2025", home: 1820, car: 485, personal: 210, status: "Paid" },
  { month: "Dec 2024", home: 1820, car: 485, personal: 210, status: "Paid" },
  { month: "Nov 2024", home: 1820, car: 485, personal: 210, status: "Paid" },
  { month: "Oct 2024", home: 1820, car: 485, personal: 210, status: "Paid" },
];

const LoansPage = () => {
  const [selected, setSelected] = useState(loans[0]);
  const pctPaid = (((selected.principal - selected.remaining) / selected.principal) * 100).toFixed(0);
  const totalMonthly = loans.reduce((s, l) => s + l.monthly, 0);
  const totalRemaining = loans.reduce((s, l) => s + l.remaining, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Outstanding", value: "$" + totalRemaining.toLocaleString(), sub: "Across " + loans.length + " loans", bg: "#FFF0F0", accent: "#FF4B4A" },
            { label: "Monthly Payments", value: "$" + totalMonthly.toLocaleString(), sub: "Due this month", bg: "#EEF0FA", accent: "#343C6A" },
            { label: "Active Loans", value: String(loans.length), sub: "All in good standing", bg: "#EDFAF6", accent: "#41D4A8" },
          ].map(({ label, value, sub, bg, accent }) => (
            <div key={label} className="rounded-[1.5625rem] p-5" style={{ backgroundColor: bg }}>
              <p className="text-xs font-medium text-[#718EBF] mb-1">{label}</p>
              <p className="text-2xl font-bold" style={{ color: accent }}>{value}</p>
              <p className="text-xs mt-1" style={{ color: accent, opacity: 0.7 }}>{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_43%] gap-8">

          {/* Loan list */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">My Loans</p>
            <div className="flex flex-col gap-4">
              {loans.map((loan) => {
                const pct = ((loan.principal - loan.remaining) / loan.principal) * 100;
                return (
                  <button key={loan.id} onClick={() => setSelected(loan)}
                    className={`w-full text-left bg-white rounded-[1.5625rem] p-5 border-2 transition-all ${selected.id === loan.id ? "border-[#343C6A]" : "border-transparent"} hover:border-[#343C6A]`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-[#343C6A]">{loan.name}</p>
                        <p className="text-xs text-[#718EBF]">{loan.lender} · {loan.rate}% APR</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#718EBF]">Remaining</p>
                        <p className="font-bold text-[#FF4B4A]">${loan.remaining.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#F5F7FA] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: pct.toFixed(0) + "%", background: loan.color }} />
                      </div>
                      <span className="text-xs text-[#718EBF] flex-shrink-0">{pct.toFixed(0)}% paid</span>
                    </div>
                    <p className="text-xs text-[#718EBF] mt-2">${loan.monthly}/mo · Due {loan.dueDate}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loan detail */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Loan Details</p>
            <div className="bg-white rounded-[1.5625rem] p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#DFEAF2]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: selected.color + "20" }}>
                  <span className="text-lg">🏦</span>
                </div>
                <div>
                  <p className="font-semibold text-[#343C6A]">{selected.name}</p>
                  <p className="text-xs text-[#718EBF]">{selected.lender}</p>
                </div>
              </div>
              {[
                ["Original Amount", "$" + selected.principal.toLocaleString()],
                ["Remaining Balance", "$" + selected.remaining.toLocaleString()],
                ["Interest Rate", selected.rate + "% APR"],
                ["Monthly Payment", "$" + selected.monthly],
                ["Term", selected.term + " months"],
                ["Payments Made", selected.paid + " of " + selected.term],
                ["Next Due", selected.dueDate],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <p className="text-sm text-[#718EBF]">{label}</p>
                  <p className="text-sm font-medium text-[#343C6A]">{value}</p>
                </div>
              ))}
              {/* Payoff progress */}
              <div className="pt-2 border-t border-[#DFEAF2]">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-[#718EBF]">Payoff Progress</span>
                  <span className="text-xs font-semibold text-[#343C6A]">{pctPaid}%</span>
                </div>
                <div className="w-full h-3 bg-[#F5F7FA] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: pctPaid + "%", background: selected.color }} />
                </div>
              </div>
              <button className="w-full bg-[#343C6A] text-white rounded-[0.9375rem] py-3 text-sm font-medium hover:bg-[#232952] transition-colors mt-1">
                Make a Payment
              </button>
            </div>
          </div>
        </div>

        {/* Payment history */}
        <div>
          <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Payment History</p>
          <div className="bg-white rounded-[1.5625rem] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DFEAF2]">
                  {["Month", "Home Mortgage", "Car Loan", "Personal Loan", "Total", "Status"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-[#718EBF]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((row, i) => (
                  <tr key={i} className="border-b border-[#F5F7FA] hover:bg-[#F5F7FA] transition-colors">
                    <td className="px-5 py-4 text-[#343C6A] font-medium">{row.month}</td>
                    <td className="px-5 py-4 text-[#718EBF]">${row.home}</td>
                    <td className="px-5 py-4 text-[#718EBF]">${row.car}</td>
                    <td className="px-5 py-4 text-[#718EBF]">${row.personal}</td>
                    <td className="px-5 py-4 font-semibold text-[#343C6A]">${row.home + row.car + row.personal}</td>
                    <td className="px-5 py-4"><span className="text-xs bg-[#EDFAF6] text-[#41D4A8] px-3 py-1 rounded-full font-medium">{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LoansPage;
