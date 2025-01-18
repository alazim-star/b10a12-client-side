import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ScholarshipCard = ({ scholarship, applications = [], setFilteredApplications }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSeeDetails = () => {
    if (user && user.email) {
      navigate(`/viewDetails/${scholarship?._id}`);
    } else {
      navigate("/login", { state: { from: `/viewDetails/${scholarship?._id}` } });
    }
  };

 

  return (
    <div>
     

      {/* Scholarship Card */}
      <div className="border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 w-full mt-4">
        {/* Scholarship Logo */}
        <div className="relative flex justify-between">
          <div>
            <img
              className="w-full h-48 object-cover"
              src={scholarship?.universityLogo || "default-logo.png"}
              alt={scholarship?.universityName || "University Logo"}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {scholarship?.scholarshipCategory || "Category not available"}
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-semibold">🎓 Category:</span> {scholarship?.scholarshipCategory || "N/A"}
              </li>
              <li>
                <span className="font-semibold">🏛️ University:</span> {scholarship?.universityName || "N/A"}
              </li>
              <li>
                <span className="font-semibold">📍 Location:</span> {scholarship?.universityLocation || "N/A"}
              </li>
              <li>
                <span className="font-semibold">📚 Subject:</span> {scholarship?.subjectCategory || "N/A"}
              </li>
              <li>
                <span className="font-semibold">📅 Deadline:</span> {scholarship?.applicationDeadline || "N/A"}
              </li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 bg-gray-50 text-center flex justify-end">
          <button
            onClick={handleSeeDetails}
            className="bg-[#111827] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 hover:bg-[#0ab99d] text-white font-semibold"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
