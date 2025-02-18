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
  className={({ isActive }) =>
    `hover:text-custom1  rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-custom1 ${
      isActive ? "text-custom1  " : ""
    }`
  }
>
  Home
</NavLink>
<NavLink
  to="/allScholarship"
  className={({ isActive }) =>
    `hover:text-custom1  rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-custom1 ${
      isActive ? "text-custom1  " : ""
    }`
  }
>
 All Scholarship
</NavLink>
     
      <NavLink
   to="/dashboard/cartBoard"
   className={({ isActive }) =>
    `hover:text-custom1  rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-custom1 ${
      isActive ? "text-custom1  " : ""
    }`
  }
>
Dashboard
</NavLink>
<NavLink
   to="/dashboard/cartBoard"
   className={({ isActive }) =>
    `hover:text-custom1  rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-custom1 ${
      isActive ? "text-custom1  " : ""
    }`
  }
>
Profile
</NavLink>
<NavLink
   to="/dashboard/cartBoard"
   className={({ isActive }) =>
    `hover:text-custom1  rounded-xl  hover:translate-y-1  p-3 transition mx-4 border-b-4 border-custom1 ${
      isActive ? "text-custom1  " : ""
    }`
  }
>
Contact
</NavLink>
    </>
  );

  return (
    <nav
      className={`${
        scrolled
          ? "backdrop-blur-sm bg-white/60 text-black"
          : "bg-[#111827] text-white"
      } w-full sticky top-0 z-50 transition-all duration-300 `}
    >
      <div className="navbar h-14 container mx-auto  ">
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
              className="menu menu-sm dropdown-content text-white bg-[#111827] rounded-box z-[1] mt-3 w-52 shadow"
            >
              {links}
            </ul>
          </div>
          {/* Logo and Name */}
          <div className="flex items-center ">
            <img
              className="w-10 h-10 lg:w-10 lg:h-10 "
              src="https://i.ibb.co.com/xK2W4sJc/Untitled-design-1-removebg-preview.png"
              alt="Logo"
            />
            <p className="uppercase lg:text-2xl font-bold lg:ml-2 ">Scholar</p>
          </div>
        </div>
        {/* Desktop Links */}
        <div className="navbar hidden lg:flex ">
          <ul className="menu menu-horizontal">{links}</ul>
        </div>
        {/* Login/Logout Section */}
        <div className="items-center ">
          {loading ? (
       <span className="loading loading-spinner text-accent"></span>
          ) : user ? (
            <div className="flex items-center justify-end lg:space-x-4">
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
                className="hover:text-custom1 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 lg:p-3 p-2 transition border-b-4 border-custom1"
              >
                SignOut
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-custom1 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 p-3  transition border-b-4 border-custom1"
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
