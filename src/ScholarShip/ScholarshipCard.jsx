import React, { useContext } from "react";
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
    <div className="w-full mt-4">
      {/* Scholarship Card */}
      <div className="border rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-white via-gray-100 to-gray-200">
        {/* Scholarship Logo */}
        <div className="relative">
          <img
            className="w-full h-52 object-cover rounded-t-xl"
            src={scholarship?.universityLogo || "default-logo.png"}
            alt={scholarship?.universityName || "University Logo"}
          />
          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0ab99d] to-[#0a9d9d] text-white py-1 px-3 text-xs font-semibold rounded-full shadow-md">
            Featured
          </div>
        </div>

        {/* Scholarship Details */}
        <div className="p-5 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {scholarship?.scholarshipCategory || "Category not available"}
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
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

        {/* Action Button */}
        <div className="p-4 bg-gradient-to-r from-[#111827] to-[#0ab99d] text-center rounded-b-xl">
          <button
            onClick={handleSeeDetails}
            className="bg-yellow-400 hover:bg-yellow-500 transition-all py-2 px-5 rounded-lg text-gray-900 font-semibold shadow-md hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
