import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Description */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="https://i.ibb.co.com/1TQ6L8Y/Blue-Modern-Free-Academy-Logo-1-removebg-preview.png"
              alt=""
              className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
            />
            <h2 className="text-2xl uppercase font-extrabold tracking-wide text-primary">
              Scholar
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            A scholarship is financial assistance awarded to students based on
            academic achievement, financial need, or other criteria to support
            education.
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href="#"
              className="hover:scale-110 transition-transform duration-300"
              title="Facebook"
            >
              <i className="fab fa-facebook-square text-blue-600 text-3xl"></i>
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform duration-300"
              title="Instagram"
            >
              <i className="fab fa-instagram-square text-pink-500 text-3xl"></i>
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform duration-300"
              title="Pinterest"
            >
              <i className="fab fa-pinterest-square text-red-600 text-3xl"></i>
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform duration-300"
              title="Twitter"
            >
              <i className="fab fa-twitter-square text-blue-400 text-3xl"></i>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Our Services:</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-primary transition duration-300">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition duration-300">
                UI/UX Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition duration-300">
                Management
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition duration-300">
                Digital Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition duration-300">
                Blog News
              </a>
            </li>
          </ul>
        </div>

        {/* Email Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Subscribe to our Newsletter:</h3>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button
              type="submit"
              className="bg-custom1 text-white py-2 rounded-md hover:bg-primary transition-colors duration-300 font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Gallery:</h3>
          <div className="grid grid-cols-3 gap-2">
            <img
              src="https://i.ibb.co.com/zs2hnKZ/Fully-funded-opportunity-for-students-with-Manaaki-Scholarship-in-New-Zealand.jpg"
              alt="Gallery"
              className="w-full h-20 object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/cXGC5j9/group-young-students-front-school-building.jpg"
              alt="Gallery"
              className="w-full h-20 object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/3RqJDmv/young-people-looking-victorious.jpg"
              alt="Gallery"
              className="w-full h-20 object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/5xgCnxt/360-F-535738048-p-Xb7j-VYzqpx8a-Yb9r-Kmb0uyfy-AKqa-Njb.jpg"
              alt="Gallery"
              className="w-full h-20 object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/Khygb9D/images-3.jpg"
              alt="Gallery"
              className="w-full h-20 object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/wKnJWNq/boys-girls-graduation.jpg"
              alt="Gallery"
              className="w-full h-20 object-cover rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">
          Copyright © 2025{" "}
          <span className="text-primary uppercase font-bold">Scholar</span> | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
