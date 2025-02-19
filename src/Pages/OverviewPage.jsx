import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
  FaDollarSign,
  FaEdit,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // ✅ লাইন চার্টের জন্য ইম্পোর্ট করা হয়েছে
  PointElement, // ✅ পয়েন্ট দেখানোর জন্য দরকার
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // ✅ লাইন চার্টের জন্য দরকার
  PointElement, // ✅ পয়েন্ট ডট দেখানোর জন্য দরকার
  Title,
  Tooltip,
  Legend
);

const OverviewPage = () => {
  const { user } = useContext(AuthContext);
  const [profileDetails, setProfileDetails] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`https://b10a12-server-side-one.vercel.app/users/${user.email}`)
        .then((res) => {
          setProfileDetails(res.data);
        });
    }
  }, [user]);

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const barData = {
    labels: ["Revenue", "Users", "Applications", "Payments", "Scholarships"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats?.revenue || 0,
          stats?.allUsers || 0,
          stats?.allApplication || 0,
          stats?.allPaymentParson || 0,
          stats?.allScholarship || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Admin Overview" },
    },
    scales: {
      y: {
        min: 0.1,
        max: 50,
        ticks: { stepSize: 1 },
      },
    },
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [10, 20, 30, 25, 35, stats?.revenue || 40],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Revenue Trend" },
    },
  };

  return (
    <div className="lg:p-6">
      <div>
        <h2 className="lg:text-4xl text-2xl font-bold text-center   mb-6">
          <span>Hi, Welcome </span>
          {profileDetails.name}
        </h2>

        {/* Card Section */}
        <div className="grid lg:grid-cols-3 lg:gap-6 gap-3 mb-6">
          {/* Total Revenue */}
          <div className="rounded-lg text-white bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-6 flex items-center space-x-4 w-[280px] lg:w-full">
            <FaDollarSign className="text-4xl" />
            <div>
              <div className="text-lg">Total Revenue</div>
              <div className="text-2xl font-bold">${stats?.revenue || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Users */}
          <div className="rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 flex items-center space-x-4 w-[280px] lg:w-full">
            <FaUsers className="text-4xl" />
            <div>
              <div className="text-lg">All Users</div>
              <div className="text-2xl font-bold">{stats?.allUsers || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Applications */}
          <div className="rounded-lg text-white bg-gradient-to-r from-red-500 to-emerald-500 p-6 flex items-center space-x-4 w-[280px] lg:w-full">
            <FaNoteSticky className="text-4xl" />
            <div>
              <div className="text-lg">All Applications</div>
              <div className="text-2xl font-bold">{stats?.allApplication || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Payments */}
          <div className="h-48 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-emerald-500 p-6 flex items-center space-x-4 w-[280px] lg:w-full">
            <FaUserShield className="text-4xl" />
            <div>
              <div className="text-lg">All Payments Done</div>
              <div className="text-2xl font-bold">${stats?.allPaymentParson || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Scholarships */}
          <div className="h-48 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 p-6 flex items-center space-x-4 w-[280px] lg:w-full">
            <FaEdit className="text-4xl" />
            <div>
              <div className="text-lg">All Scholarship Posts</div>
              <div className="text-2xl font-bold">{stats?.allScholarship || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>
           {/* Line Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 lg:w-96 lg:h-48 w-[280px]">
          <Line data={lineData} options={lineOptions} />
        </div>
        {/* Bar Chart */}
        


        </div>
        <div className="bg-white rounded-lg shadow-lg h-full sm:p-6 mb-2 lg:h-[300px] w-full sm:hidden lg:block">
  <Bar data={barData} options={barOptions} />
</div>
        
       
      </div>
    </div>
  );
};

export default OverviewPage;
