import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { selectCategoryTotals } from "../store/selectors/transactionSelectors";

const ExpenseStatistics: React.FC = () => {
  const categoryTotals = useSelector(selectCategoryTotals);

  // Take top 4 spending categories
  const sorted = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const labels = sorted.length > 0
    ? sorted.map(([cat]) => cat)
    : ["Housing", "Food", "Shopping", "Other"];

  const total = sorted.reduce((s, [, v]) => s + v, 0);
  const percentages = sorted.length > 0
    ? sorted.map(([, v]) => Math.round((v / total) * 100))
    : [35, 25, 20, 20];

  const options: ApexOptions = {
    chart: {
      type: "pie",
      height: 350,
      fontFamily: "Inter, sans-serif",
    },
    labels,
    colors: ["#FC7900", "#232323", "#396AFF", "#343C6A"],
    plotOptions: {
      pie: {
        expandOnClick: true,
        dataLabels: { offset: -15, minAngleToShowLabel: 10 },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        colors: ["#fff"],
      },
      dropShadow: { enabled: false },
      formatter: function (val, opts) {
        const label = opts.w.config.labels[opts.seriesIndex];
        return [`${Math.round(val as number)}%`, label];
      },
      textAnchor: "middle",
      distributed: true,
    },
    legend: { show: false },
    stroke: { width: 2, colors: ["#fff"] },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  };

  return (
    <div>
      <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold mb-4">
        Expense Statistics
      </p>
      <div className="w-full bg-white rounded-[1.5625rem] p-4 sm:p-8">
        <div className="h-[300px]">
          <ReactApexChart
            options={options}
            series={percentages}
            type="pie"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
