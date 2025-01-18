import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import SectionTitle from "../../../Shard/SectionTitle";

const MyProfileModerator= () => {
  const { user } = useContext(AuthContext);
  const [profileDetails, setProfileDetails] = useState({});
  


  useEffect(() => {
    // Fetch profile details if a user is logged in and has an email
    if (user && user.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`) 
        .then((res) => {
          setProfileDetails(res.data);
          setLoading(false);
        })
        
    }
  }, [user]);

  
 
  return (
    <div>
      <SectionTitle heading={'Moderator profile'}></SectionTitle>
      <div className="card bg-base-100 w-96 shadow-xl lg:ml-64 lg:mt-10">
  <figure className="px-10 pt-10">
    <img
      src={profileDetails.photoURL}
      alt="Shoes"
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

export default MyProfileModerator
