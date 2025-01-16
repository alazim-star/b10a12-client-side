import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Description */}
        <div>
          <div className="items-center md:grid-cols-4 gap-8">
            <img src="https://i.ibb.co.com/1TQ6L8Y/Blue-Modern-Free-Academy-Logo-1-removebg-preview.png" alt="" className="w-32 h-32" />
            <h2 className="text-xl uppercase font-bold">scholar</h2>
          </div>
          <p className="text-sm">
          A scholarship is financial assistance awarded to students based on academic achievement, financial need, or other criteria to support education.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-primary">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <i className="fab fa-pinterest text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="mt-10">
          <h3 className="font-bold text-lg mb-4">Our Services:</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Web Development</a></li>
            <li><a href="#" className="hover:underline">UI/UX Design</a></li>
            <li><a href="#" className="hover:underline">Management</a></li>
            <li><a href="#" className="hover:underline">Digital Marketing</a></li>
            <li><a href="#" className="hover:underline">Blog News</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div  className="mt-10">
          <h3 className="font-bold text-lg mb-4">Quick Links:</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="" className="hover:underline">Templates</a></li>
            <li><a href="" className="hover:underline">Blog And Article</a></li>
            <li><a href="" className="hover:underline">Integrations</a></li>
            <li><a href="" className="hover:underline">Webinars</a></li>
            <li><a href="" className="hover:underline">Privacy & Policy</a></li>
          </ul>
        </div>

        {/* Gallery */}
        <div  className="mt-10">
          <h3 className="font-bold text-lg mb-4">Gallery:</h3>
          <div className="grid grid-cols-3 gap-2">
            <img src="/images/img1.jpg" alt="Gallery" className="w-full h-16 object-cover" />
            <img src="/images/img2.jpg" alt="Gallery" className="w-full h-16 object-cover" />
            <img src="/images/img3.jpg" alt="Gallery" className="w-full h-16 object-cover" />
            <img src="/images/img4.jpg" alt="Gallery" className="w-full h-16 object-cover" />
            <img src="/images/img5.jpg" alt="Gallery" className="w-full h-16 object-cover" />
            <img src="/images/img6.jpg" alt="Gallery" className="w-full h-16 object-cover" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">
          Copyright © 2025 <span className="text-primary uppercase font-bold">scholar</span> | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
