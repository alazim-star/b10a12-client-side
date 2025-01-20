import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import SectionTitle from "../../../Shard/SectionTitle";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [profileDetails, setProfileDetails] = useState({});
  const [loading,setLoading]=useState([])


  useEffect(() => {
    // Fetch profile details if a user is logged in and has an email
    if (user && user.email) {
      axios
        .get(`https://b10a12-server-side-one.vercel.app/users/${user.email}`) 
        .then((res) => {
          setProfileDetails(res.data);
          setLoading(false);
        })
        
    }
  }, [user]);

  
 
  return (
    <div>
      <SectionTitle heading={'User profile'}></SectionTitle>
      <div className="card bg-base-100 lg:w-96 shadow-xl lg:ml-64 lg:mt-10">
  <figure className="px-10 pt-10">
    <img
      src={profileDetails.photoURL}
      alt=""
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{profileDetails.name}</h2>
    <p>{profileDetails.email}</p>
    <div className="card-actions">
      <button className="btn btn-primary"> Role:{profileDetails.role || 'N/A'}</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default UserProfile;
