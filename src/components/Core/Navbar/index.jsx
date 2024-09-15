import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png"; // Correct path for logo
import CategoriesMenu from "./CategoriesMenu";
import { Link } from "react-router-dom";

import { useUserStore } from "../../../store/user";
import { useCategoryStore } from "../../../store/categories";
import { getCategories } from "../../../api/category";
import getGroups from "../../../api/group";

import { useQueries } from "@tanstack/react-query";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const [
    categories,
    setCategories
  ] = useCategoryStore((state) => [
    state.categories,
    state.setCategories,
  ]);
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
 
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCategories = () => {
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
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
      onClick: () => setIsCategoriesOpen(prev => !prev),
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
          <img src={logo} alt="CuponZ Logo" className="h-8 mr-10" />
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

        {/* Search and Login Section */}
        <div className="flex items-center space-x-4">
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
          <Link to="/login">
            <button className="bg-[#FFC212] text-black px-4 py-2 rounded-full hover:bg-purple-300">
              Login
            </button>
          </Link>
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
