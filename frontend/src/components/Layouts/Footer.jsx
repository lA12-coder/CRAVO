import React from "react";
import { PlayStoreButton } from "../ui/DownloadButton";
import { AppStore } from "../ui/DownloadButton";
import { Link } from "react-router-dom";
import telegram from "../../assets/icons/telegram-icon.svg"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="font-mono text-3xl font-bold text-white mb-4">
              CRAVO
            </div>
            <p className="text-gray-300 mb-6 max-w-xs">
              Connecting communities through food delivery and restaurant
              services across Ethiopia.
            </p>
            <div className="space-y-3">
              <PlayStoreButton className="bg-white"/>
              <AppStore />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                    Get help
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                    Add your restaurant
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                    Sign up to deliver
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                    Create a business account
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                    Promotions and Gifts
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                  Press
                </Link>
              </li>
              <li>
                <Link className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <p className="text-gray-300 mb-4">
              Stay connected with us on social media for updates and offers.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Teleagram */}
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r transition-all duration-200"
              >
                <img src={telegram} alt="" />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 CRAVO. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
