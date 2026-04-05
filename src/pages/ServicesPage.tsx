import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";

const services = [
  { id: 1, name: "Money Transfer", desc: "Send money instantly to any account or contact worldwide", icon: "💸", color: "#343C6A", bg: "#EEF0FA", action: "Transfer Now" },
  { id: 2, name: "Bill Payment", desc: "Pay utility bills, subscriptions, and more in one place", icon: "🧾", color: "#41D4A8", bg: "#EDFAF6", action: "Pay Bills" },
  { id: 3, name: "Mobile Recharge", desc: "Top up any mobile number quickly and securely", icon: "📱", color: "#FFB547", bg: "#FFF9EE", action: "Recharge" },
  { id: 4, name: "Forex Exchange", desc: "Exchange currencies at competitive real-time rates", icon: "💱", color: "#7B5EA7", bg: "#F3EEFF", action: "Exchange" },
  { id: 5, name: "Travel Insurance", desc: "Get covered for your next trip with flexible plans", icon: "✈️", color: "#FF4B4A", bg: "#FFF0F0", action: "Get Covered" },
  { id: 6, name: "Tax Filing", desc: "Simple, guided tax filing with auto-import of your data", icon: "📊", color: "#0891B2", bg: "#E0F7FB", action: "File Taxes" },
  { id: 7, name: "Savings Plans", desc: "Set up automated savings goals with competitive rates", icon: "🏦", color: "#3B9A3B", bg: "#EDFAF6", action: "Start Saving" },
  { id: 8, name: "Virtual Card", desc: "Generate disposable cards for secure online shopping", icon: "💳", color: "#BE185D", bg: "#FEE9F1", action: "Create Card" },
];

const recentTransfers = [
  { id: 1, to: "Sarah Johnson", amount: 250, date: "Jan 28, 2025", status: "Completed", avatar: "SJ" },
  { id: 2, to: "Mike Chen", amount: 80, date: "Jan 22, 2025", status: "Completed", avatar: "MC" },
  { id: 3, to: "Emma Wilson", amount: 500, date: "Jan 15, 2025", status: "Completed", avatar: "EW" },
];

const scheduledBills = [
  { name: "Electricity", amount: 145, due: "Feb 5, 2025", icon: "⚡" },
  { name: "Internet", amount: 59.99, due: "Feb 8, 2025", icon: "🌐" },
  { name: "Netflix", amount: 15.49, due: "Feb 12, 2025", icon: "🎬" },
];

const ServicesPage = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* Services Grid */}
        <div>
          <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Available Services</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(activeService === s.id ? null : s.id)}
                className={`text-left rounded-[1.5625rem] p-5 transition-all border-2 ${activeService === s.id ? "border-[#343C6A]" : "border-transparent"} hover:shadow-md`}
                style={{ backgroundColor: s.bg }}
              >
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <p className="font-semibold text-[#343C6A] mb-1 text-sm">{s.name}</p>
                <p className="text-xs text-[#718EBF] leading-relaxed">{s.desc}</p>
                <span className="mt-3 inline-flex text-xs font-semibold px-3 py-1 rounded-full" style={{ background: s.color + "20", color: s.color }}>
                  {s.action} →
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_43%] gap-8">

          {/* Recent transfers */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Recent Transfers</p>
            <div className="bg-white rounded-[1.5625rem] overflow-hidden">
              {recentTransfers.map((t, i) => (
                <div key={t.id} className={`flex justify-between items-center px-6 py-4 ${i < recentTransfers.length - 1 ? "border-b border-[#F5F7FA]" : ""} hover:bg-[#F5F7FA] transition-colors`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#EEF0FA] flex items-center justify-center text-xs font-bold text-[#343C6A]">{t.avatar}</div>
                    <div>
                      <p className="text-sm font-medium text-[#343C6A]">{t.to}</p>
                      <p className="text-xs text-[#718EBF]">{t.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#FF4B4A]">-${t.amount}</p>
                    <span className="text-xs text-[#41D4A8]">{t.status}</span>
                  </div>
                </div>
              ))}
              <div className="px-6 py-4 border-t border-[#DFEAF2]">
                <button className="w-full bg-[#343C6A] text-white rounded-[0.9375rem] py-2.5 text-sm font-medium hover:bg-[#232952] transition-colors">
                  New Transfer
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming bills */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Upcoming Bills</p>
            <div className="bg-white rounded-[1.5625rem] overflow-hidden">
              {scheduledBills.map((bill, i) => (
                <div key={bill.name} className={`flex justify-between items-center px-6 py-4 ${i < scheduledBills.length - 1 ? "border-b border-[#F5F7FA]" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center text-lg">{bill.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-[#343C6A]">{bill.name}</p>
                      <p className="text-xs text-[#718EBF]">Due {bill.due}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#343C6A]">${bill.amount}</p>
                    <button className="text-xs text-[#343C6A] underline mt-0.5">Pay now</button>
                  </div>
                </div>
              ))}
              <div className="px-6 py-4 border-t border-[#DFEAF2]">
                <p className="text-xs text-[#718EBF]">Total due this week: <span className="font-semibold text-[#343C6A]">${scheduledBills.reduce((s, b) => s + b.amount, 0).toFixed(2)}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
