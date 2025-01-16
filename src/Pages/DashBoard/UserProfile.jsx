import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(AuthContext); // Access the logged-in user's details
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    // Fetch profile details if a user is logged in
    if (user) {
      axios
        .get(`http://localhost:5000/users?email=${user.email}`) // Adjust endpoint based on your API
        .then((res) => {
          setProfileDetails(res.data);
        })
        .catch((err) => console.error("Error fetching user details:", err));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-600">You must be logged in to view your profile.</p>
      </div>
    );
  }

  if (!profileDetails) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center gap-4">
          <img
            src={profileDetails.profilePhoto || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <h3 className="text-xl font-bold">{profileDetails.name || "User Name"}</h3>
            <p className="text-gray-600">{profileDetails.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Contact Information</h4>
          <p className="text-gray-600">Phone: {profileDetails.phone || "N/A"}</p>
          <p className="text-gray-600">Address: {profileDetails.address || "N/A"}</p>
        </div>
        {profileDetails.role && profileDetails.role !== "User" && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Role</h4>
            <p className="text-gray-600">{profileDetails.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
