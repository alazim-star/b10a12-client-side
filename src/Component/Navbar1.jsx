import React from "react";
import { FaFacebook, FaInstagram, FaPhone, FaRegEnvelopeOpen, FaSkype, FaTwitter } from "react-icons/fa";
import Theme from "./Theme";
import { BsTelephoneOutbound } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const Navbar1 = () => {
  return (
    <div className="shadow-lg bg-gradient-to-r from-blue-500 to-teal-500">
      {/* Top Bar */}
      <div className="text-white lg:flex justify-between items-center  py-3 text-sm container mx-auto ">
        {/* Contact Info */}
        <div className="flex justify-around gap-5 ">
          <div className="flex gap-2 items-center">
          <BsTelephoneOutbound />
            <span>(+009)5452</span>
          </div>
          <div className="flex gap-2 items-center">
          <FaRegEnvelopeOpen />
            <span>whitestone@gmail.com</span>
          </div>
          <div className="flex gap-2 items-center">
          <IoLocationOutline />
            <span>White stone,WishDream (WD), 24563</span>
          </div>
        </div>

        {/* Right Section: Theme, Language, Socials */}
        <div className="flex justify-between lg:space-x-6 ">
          {/* Theme Toggle */}
          <Theme />

          {/* Language Selector */}
          <select className="select select-bordered select-sm w-28 text-black rounded-full focus:outline-none focus:ring focus:ring-yellow-300">
            <option>English</option>
            <option>Spanish</option>
          </select>

          {/* Social Media Icons */}
          <div className="flex space-x-3">
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
