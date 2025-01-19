import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaDollarSign, FaEdit, FaSearch, FaUser, FaUsers, FaUserShield } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";

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

  const { data: stats} = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });


  return (
   <div>
     <div> 
      <h2 className="text-3xl font-bold text-center ">
        <span>Hi, Welcome </span>
        {profileDetails.name}
      </h2>
    {/* card  */}
       <div className="grid lg:grid-cols-3 gap-5 ">

       <div className="rounded-full text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... stat flex items-center">
          <FaDollarSign className="text-3xl"></FaDollarSign>
         <div>
         <div className="stat-title text-white">Total Revenue</div>
          <div className="stat-value text-white ">${stats?.revenue || 0}</div>
          <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
         </div>
          
        </div>
    {/* card  */}
        <div className="rounded-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... stat flex items-center">
          <FaUsers className="text-3xl"></FaUsers>
         <div>
         <div className="stat-title text-white"> All Users</div>
          <div className="stat-value text-white ">{stats?.allUsers|| 0}</div>
          <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
         </div>
          
        </div>
    {/* card  */}
        <div className="rounded-full text-white bg-gradient-to-r from-red-500 from-50% via--500 via-30% to-emerald-500 to-90% ... stat flex items-center">
          <FaNoteSticky className="text-3xl"></FaNoteSticky>
         <div>
         <div className="stat-title text-white">All Application</div>
          <div className="stat-value text-white ">{stats?.allApplication || 0}</div>
          <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
         </div>
          
        </div>


    {/* card  */}
        <div className="rounded-full text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-90% to-emerald-500 to-100% ... stat flex items-center">
          <FaUserShield className="text-3xl"></FaUserShield>
         <div>
         <div className="stat-title text-white"> All Payment Done</div>
          <div className="stat-value text-white ">${stats?.allPaymentParson|| 0}</div>
          <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
         </div>
          
        </div>


    {/* card  */}

        <div className="rounded-full text-white bg-gradient-to-r from-indigo-500 from-0% via-pink-500 via-10% to-red-500 to-100% ... stat flex items-center">
          <FaEdit className="text-3xl"></FaEdit>
         <div>
         <div className="stat-title text-white"> All Scholarship Post</div>
          <div className="stat-value text-white ">{stats?.allScholarship|| 0}</div>
          <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
         </div>
          
        </div>

       </div>
        {/* Other stats */}
      </div>

 
      <div className="card bg-base-100 lg:w-96 shadow-xl  ">
        <figure className="px-10 pt-10">
          <img
            src={profileDetails.photoURL}
            alt={profileDetails?.displayName}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{profileDetails.name}</h2>
          <p>{profileDetails.email}</p>
          <div className="card-actions">
            <button className="btn bg-custom1 w-full">
              Role: {profileDetails.role}
            </button>
          </div>
        </div>
      </div>
      
   </div>

  );
};

export default AdminProfile;
