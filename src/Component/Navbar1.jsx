import React from "react";
import { FaFacebook, FaInstagram, FaSkype, FaTwitter } from "react-icons/fa";
import Theme from "./Theme";

const Navbar1 = () => {
  return (
    <div className="bg-base-100 shadow-lg">
      {/* Top Bar */}
      <div className="text-white lg:flex justify-between items-center px-6 py-3 text-sm bg-gradient-to-r from-blue-500 to-teal-500 ">
        {/* Contact Info */}
        <div className="lg:flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <i className="fas fa-phone-alt text-yellow-300"></i>
            <span>(568) 367-987-237</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="fas fa-envelope text-yellow-300"></i>
            <span>govillage@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="fas fa-map-marker-alt text-yellow-300"></i>
            <span>Hudson, Wisconsin(WI), 54016</span>
          </div>
        </div>

        {/* Right Section: Theme, Language, Socials */}
        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <Theme />

          {/* Language Selector */}
          <select className="select select-bordered select-sm w-28 text-black rounded-full focus:outline-none focus:ring focus:ring-yellow-300">
            <option>English</option>
            <option>Spanish</option>
          </select>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-yellow-400 hover:scale-125 transition-transform duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 hover:scale-125 transition-transform duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 hover:scale-125 transition-transform duration-300"
              aria-label="Skype"
            >
              <FaSkype size={18} />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 hover:scale-125 transition-transform duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
