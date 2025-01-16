import React from "react";
import { FaFacebook, FaInstagram, FaSkype, FaTwitter } from "react-icons/fa";

const Navbar1= () => {
  return (
    <div className="bg-base-100 shadow-md">
      {/* Top Bar */}
      <div className=" text-white lg:flex justify-between items-center px-4 py-2 text-sm bg-custom1 text-w">
        <div className="lg:flex items-center">
          <div className="flex">
          <span className="flex items-center space-x-2">
            <i className="fas fa-phone-alt text-primary"></i>
            <span>(568) 367-987-237</span>
          </span>
          <span className="flex items-center space-x-2">
            <i className="fas fa-envelope text-primary"></i>
            <span>govillage@gmail.com</span>
          </span>
          </div>
          <span className="flex items-center space-x-2">
            <i className="fas fa-map-marker-alt text-primary"></i>
            <span>Hudson, Wisconsin(WI), 54016</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <select className="select select-bordered select-sm w-24 text-black">
            <option>English</option>
            <option>Spanish</option>
          </select>
          <div className="flex space-x-2">
            <a href="#" className=" hover:text-yellow-400 hover:text-xl"><FaFacebook></FaFacebook></a>
            <a href="#" className="hover:text-yellow-400 hover:text-xl"><FaTwitter></FaTwitter></a>
            <a href="#" className="hover:text-yellow-400 hover:text-xl"><FaSkype></FaSkype></a>
            <a href="#" className="hover:text-yellow-400 hover:text-xl"><FaInstagram></FaInstagram></a>
          </div>
        </div>
      </div>

     
      </div>

  );
};

export default Navbar1;
