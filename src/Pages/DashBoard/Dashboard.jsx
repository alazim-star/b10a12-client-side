import React from "react";
import { FaEdit, FaHome, FaSearch, FaUserNinja, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";
import {  MdManageHistory, MdOutlineManageAccounts, MdOutlineRateReview } from "react-icons/md";
import useScholarship from "../../Hooks/useScholarship";
import { FaNoteSticky } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { RiProfileLine } from "react-icons/ri";
import { GrOverview } from "react-icons/gr";
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const [scholarship] = useScholarship();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="text-white min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 w-64 shadow-lg">
        <div className="lg:p-6 text-center text-2xl font-bold">
          <h2>Dashboard</h2>
        </div>
        <ul  className="menu p-2">
          {/* Admin Menu */}
          {isAdmin && (
            <>
              <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/adminProfile">
                  <FaUserNinja /> Admin Profile
                </NavLink>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/addScholarshipAdmin">
                  <FaEdit /> Add Scholarship
                </NavLink>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/manageScholarshipsAdmin">
                  <MdManageHistory /> Manage Scholarships
                </NavLink>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/manageAppliedApplication">
                  <MdOutlineManageAccounts /> Manage Applied Application
                </NavLink>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/manageUsers">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/manageReview">
                  <MdOutlineRateReview /> Manage Reviews
                </NavLink>
              </li>
           
            </>
          )}

          {/* Moderator Menu */}
          {isModerator && !isAdmin && (
            <>
              <div className="divider text-lg font-bold text-gray-300 mt-4">Moderator</div>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/myProfileModerator">
                  <FaEdit /> My Profile
                </NavLink>
              </li>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/manageScholarshipsModerator">
                  <MdManageHistory /> Manage Scholarships
                </NavLink>
              </li>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/allReviewsModerator">
                  <MdOutlineRateReview /> All Reviews
                </NavLink>
              </li>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/allAppliedScholarship">
                  <MdOutlineManageAccounts /> All Applied Scholarship
                </NavLink>
              </li>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/addScholarshipModerator">
                  <FaEdit /> Add Scholarship
                </NavLink>
              </li>
            </>
          )}

          {/* all User Menu */}
          {!isAdmin && !isModerator && (
            <>
              <div className="divider text-lg font-bold text-gray-300 mt-4">User</div>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/myProfile">
                  <FaUserNinja /> My Profile
                </NavLink>
              </li>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/myApplication">
                  <FaNoteSticky /> My Applications ({scholarship.length})
                </NavLink>
              </li>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/myReviews">
                  <MdOutlineRateReview /> My Reviews
                </NavLink>
              </li>
              <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/paymentHistory">
                  <FaNoteSticky /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Menu */}
          <div className="divider text-lg font-bold text-gray-300 mt-4">All Menu</div>
          <NavLink
  to="/"
  className={({ isActive }) =>
    `p-3 mx-4 border-b-4 border-blue-900 rounded-xl transition hover:translate-y-1 hover:font-bold hover:text-[#111827] ${
      isActive ? "text-blue-900 font-bold" : ""
    }`
  }
>
  <div className="flex items-center gap-2">
    <FaHome />
    <p>Home</p>
  </div>
</NavLink>

          <NavLink
                 to="/allScholarship"
                 className={({ isActive }) =>
                  `hover:text-[#111827] hover:font-bold rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-blue-900 ${
                    isActive ? "text-blue-900 font-bold " : ""
                  }`
                }
              >
<div className="flex items-center gap-2">
<IoNewspaperOutline />
    <p>All Scholarship</p>
  </div>
              </NavLink>
          <NavLink
                 to="/dashboard"
                 className={({ isActive }) =>
                  `hover:text-[#111827] hover:font-bold rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-blue-900 ${
                    isActive ? "text-blue-900 font-bold " : ""
                  }`
                }
              >
<div className="flex items-center gap-2">
<RxDashboard />
    <p>Dashboard</p>
  </div>
              </NavLink>
          {/* <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/cartBoard">
                  <MdOutlineRateReview /> Cart Board
                </NavLink>
              </li> */}
              
                    <NavLink
                 to="/dashboard/profile"
                 className={({ isActive }) =>
                  `hover:text-[#111827] hover:font-bold rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-blue-900 ${
                    isActive ? "text-blue-900 font-bold " : ""
                  }`
                }
              >
      <div className="flex items-center gap-2">
      <RiProfileLine />
    <p>Profile</p>
  </div>
              </NavLink>
         
              <NavLink
                 to="/dashboard/overviewPage"
                 className={({ isActive }) =>
                  `hover:text-[#111827] hover:font-bold rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-blue-900 ${
                    isActive ? "text-blue-900 font-bold " : ""
                  }`
                }
              >
<div className="flex items-center gap-2">
<GrOverview />
    <p>Overview</p>
  </div>
              </NavLink>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 bg-gray-50 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;