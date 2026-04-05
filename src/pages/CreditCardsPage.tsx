import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import Card from "../components/Card";

const cards = [
  { id: 1, cardHolder: "Eddy Cusuma", cardNumber: "3778 **** **** 1234", balance: "5,756", expiryDate: "12/26", variant: "dark" as const, limit: 10000, spent: 5756, dueDate: "Feb 15, 2025", minPayment: 115 },
  { id: 2, cardHolder: "Eddy Cusuma", cardNumber: "6204 **** **** 9871", balance: "2,120", expiryDate: "08/27", variant: "light" as const, limit: 5000, spent: 2120, dueDate: "Feb 20, 2025", minPayment: 42 },
];

const transactions = [
  { id: 1, desc: "Spotify Premium", date: "28 Jan 2025", amount: 9.99, card: "3778 ****", category: "Entertainment" },
  { id: 2, desc: "Amazon Prime", date: "26 Jan 2025", amount: 14.99, card: "3778 ****", category: "Shopping" },
  { id: 3, desc: "Delta Airlines", date: "22 Jan 2025", amount: 320.00, card: "6204 ****", category: "Travel" },
  { id: 4, desc: "Starbucks", date: "20 Jan 2025", amount: 6.50, card: "3778 ****", category: "Food" },
  { id: 5, desc: "Netflix", date: "18 Jan 2025", amount: 15.49, card: "6204 ****", category: "Entertainment" },
  { id: 6, desc: "Whole Foods", date: "15 Jan 2025", amount: 87.30, card: "3778 ****", category: "Food" },
];

const CreditCardsPage = () => {
  const [selected, setSelected] = useState(cards[0]);
  const utilization = ((selected.spent / selected.limit) * 100).toFixed(0);
  const utilizationNum = (selected.spent / selected.limit) * 100;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* Cards row */}
        <div>
          <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">My Cards</p>
          <div className="flex flex-wrap gap-6">
            {cards.map((c) => (
              <button key={c.id} onClick={() => setSelected(c)} className={`rounded-[1.5625rem] border-2 transition-all ${selected.id === c.id ? "border-[#343C6A]" : "border-transparent"}`}>
                <Card cardHolder={c.cardHolder} cardNumber={c.cardNumber} balance={c.balance} expiryDate={c.expiryDate} variant={c.variant} />
              </button>
            ))}
            <button className="w-[16.5625rem] md:w-[14rem] h-auto min-h-[10rem] rounded-[1.5625rem] border-2 border-dashed border-[#DFEAF2] flex flex-col items-center justify-center gap-2 text-[#718EBF] hover:border-[#343C6A] hover:text-[#343C6A] transition-all">
              <span className="text-3xl font-light">+</span>
              <span className="text-sm font-medium">Add New Card</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_43%] gap-8">

          {/* Card stats */}
          <div className="flex flex-col gap-4">
            <p className="text-[1.375rem] font-semibold text-[#343C6A]">Card Summary</p>
            <div className="bg-white rounded-[1.5625rem] p-6 flex flex-col gap-5">
              <div className="flex justify-between">
                <span className="text-sm text-[#718EBF]">Credit Limit</span>
                <span className="font-semibold text-[#343C6A]">${selected.limit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#718EBF]">Amount Spent</span>
                <span className="font-semibold text-[#FF4B4A]">${selected.spent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#718EBF]">Available Credit</span>
                <span className="font-semibold text-[#41D4A8]">${(selected.limit - selected.spent).toLocaleString()}</span>
              </div>

              {/* Utilization bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-[#718EBF]">Credit Utilization</span>
                  <span className={`text-xs font-semibold ${utilizationNum > 70 ? "text-[#FF4B4A]" : utilizationNum > 30 ? "text-[#FFB547]" : "text-[#41D4A8]"}`}>{utilization}%</span>
                </div>
                <div className="w-full h-3 bg-[#F5F7FA] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: utilization + "%", background: utilizationNum > 70 ? "#FF4B4A" : utilizationNum > 30 ? "#FFB547" : "#41D4A8" }} />
                </div>
                <p className="text-xs text-[#718EBF] mt-1">{utilizationNum <= 30 ? "Excellent — keep it below 30%" : utilizationNum <= 70 ? "Good — aim for under 30%" : "High — consider paying down balance"}</p>
              </div>

              <div className="border-t border-[#DFEAF2] pt-4 flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#718EBF]">Payment Due Date</span>
                  <span className="font-medium text-[#343C6A]">{selected.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#718EBF]">Minimum Payment</span>
                  <span className="font-medium text-[#343C6A]">${selected.minPayment}</span>
                </div>
              </div>

              <button className="w-full bg-[#343C6A] text-white rounded-[0.9375rem] py-3 text-sm font-medium hover:bg-[#232952] transition-colors">
                Make a Payment
              </button>
            </div>
          </div>

          {/* Recent transactions */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Recent Charges</p>
            <div className="bg-white rounded-[1.5625rem] overflow-hidden">
              {transactions.map((t, i) => (
                <div key={t.id} className={`flex justify-between items-center px-5 py-4 ${i < transactions.length - 1 ? "border-b border-[#F5F7FA]" : ""} hover:bg-[#F5F7FA] transition-colors`}>
                  <div>
                    <p className="text-sm font-medium text-[#343C6A]">{t.desc}</p>
                    <p className="text-xs text-[#718EBF]">{t.date} · {t.card}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#FF4B4A]">-${t.amount.toFixed(2)}</p>
                    <p className="text-xs text-[#718EBF]">{t.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditCardsPage;
