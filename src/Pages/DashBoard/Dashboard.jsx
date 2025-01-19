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
      <div className="text-white min-h-screen bg-custom1 w-64">
        <ul className="menu">
          {/* Admin Menu */}
          {isAdmin && (
            <>
              <li className="p-2">
                <NavLink to="/dashboard/adminProfile">
                  <FaUserNinja /> Admin Profile
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/addScholarshipAdmin">
                  <FaEdit /> Add Scholarship
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/manageScholarshipsAdmin">
                  <MdManageHistory /> Manage Scholarships
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/manageAppliedApplication">
                  <MdOutlineManageAccounts /> Manage Applied Application
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/manageUsers">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/manageReview">
                  <MdOutlineRateReview /> Manage Reviews
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/cartBoard">
                  <MdOutlineRateReview /> Cart Board
                </NavLink>
              </li>
            </>
          )}

          {/* Moderator Menu */}
          {isModerator && !isAdmin && (
            <>
              <div className="divider divider-neutral">Moderator</div>
              <li className="p-2">
                <NavLink to="/dashboard/myProfileModerator">
                  <FaEdit /> My Profile
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/manageScholarshipsModerator">
                  <MdManageHistory /> Manage Scholarships
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/allReviewsModerator">
                  <MdOutlineRateReview /> All Reviews
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/allAppliedScholarship">
                  <MdOutlineManageAccounts /> All Applied Scholarship
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/addScholarshipModerator">
                  <FaEdit /> Add Scholarship
                </NavLink>
              </li>
            </>
          )}

          {/* Regular User Menu */}
          {!isAdmin && !isModerator && (
            <>
              <div className="divider divider-neutral">User</div>
              <li className="p-2">
                <NavLink to="/dashboard/myProfile">
                  <FaUserNinja /> My Profile
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/myApplication">
                  <FaNoteSticky /> My Applications ({scholarship.length})
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/myReviews">
                  <MdOutlineRateReview /> My Reviews
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/paymentHistory">
                  <FaNoteSticky />Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Menu */}
          <div className="divider divider-neutral">All Menu</div>
          <li className="p-2">
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/allScholarship">
              <HiDocumentDuplicate /> All Scholarships
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/dashboard">
              <MdOutlineDashboard /> Dashboard
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
