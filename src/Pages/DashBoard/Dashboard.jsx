import React from "react";
import { FaEdit, FaHome, FaSearch, FaUserNinja, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";
import { MdOutlineDashboard, MdManageHistory, MdOutlineManageAccounts, MdOutlineRateReview } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import useScholarship from "../../Hooks/useScholarship";
import { FaNoteSticky } from "react-icons/fa6";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const [scholarship] = useScholarship();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="text-white min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 w-64 shadow-lg">
        <div className="p-6 text-center text-2xl font-bold">
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

          {/* Regular User Menu */}
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
          <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
            <NavLink to="/allScholarship">
              <HiDocumentDuplicate /> All Scholarships
            </NavLink>
          </li>
          <li className="p-2 hover:bg-teal-700 transition-all duration-300 rounded-lg">
            <NavLink to="/dashboard">
              <MdOutlineDashboard /> Dashboard
            </NavLink>
          </li>
          <li className="p-2 hover:bg-blue-700 transition-all duration-300 rounded-lg">
                <NavLink to="/dashboard/cartBoard">
                  <MdOutlineRateReview /> Cart Board
                </NavLink>
              </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;