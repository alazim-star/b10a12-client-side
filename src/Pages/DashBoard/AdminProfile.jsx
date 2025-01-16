import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const AdminProfile = () => {
  const { user } = useContext(AuthContext); // Access the logged-in user's details
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    // Fetch admin profile details if a user is logged in
    if (user) {
      axios
        .get(`http://localhost:5000/admin?email=${user.email}`)
        .then((res) => {
          setAdminDetails(res.data);
        })
        .catch((err) => console.error("Error fetching admin details:", err));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-600">You must be logged in to view your profile.</p>
      </div>
    );
  }

  if (!adminDetails) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center gap-4">
          <img
            src={adminDetails.profilePhoto || "https://via.placeholder.com/150"}
            alt="Admin Profile"
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <h3 className="text-xl font-bold">{adminDetails.name || "Admin Name"}</h3>
            <p className="text-gray-600">{adminDetails.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Contact Information</h4>
          <p className="text-gray-600">Phone: {adminDetails.phone || "N/A"}</p>
          <p className="text-gray-600">Address: {adminDetails.address || "N/A"}</p>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Role</h4>
          <p className="text-gray-600">{adminDetails.role || "Administrator"}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
