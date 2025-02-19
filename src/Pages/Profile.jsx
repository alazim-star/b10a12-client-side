import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [profileDetails, setProfileDetails] = useState({});
    const axiosSecure = useAxiosSecure();
  
    useEffect(() => {
      if (user && user.email) {
        axios
          .get(`https://b10a12-server-side-one.vercel.app/users/${user.email}`)
          .then((res) => {
            setProfileDetails(res.data);
          });
      }
    }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="navbar bg-primary text-white p-4 shadow-md flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">User Profile</Link>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
                  alt={profileDetails?.displayName}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Profile Header */}
      <div className="relative h- w-full bg-cover bg-center" >
        <img src={profileDetails.photoURL}   alt={profileDetails?.displayName} />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Hello{profileDetails?.displayName}</h1>
            <p className="text-white mt-2">Manage your projects and profile here</p>
            <button className="btn btn-info mt-4">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Profile Card */}
        <div className="card w-full bg-white shadow-xl p-6 text-center">
          <div className="avatar mx-auto">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
<img src={profileDetails.photoURL}   alt={profileDetails?.displayName} />
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-4">{profileDetails.name}</h2>
          <p className="text-gray-500">Solution Manager - Creative Tim</p>
          <p className="text-gray-500">University of Computer Science</p>
          <div className="mt-4 flex justify-center gap-4">
            <button className="btn btn-info">Connect</button>
            <button className="btn btn-outline">Message</button>
          </div>
        </div>

        {/* Right Section - Account Details */}
        <div className="col-span-2 bg-white shadow-xl p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Username</label>
              <input type="text" className="input input-bordered w-full" value="lucky.jesse" readOnly />
            </div>
            <div>
              <label className="label">Email:{profileDetails.email}</label>
              <input type="email" className="input input-bordered w-full" value="jesse@example.com" readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">First Name</label>
              <input type="text" className="input input-bordered w-full" value="Lucky" readOnly />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input type="text" className="input input-bordered w-full" value="Jesse" readOnly />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">Address</label>
            <input type="text" className="input input-bordered w-full" value="Bld Mihail Kogalniceanu, nr. 8, Bucharest" readOnly />
          </div>
        </div>
      </div>

      


 {/* Profile Card */}
 <div className="card bg-base-100 lg:w-96 shadow-xl mx-auto">
          <figure className="px-10 pt-10">
            <img
              src={profileDetails.photoURL}
              alt={profileDetails?.displayName}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold">{profileDetails.name}</h2>
            <p className="text-gray-600">{profileDetails.email}</p>
            <div className="card-actions">
              <button className="btn bg-custom1 w-full text-white">
                Role: {profileDetails.role}
              </button>
            </div>
          </div>
        </div>




    </div>
  );
};

export default ProfilePage;
