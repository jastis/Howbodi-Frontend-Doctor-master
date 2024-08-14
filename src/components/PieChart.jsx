import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(CategoryScale, ChartDataLabels);

export const PieChart = ({ backgroundColor, plotData }) => {
  const data = {
    datasets: [
      {
        label: "Earning Summary",
        data: plotData,
        weight: 1,
        backgroundColor: backgroundColor,
        hoverOffset: 4,
      },
    ],
    labels: ["daily", "weekly", "monthly"],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value, context) => {
          const datapoints = context?.chart?.data?.datasets?.[0]?.data;
          function totalSum(total, datapoint) {
            return total + datapoint;
          }
          const totalValue = datapoints.reduce(totalSum, 0);
          const percentageValue = ((value / totalValue) * 100).toFixed(1);
          return `${percentageValue}%`;
        },
      },
      legend: {
        position: "left",
      },
      title: {
        display: true,
        text: "Earning Summary",
        font: {
          size: 24,
          color: "#403058",
          family: "Trenda-regular",
        },
      },
    },

    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
    },
  };

  return <Doughnut data={data} options={options} />;
};
