import { useState } from "react";
import logo from "../assets/logo.png";
import CategoriesMenu from "./CategoriesMenu";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "../components/ShoppingCartIcon";
import SearchBarNav from "../components/SearchBarNav";
import { CiUser } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isElectronicsOpen, setIsElectronicsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    if (isCategoriesOpen) {
      setIsElectronicsOpen(false);
    }
  };

  const toggleElectronics = (e) => {
    e.stopPropagation();
    setIsElectronicsOpen(!isElectronicsOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#E9E7F9] p-4 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center relative">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="CouponZ Logo"
            className="h-5 w-auto md:h-8 lg:h-10 mr-4"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-[#25354C]">
          <Link to="/">
            <li className="hover:underline cursor-pointer">Home</li>
          </Link>
          <Link to="/coupon">
            <li className="hover:underline cursor-pointer">All Coupons</li>
          </Link>
          <li
            className="hover:underline relative cursor-pointer"
            onClick={toggleCategories}
          >
            Categories
          </li>
          <Link to="/contactus">
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </Link>
          <Link to="/aboutus">
            <li className="hover:underline cursor-pointer">About Us</li>
          </Link>
        </ul>

        {/* Search, User Section and Login/Logout Button */}
        <div className="flex items-center space-x-4 ml-2">
          <div className="hidden md:block">
            <SearchBarNav />
          </div>
          <ShoppingCartIcon />
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="focus:outline-none"
              >
                <div className="group relative p-2 flex items-center justify-center">
                  <CiUser className="text-3xl" />
                  <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-900 transition-all duration-300"></span>
                </div>
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLoginLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                onClick={handleLoginLogout}
                className="bg-[#FFC212] text-black px-4 py-2 rounded-full hover:bg-purple-300 mr-2"
              >
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu and Search Buttons */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
          >
            <CiSearch className="text-3xl" />
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
          >
            <CiMenuFries className="text-3xl" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-4">
          <SearchBarNav />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#E9E7F9] flex flex-col space-y-4 px-4 py-2 mt-4">
          <Link to="/" onClick={toggleMobileMenu}>
            <p className="hover:underline">Home</p>
          </Link>
          <Link to="/coupon" onClick={toggleMobileMenu}>
            <p className="hover:underline">All Coupons</p>
          </Link>
          <p
            className="hover:underline cursor-pointer"
            onClick={() => {
              toggleCategories();
              toggleMobileMenu();
            }}
          >
            Categories
          </p>
          <Link to="/contactus" onClick={toggleMobileMenu}>
            <p className="hover:underline">Contact Us</p>
          </Link>
          <Link to="/aboutus" onClick={toggleMobileMenu}>
            <p className="hover:underline">About Us</p>
          </Link>
        </div>
      )}

      {/* Categories Menu */}
      {isCategoriesOpen && (
        <CategoriesMenu
          isElectronicsOpen={isElectronicsOpen}
          toggleElectronics={toggleElectronics}
        />
      )}
    </nav>
  );
};

export default Navbar;
