import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectMonthlyData } from "../store/selectors/transactionSelectors";

const BalanceHistoryChart = () => {
  const monthlyData = useSelector(selectMonthlyData);
  const [chartData, setChartData] = useState({
    categories: [] as string[],
    series: [] as number[],
  });

  useEffect(() => {
    const sortedMonths = Object.keys(monthlyData).sort();
    const last7 = sortedMonths.slice(-7);

    // Running balance: cumulative income minus expenses up to each month
    let runningBalance = 0;
    const allMonths = Object.keys(monthlyData).sort();
    const balanceByMonth: Record<string, number> = {};
    allMonths.forEach((m) => {
      runningBalance += (monthlyData[m].income || 0) - (monthlyData[m].expense || 0);
      balanceByMonth[m] = runningBalance;
    });

    const categories = last7.map((m) => {
      const d = new Date(m + "-01");
      return d.toLocaleString("default", { month: "short" });
    });
    const series = last7.map((m) => Math.round(balanceByMonth[m] || 0));

    setChartData({ categories, series });
  }, [monthlyData]);

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 215,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Inter, sans-serif",
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3, colors: ["#1814F3"] },
    grid: {
      strokeDashArray: 2,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      borderColor: "#E5E7EB",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8,
        type: "vertical",
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: { style: { colors: "#9CA3AF", fontSize: "13px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "13px" },
        formatter: (value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString(),
      },
    },
    tooltip: {
      y: { formatter: (value) => `$${value.toLocaleString()}` },
    },
    colors: ["#2563EB"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 200 },
          stroke: { width: 1.5 },
        },
      },
    ],
  };

  const series = [{ name: "Balance", data: chartData.series }];

  return (
    <div>
      <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold mb-4">
        Balance History
      </p>
      <div className="w-full bg-white rounded-[1.5625rem] sm:p-8">
        <div className="md:h-[215px]">
          <ReactApexChart options={options} series={series} type="area" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default BalanceHistoryChart;
