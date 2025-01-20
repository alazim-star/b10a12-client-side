import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar2 = () => {
  const { loading, user, signOutUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Sign out successful"))
      .catch((error) => console.error("Error:", error.message));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = (
    <>
      <NavLink
        to="/"
        className="hover:text-yellow-400 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 p-3 transition mx-4 border-b-4 border-yellow-400"
      >
        Home
      </NavLink>
      <NavLink
        to="/allScholarship"
        className="hover:text-yellow-400 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 p-3 transition mx-4 border-b-4 border-yellow-400"
      >
        All Scholarship
      </NavLink>
      <NavLink
        to="/dashboard/cartBoard"
        className="hover:text-yellow-400 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 p-3 transition mx-4 border-b-4 border-yellow-400"
      >
        Dashboard
      </NavLink>
    </>
  );

  return (
    <nav
      className={`${
        scrolled
          ? "backdrop-blur-sm bg-white/60 text-black"
          : "bg-[#111827] text-white"
      } w-full sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="navbar h-20 px-4 lg:px-10">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-white bg-[#111827] rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          {/* Logo and Name */}
          <div className="flex items-center">
            <img
              className="w-10 h-10 lg:w-24 lg:h-24"
              src="https://i.ibb.co/1TQ6L8Y/Blue-Modern-Free-Academy-Logo-1-removebg-preview.png"
              alt="Logo"
            />
            <p className="uppercase lg:text-2xl font-bold">Scholar</p>
          </div>
        </div>
        {/* Desktop Links */}
        <div className="navbar hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        {/* Login/Logout Section */}
        <div className="items-center">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="flex items-center lg:space-x-4">
              {/* Ensure the image is displayed only if photoURL is valid */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border border-white"
                  referrerPolicy="no-referrer" // Ensures images from external URLs load correctly
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <p className="text-sm lg:text-md text-custom1">
                Welcome, <span className="font-bold">{user.email}</span>
              </p>
              <button
                onClick={handleSignOut}
                className="hover:text-yellow-400 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 lg:p-3 p-2 transition border-b-4 border-yellow-400"
              >
                SignOut
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-400 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 p-3 transition border-b-4 border-yellow-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
