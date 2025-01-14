import React from "react";

const Navbar = () => {
  return (
    <div className="bg-base-100 shadow-md">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm bg-gray-100">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <i className="fas fa-phone-alt text-primary"></i>
            <span>(568) 367-987-237</span>
          </span>
          <span className="flex items-center space-x-2">
            <i className="fas fa-envelope text-primary"></i>
            <span>govillage@gmail.com</span>
          </span>
          <span className="flex items-center space-x-2">
            <i className="fas fa-map-marker-alt text-primary"></i>
            <span>Hudson, Wisconsin(WI), 54016</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <select className="select select-bordered select-sm w-20">
            <option>English</option>
            <option>Spanish</option>
          </select>
          <div className="flex space-x-2">
            <a href="#" className="text-gray-500 hover:text-primary"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-500 hover:text-primary"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-500 hover:text-primary"><i className="fab fa-skype"></i></a>
            <a href="#" className="text-gray-500 hover:text-primary"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

     
      </div>

  );
};

export default Navbar;
