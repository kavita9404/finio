import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";

const accounts = [
  { id: 1, name: "Main Checking", bank: "Chase Bank", number: "**** **** **** 4832", balance: 12450.75, type: "Checking", color: "#343C6A", icon: "/assets/icons/card-icon.svg" },
  { id: 2, name: "Savings Account", bank: "Bank of America", number: "**** **** **** 9210", balance: 8920.50, type: "Savings", color: "#41D4A8", icon: "/assets/icons/cash-icon.svg" },
  { id: 3, name: "Business Account", bank: "Wells Fargo", number: "**** **** **** 3371", balance: 3210.00, type: "Checking", color: "#FF4B4A", icon: "/assets/icons/paypal-icon.svg" },
];

const recentActivity = [
  { id: 1, desc: "Amazon Purchase", date: "28 Jan 2025", amount: -120.00, account: "Main Checking" },
  { id: 2, desc: "Salary Credit", date: "25 Jan 2025", amount: 4800.00, account: "Main Checking" },
  { id: 3, desc: "Transfer to Savings", date: "22 Jan 2025", amount: -500.00, account: "Savings Account" },
  { id: 4, desc: "Interest Earned", date: "20 Jan 2025", amount: 12.40, account: "Savings Account" },
  { id: 5, desc: "Utility Bill", date: "18 Jan 2025", amount: -145.00, account: "Business Account" },
];

const AccountsPage = () => {
  const [selected, setSelected] = useState(accounts[0]);
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* Total Balance Banner */}
        <div className="bg-gradient-to-r from-[#343C6A] to-[#5B5A6F] rounded-[1.5625rem] p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm opacity-70 mb-1">Total Balance Across All Accounts</p>
            <p className="text-3xl font-bold">${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="flex gap-6 text-sm">
            <div><p className="opacity-60 text-xs mb-1">Accounts</p><p className="font-semibold">{accounts.length}</p></div>
            <div><p className="opacity-60 text-xs mb-1">Checking</p><p className="font-semibold">{accounts.filter(a => a.type === "Checking").length}</p></div>
            <div><p className="opacity-60 text-xs mb-1">Savings</p><p className="font-semibold">{accounts.filter(a => a.type === "Savings").length}</p></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_38%] gap-8">

          {/* Account Cards */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">My Accounts</p>
            <div className="flex flex-col gap-4">
              {accounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setSelected(acc)}
                  className={`w-full text-left bg-white rounded-[1.5625rem] p-5 border-2 transition-all ${selected.id === acc.id ? "border-[#343C6A]" : "border-transparent"} hover:border-[#343C6A]`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: acc.color + "20" }}>
                        <img src={acc.icon} alt="" className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#343C6A]">{acc.name}</p>
                        <p className="text-sm text-[#718EBF]">{acc.bank} · {acc.type}</p>
                        <p className="text-xs text-[#718EBF] mt-0.5">{acc.number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#718EBF] mb-1">Balance</p>
                      <p className="text-lg font-bold text-[#343C6A]">${acc.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Account Detail Panel */}
          <div>
            <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Account Details</p>
            <div className="bg-white rounded-[1.5625rem] p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#DFEAF2]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: selected.color + "20" }}>
                  <img src={selected.icon} alt="" className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-[#343C6A]">{selected.name}</p>
                  <p className="text-sm text-[#718EBF]">{selected.bank}</p>
                </div>
              </div>
              {[
                ["Account Type", selected.type],
                ["Account Number", selected.number],
                ["Available Balance", "$" + selected.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })],
                ["Currency", "USD — US Dollar"],
                ["Status", "Active"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <p className="text-sm text-[#718EBF]">{label}</p>
                  <p className={`text-sm font-medium ${label === "Status" ? "text-[#41D4A8]" : label === "Available Balance" ? "text-[#343C6A] font-bold" : "text-[#343C6A]"}`}>{value}</p>
                </div>
              ))}
              <button className="w-full mt-2 bg-[#343C6A] text-white rounded-[0.9375rem] py-3 text-sm font-medium hover:bg-[#232952] transition-colors">
                Manage Account
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <p className="text-[1.375rem] font-semibold text-[#343C6A] mb-4">Recent Activity</p>
          <div className="bg-white rounded-[1.5625rem] overflow-hidden">
            {recentActivity.map((item, i) => (
              <div key={item.id} className={`flex justify-between items-center px-6 py-4 ${i < recentActivity.length - 1 ? "border-b border-[#F5F7FA]" : ""} hover:bg-[#F5F7FA] transition-colors`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.amount > 0 ? "bg-[#EDFAF6]" : "bg-[#FFF0F0]"}`}>
                    <span className={`text-lg font-bold ${item.amount > 0 ? "text-[#41D4A8]" : "text-[#FF4B4A]"}`}>{item.amount > 0 ? "+" : "−"}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#343C6A]">{item.desc}</p>
                    <p className="text-xs text-[#718EBF]">{item.date} · {item.account}</p>
                  </div>
                </div>
                <p className={`font-semibold text-sm ${item.amount > 0 ? "text-[#41D4A8]" : "text-[#FF4B4A]"}`}>
                  {item.amount > 0 ? "+" : "−"}${Math.abs(item.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountsPage;
