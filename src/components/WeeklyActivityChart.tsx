import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { selectAllTransactions } from "../store/selectors/transactionSelectors";

const ReactApexChart = lazy(() => import("react-apexcharts"));

const WeeklyActivityChart = () => {
  const allTransactions = useSelector(selectAllTransactions);
  const [chartData, setChartData] = useState({
    categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    deposit: [0, 0, 0, 0, 0, 0, 0],
    withdraw: [0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    // Aggregate last 7 days of transactions by day of week
    const dayDeposit = [0, 0, 0, 0, 0, 0, 0];
    const dayWithdraw = [0, 0, 0, 0, 0, 0, 0];

    // Get most recent 7 days from transaction data
    const sorted = [...allTransactions].sort((a, b) => b.date.localeCompare(a.date));
    const recentDates = [...new Set(sorted.map((t) => t.date))].slice(0, 7);

    recentDates.forEach((date, idx) => {
      const dayTransactions = allTransactions.filter((t) => t.date === date);
      dayTransactions.forEach((t) => {
        if (t.type === "income") dayDeposit[idx] += t.amount;
        else dayWithdraw[idx] += t.amount;
      });
    });

    // Labels: use actual day names from dates
    const categories = recentDates.map((d) =>
      new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" })
    );

    // Pad to 7 if fewer dates
    while (categories.length < 7) categories.push("-");
    while (dayDeposit.length < 7) dayDeposit.push(0);
    while (dayWithdraw.length < 7) dayWithdraw.push(0);

    setChartData({
      categories: categories.slice(0, 7),
      deposit: dayDeposit.slice(0, 7),
      withdraw: dayWithdraw.slice(0, 7),
    });
  }, [allTransactions]);

  const series = [
    { name: "Withdraw", data: chartData.withdraw },
    { name: "Deposit", data: chartData.deposit },
  ];

  const maxVal = Math.max(...chartData.deposit, ...chartData.withdraw, 100);
  const roundedMax = Math.ceil(maxVal / 100) * 100;

  const options: ApexOptions = {
    chart: {
      type: "bar" as const,
      height: 100,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Inter, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "25px",
        borderRadius: 7,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 10, colors: ["transparent"] },
    grid: { show: true, borderColor: "#F3F3F5", position: "back" },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: { colors: "#718EBF", fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: 400 },
      },
    },
    yaxis: {
      max: roundedMax,
      labels: {
        style: { colors: "#718EBF", fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: 400 },
        formatter: (value: number) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString(),
      },
    },
    colors: ["#000000", "#396AFF"],
    legend: {
      show: true,
      position: "top" as const,
      horizontalAlign: "right" as const,
      fontSize: "13px",
      fontFamily: "Inter, sans-serif",
      markers: { shape: "circle", size: 7, strokeWidth: 0 },
    },
    tooltip: {
      y: { formatter: (val: number) => `$${val.toLocaleString()}` },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          plotOptions: { bar: { columnWidth: "10px", borderRadius: 4 } },
          stroke: { width: 3 },
        },
      },
    ],
  };

  return (
    <div>
      <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold mb-4">
        Weekly Activity
      </p>
      <div className="w-full bg-white rounded-[1.5625rem] p-4 sm:p-8">
        <div className="h-[300px]">
          <ReactApexChart options={options} series={series} type="bar" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
