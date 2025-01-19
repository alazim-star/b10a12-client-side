import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const CartBoard = () => {
  // Bar chart data: Scholarships distributed over the years
  const barChartData = {
    labels: ["2019", "2020", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Scholarships Awarded",
        data: [50, 75, 100, 150, 200, 250],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Scholarships Applying Over the Years",
      },
    },
  };

  // Donut chart data: Scholarships by category
  const doughnutChartData = {
    labels: ["Master's", "Phd", "Law", "Research"],
    datasets: [
      {
        label: "Scholarships Distribution",
        data: [40, 30, 20, 10], // Example percentages
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Scholarships Distribution by Category",
      },
    },
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
        <div className="w-full max-w-[600px]">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Donut Chart */}
      <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center w-">
        <div className="w-full max-w-[400px]">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CartBoard;
