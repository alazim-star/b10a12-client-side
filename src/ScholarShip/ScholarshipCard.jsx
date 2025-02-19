import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaDollarSign } from "react-icons/fa";


const ScholarshipCard = ({ scholarship }) => {
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
    <div className=" mt-4">
   
      {/* Scholarship Card */}
      <div className="border   shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-3xl rounded-tl-[150px] rounded-br-[150px] lg:w-full w-[440px] ">
        {/* Scholarship Logo */}
        <div className="relative">
          <img
            className="w-full h-48  object-cover "
            src={scholarship?.universityLogo || "default-logo.png"}
            alt={scholarship?.universityName || "University Logo"}
          />
          <div className=" absolute top-3 right-3 bg-gradient-to-r from-[#0ab99d] to-[#0a9d9d] text-white py-1 px-3 text-xs font-semibold  shadow-md">
            Featured
          </div>
        </div>

        {/* Scholarship Details */}
        <div className="p-2">
          <h3 className="text-2xl font-bold text-gray-800">
            {scholarship?.
degree || "Category not available"}
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
  
   <li>
              <span className="font-semibold">🎓 Category:</span> {scholarship?.scholarshipCategory || "N/A"}
            </li>
            
            <li>
              <span className="font-semibold">🏛️ University:</span> {scholarship?.universityName || "N/A"}
            </li>
            <li>
              <span className="font-semibold">📍  Location:</span> {scholarship?.universityCountry || "N/A"}
            </li>
            <li className="flex items-center"><FaDollarSign />
              <span className="font-semibold "> Tuition Fees: $ </span> {scholarship?.tuitionFees || "N/A"}
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
        <div   onClick={handleSeeDetails} className=" p-4 bg-gradient-to-r from-[#111827] to-[#0ab99d] text-center rounded-r-[150px]">
          <button
          
            className=" hover:text-custom1 transition-all py-2 px-5 rounded-lg text-white font-semibold  hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
