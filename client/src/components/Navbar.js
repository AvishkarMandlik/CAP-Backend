import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link} from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-white to-gray-200 sticky top-0 z-50 shadow-lg">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      {/* Logo and Brand Name */}
      <Link to="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="College Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
          College ERP System
        </span>
      </Link>
  
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
  
      {/* Navbar Links */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
      >
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
          {/* Home Link */}
          <li>
            <Link
              to="#"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:hover:text-teal-500 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Home
            </Link>
          </li>
  
          {/* Services Link */}
          <li>
            <Link
              to="#"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:hover:text-teal-500 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Services
            </Link>
          </li>
  
          {/* HallTicket Link */}
          <li>
            <Link
              to="/hallticket"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:hover:text-teal-500 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              HallTicket
            </Link>
          </li>
  
          {/* Contact Link */}
          <li>
            <Link
              to="#"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:hover:text-teal-500 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Contact
            </Link>
          </li>
  
          {/* Login Link */}
          <li>
            <Link
              to="/login"
              className="block py-2 px-3 text-white rounded bg-teal-600 hover:bg-teal-700 md:hover:bg-transparent md:hover:text-teal-500 md:p-0 dark:text-white dark:hover:bg-teal-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Login
            </Link>
          </li>
  
          {/* Dropdown Menu */}
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 md:w-auto dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Dashboard
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
  
            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      to="/capdashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cap Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherdashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Teacher Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentdashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Student Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
