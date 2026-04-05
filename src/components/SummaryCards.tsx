import { useSelector } from "react-redux";
import { selectMonthlyData, selectSummaryStats } from "../store/selectors/transactionSelectors";

const fmt = (n: number) =>
  "$" +
  Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const SummaryCards = () => {
  const { balance, totalIncome, totalExpenses } = useSelector(selectSummaryStats);
  const monthlyData = useSelector(selectMonthlyData);

  const months = Object.keys(monthlyData).sort();
  const latest = months[months.length - 1] || "";
  const prev = months[months.length - 2] || "";

  const lm = monthlyData[latest] || { income: 0, expense: 0 };
  const pm = monthlyData[prev] || { income: 0, expense: 0 };

  const incomeDiff =
    pm.income > 0
      ? Math.round(((lm.income - pm.income) / pm.income) * 100)
      : 0;
  const expenseDiff =
    pm.expense > 0
      ? Math.round(((lm.expense - pm.expense) / pm.expense) * 100)
      : 0;

  const cards = [
    {
      label: "Total Balance",
      value: fmt(balance),
      sub: "All time net balance",
      trend: null,
      accent: "#343C6A",
      bg: "#EEF0FA",
    },
    {
      label: "Total Income",
      value: fmt(totalIncome),
      sub:
        incomeDiff >= 0
          ? `↑ ${incomeDiff}% vs last month`
          : `↓ ${Math.abs(incomeDiff)}% vs last month`,
      trend: incomeDiff >= 0 ? "up" : "down",
      accent: "#41D4A8",
      bg: "#EDFAF6",
    },
    {
      label: "Total Expenses",
      value: fmt(totalExpenses),
      sub:
        expenseDiff >= 0
          ? `↑ ${expenseDiff}% vs last month`
          : `↓ ${Math.abs(expenseDiff)}% vs last month`,
      trend: expenseDiff > 0 ? "down" : "up",
      accent: "#FF4B4A",
      bg: "#FFF0F0",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
      {cards.map(({ label, value, sub, trend, accent, bg }) => (
        <div
          key={label}
          className="rounded-[1.5625rem] p-5 flex flex-col gap-1"
          style={{ backgroundColor: bg }}
        >
          <p
            className="text-[0.8125rem] font-medium"
            style={{ color: "#718EBF" }}
          >
            {label}
          </p>
          <p
            className="text-[1.5rem] font-bold leading-tight"
            style={{ color: accent }}
          >
            {value}
          </p>
          <p
            className={`text-xs font-medium mt-1 ${
              trend === "up"
                ? "text-[#41D4A8]"
                : trend === "down"
                ? "text-[#FF4B4A]"
                : "text-[#718EBF]"
            }`}
          >
            {sub}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
