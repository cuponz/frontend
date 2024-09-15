import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import profilePic from "../../../assets/userIcon.png";
import CategoriesMenu from "./CategoriesMenu";
import { Link } from "react-router-dom";

import { useUserStore } from "../../../store/user";
import { useCategoryStore, useIsCategoriesOpenStore } from "../../../store/categories";
import { getCategories } from "../../../api/category";
import getGroups from "../../../api/group";

import { useQueries } from "@tanstack/react-query";
import LoadingSpinner from "../../Utils/LoadingSpinner";

const Navbar = () => {
  const [user, logout] = useUserStore((state) => [state.user, state.logout]);
  const [categories, setCategories] = useCategoryStore((state) => [
    state.categories,
    state.setCategories,
  ]);

  const [isCategoriesOpen, toggleCategoriesOpen] = useIsCategoriesOpenStore((state) => [
    state.isCategoriesOpen,
    state.toggleCategoriesOpen,
  ])

  const { isPending, data: [fetchedCategories, groups] } = useQueries({
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
      }
    },
  });

	useEffect(() => {
		if (fetchedCategories) {
			setCategories(fetchedCategories)
		}
	}, [isPending])

  useEffect(() => {
    console.log(user);
  }, [user])
 
  // const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
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
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="CuponZ Logo"
            className="h-5 w-auto md:h-8 lg:h-10 mr-4"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-[#25354C]">
          {routes.map((route, index) =>
            route.path
              ? (
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-1 border rounded-full"
            />
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 1114 0 7 7 0 01-14 0z"
              />
            </svg>
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="focus:outline-none"
              >
                <img
                  src={profilePic}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-solid hover:border-blue-500 border-2 border-yellow-400"
                />
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden bg-[#E9E7F9] flex flex-col space-y-4 px-4 py-2">
          {routes.map((route, index) =>
            route.path
              ? (
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

      {isCategoriesOpen && (
        isPending 
          ? <LoadingSpinner />
          : <CategoriesMenu
              groups={groups}
              categories={categories}
            />
      )}
    </nav>
  );
};

export default Navbar;
