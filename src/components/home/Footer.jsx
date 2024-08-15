import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "/logo/foodLogo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-purple-800  py-10 mt-20">
      <div className="container">
        <div className="px-4 lg:flex">
          <div className="mb-6 md:mb-0">
            <img src={Logo} alt="Logo" className="w-32" />
          </div>
          <div className="mt-8 text-center text-white text-sm">
            <p>
              &copy; {new Date().getFullYear()} FoodDelivery.uz. All rights
              reserved.
            </p>
          </div>
        </div>
        <hr />

        <div className="sm:flex text-center space-y-7 justify-between mt-5 text-white  px-12">
          <ul>
            <li className="mb-2">
              <NavLink to="./faq" className="hover:underline">
                FAQ
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./support" className="hover:underline">
                Support
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./terms" className="hover:underline">
                Terms & Conditions
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./privacy" className="hover:underline">
                Privacy Policy
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="mb-2">
              <NavLink to="./about" className="hover:underline">
                About
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./contact" className="hover:underline">
                Contact
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./sales" className="hover:underline">
                Point of Sales
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./testimonials" className="hover:underline">
                Testimonials
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="mb-2">
              <NavLink to="./subscribe" className="hover:underline">
                Subscribe Newsletter
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./register" className="hover:underline">
                Register
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="./login" className="hover:underline">
                Login
              </NavLink>
            </li>
          </ul>

          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/"
              target="blank"
              className="text-white hover:text-gray-400"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="blank"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/"
              target="blank"
              className="text-white hover:text-gray-400"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
