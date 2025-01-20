import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaDollarSign,
  FaEdit,
  FaSearch,
  FaUser,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [profileDetails, setProfileDetails] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
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
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Admin Overview",
      },
    },
    scales: {
      y: {
        min:.1,
        max: 50,
        ticks: {
          stepSize:2, // Optional: Customize tick spacing
        },
      },
    },



  };

  return (
    <div className="p-6">
      <div>
        <h2 className="text-4xl font-bold text-center mb-6">
          <span>Hi, Welcome </span>
          {profileDetails.name}
        </h2>

        {/* Card Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Total Revenue */}
          <div className="rounded-lg text-white bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-6 flex items-center space-x-4">
            <FaDollarSign className="text-4xl" />
            <div>
              <div className="text-lg">Total Revenue</div>
              <div className="text-2xl font-bold">${stats?.revenue || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Users */}
          <div className="rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 flex items-center space-x-4">
            <FaUsers className="text-4xl" />
            <div>
              <div className="text-lg">All Users</div>
              <div className="text-2xl font-bold">{stats?.allUsers || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Applications */}
          <div className="rounded-lg text-white bg-gradient-to-r from-red-500 to-emerald-500 p-6 flex items-center space-x-4">
            <FaNoteSticky className="text-4xl" />
            <div>
              <div className="text-lg">All Applications</div>
              <div className="text-2xl font-bold">{stats?.allApplication || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Payments */}
          <div className="rounded-lg text-white bg-gradient-to-r from-indigo-500 to-emerald-500 p-6 flex items-center space-x-4">
            <FaUserShield className="text-4xl" />
            <div>
              <div className="text-lg">All Payments Done</div>
              <div className="text-2xl font-bold">${stats?.allPaymentParson || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>

          {/* All Scholarships */}
          <div className="rounded-lg text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 p-6 flex items-center space-x-4">
            <FaEdit className="text-4xl" />
            <div>
              <div className="text-lg">All Scholarship Posts</div>
              <div className="text-2xl font-bold">{stats?.allScholarship || 0}</div>
              <div className="text-sm">Jan 1st - Feb 1st</div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Profile Card */}
        <div className="card bg-base-100 lg:w-96 shadow-xl mx-auto">
          <figure className="px-10 pt-10">
            <img
              src={profileDetails.photoURL}
              alt={profileDetails?.displayName}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold">{profileDetails.name}</h2>
            <p className="text-gray-600">{profileDetails.email}</p>
            <div className="card-actions">
              <button className="btn bg-custom1 w-full text-white">
                Role: {profileDetails.role}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
