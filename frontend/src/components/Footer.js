import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"; // Importing social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4">
        
        {/* Quick Links */}
        <div className="flex flex-col md:flex-row md:space-x-6 mb-6 md:mb-0">
          <a href="#about" className="hover:text-gray-400 mb-2 md:mb-0">About Us</a>
          <a href="#faqs" className="hover:text-gray-400 mb-2 md:mb-0">FAQs</a>
          <a href="#privacy" className="hover:text-gray-400 mb-2 md:mb-0">Privacy Policy</a>
          <a href="#terms" className="hover:text-gray-400 mb-2 md:mb-0">Terms & Conditions</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-6 md:mb-0">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            <FaInstagram className="h-6 w-6 md:h-8 md:w-8" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            <FaFacebookF className="h-6 w-6 md:h-8 md:w-8" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            <FaTwitter className="h-6 w-6 md:h-8 md:w-8" />
          </a>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center mt-4">
        <p className="text-sm">© 2024 LuxeCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
