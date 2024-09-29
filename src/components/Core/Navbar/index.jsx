import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import CategoriesMenu from "./CategoriesMenu";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SearchBarNav from "./SearchBarNav";
import { CiUser, CiMenuFries, CiSearch } from "react-icons/ci";

import { useUserStore } from "../../../store/user";
import {
  useCategoryStore,
  useIsCategoriesOpenStore,
} from "../../../store/categories";
import { getCategories } from "../../../api/category";
import { getGroups } from "../../../api/group";

import { useQueries } from "@tanstack/react-query";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { UserType } from "../../../constants";

const Navbar = () => {
  const [user, logout] = useUserStore((state) => [state.user, state.logout]);
  const [categories, setCategories] = useCategoryStore((state) => [
    state.categories,
    state.setCategories,
  ]);

  const [isCategoriesOpen, toggleCategoriesOpen] = useIsCategoriesOpenStore(
    (state) => [state.isCategoriesOpen, state.toggleCategoriesOpen]
  );

  const {
    isPending,
    data: [fetchedCategories, groups],
  } = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: getCategories,
        retry: false,
        enabled: !categories,
      },
      {
        queryKey: ["groups"],
        queryFn: getGroups,
        retry: false,
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
      };
    },
  });

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [isPending]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMobileMenuOpen(false);
  };

  const handleLoginLogout = () => {
    if (user) {
      logout();
    }
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const routes = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/coupon",
      name: "Coupons",
    },
    {
      path: undefined,
      name: "Categories",
      onClick: toggleCategoriesOpen,
    },
    {
      path: "/aboutus",
      name: "About Us",
    },
    {
      path: "/contactus",
      name: "Contact Us",
    },
  ];

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
          {routes.map((route, index) =>
            route.path ? (
              <Link to={route.path} key={index}>
                <li className="hover:underline cursor-pointer">{route.name}</li>
              </Link>
            ) : (
              <li
                key={index}
                className="hover:underline relative cursor-pointer"
                onClick={route.onClick}
              >
                {route.name}
              </li>
            )
          )}
        </ul>

        {/* Search, User Section and Login/Logout Button */}
        <div className="flex items-center space-x-4 ml-2">
          <div className="hidden md:block">
            <SearchBarNav />
          </div>

          {(!user || user.type === UserType.User) && (
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
          )}
          {user ? (
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
        <ul className="md:hidden bg-[#E9E7F9] flex flex-col space-y-4 px-4 py-2">
          {routes.map((route, index) =>
            route.path ? (
              <Link to={route.path} key={index} onClick={toggleMobileMenu}>
                <li className="hover:underline cursor-pointer">{route.name}</li>
              </Link>
            ) : (
              <li
                key={index}
                className="hover:underline relative cursor-pointer"
                onClick={route.onClick}
              >
                {route.name}
              </li>
            )
          )}
        </ul>
      )}

      {isCategoriesOpen &&
        (isPending ? (
          <LoadingSpinner />
        ) : (
          <CategoriesMenu groups={groups} categories={categories} />
        ))}
    </nav>
  );
};

export default Navbar;
