import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src="/logo.png" alt="Educate Logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold">Educate</h2>
          </div>
          <p className="text-sm">
            Interdum velit laoreet id donec ultrices tincidunt arcu. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu.
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
        <div>
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
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links:</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Templates</a></li>
            <li><a href="#" className="hover:underline">Blog And Article</a></li>
            <li><a href="#" className="hover:underline">Integrations</a></li>
            <li><a href="#" className="hover:underline">Webinars</a></li>
            <li><a href="#" className="hover:underline">Privacy & Policy</a></li>
          </ul>
        </div>

        {/* Gallery */}
        <div>
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
          Copyright © 2023 <span className="text-primary font-bold">Educate</span> | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
