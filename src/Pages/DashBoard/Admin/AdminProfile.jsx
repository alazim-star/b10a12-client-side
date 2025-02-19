
  import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [profileDetails, setProfileDetails] = useState({});
  
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://b10a12-server-side-one.vercel.app/users/${user.email}`)
        .then((res) => setProfileDetails(res.data));
    }
  }, [user]);
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  return (
    <div className="min-h-screen ">
      {/* Profile Header */}
      <div className="relative w-full bg-center bg-cover shadow-lg rounded-xl overflow-hidden">
        <img
          src={profileDetails.photoURL || "https://via.placeholder.com/150"}
          alt={profileDetails?.name}
          className="h-[300px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold">
            Hello,{profileDetails?.name} 👋
          </h1>
          <p className="mt-2">Manage your projects and profile here</p>
         
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="avatar mx-auto">
            <div className="w-28 h-28 rounded-full ring ring-blue-400 ring-offset-4">
              <img
                src={profileDetails.photoURL || "https://via.placeholder.com/150"}
                alt={profileDetails?.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">
            {profileDetails.name || "User Name"}
          </h2>
          <p className="text-gray-500">Solution Manager - Creative Tim</p>
          <p className="text-gray-500">University of Computer Science</p>
        
        </div>

        {/* Account Details */}
        <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Account Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500">Username</label>
              <input
                type="text"
                className="input input-bordered w-full p-2 rounded-md bg-gray-100 text-gray-800"
                value={profileDetails?.name || "guest"}
                readOnly
              />
            </div>
            <div>
              <label className="text-gray-500">Email</label>
              <input
                type="email"
                className="input input-bordered w-full p-2 rounded-md bg-gray-100 text-gray-800"
                value={profileDetails.email || "example@email.com"}
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-gray-500">First Name</label>
              <input
                type="text"
                className="input input-bordered w-full p-2 rounded-md bg-gray-100 text-gray-800"
                value={profileDetails.firstName || "Lucky"}
                readOnly
              />
            </div>
            <div>
              <label className="text-gray-500">Last Name</label>
              <input
                type="text"
                className="input input-bordered w-full p-2 rounded-md bg-gray-100 text-gray-800"
                value={profileDetails.lastName || "Jesse"}
                readOnly
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-gray-500">Address</label>
            <input
              type="text"
              className="input input-bordered w-full p-2 rounded-md bg-gray-100 text-gray-800"
              value={profileDetails.address || "Bucharest, Romania"}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile
