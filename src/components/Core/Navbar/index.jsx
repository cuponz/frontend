import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import CategoriesMenu from "./CategoriesMenu";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SearchBarNav from "./SearchBarNav";
import { CiUser, CiMenuFries, CiSearch } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";

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
import { useTranslations } from "../../../store/languages";

const Navbar = () => {
	const { t, language, setLanguage, supportedLanguages } = useTranslations();
	const [user, logout] = useUserStore((state) => [state.user, state.logout]);
	const [categories, setCategories] = useCategoryStore((state) => [
		state.categories,
		state.setCategories,
	]);

	const [isCategoriesOpen, toggleCategoriesOpen] = useIsCategoriesOpenStore(
		(state) => [state.isCategoriesOpen, state.toggleCategoriesOpen],
	);

	const location = useLocation();

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

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsProfileDropdownOpen(false);
		setIsSearchOpen(false);
		setIsLanguageDropdownOpen(false);
	}, [location]);

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

	const toggleLanguageDropdown = () => {
		setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
	};

	const changeLanguage = (lng) => {
		setLanguage(lng);
		setIsLanguageDropdownOpen(false);
	};

	const routes = [
		{ path: "/", name: t("Home") },
		{ path: "/coupon", name: t("Coupons") },
		{ path: undefined, name: t("Categories"), onClick: toggleCategoriesOpen },
		{ path: "/aboutus", name: t("About Us") },
		{ path: "/contactus", name: t("Contact Us") },
	];

	const languageNames = {
		en: "English",
		es: "Español",
	};

	return (
		<nav className="bg-[#E9E7F9] p-4 z-50">
			<div className="container mx-auto flex justify-between items-center relative">
				{/* Logo Section */}
				<div className="flex items-center">
					<Link to="/">
						<img
							src={logo}
							alt="CuponZ Logo"
							className="h-8 w-auto sm:h-10 mr-4"
						/>
						<span className="text-xl font-semibold hidden sm:inline"></span>
					</Link>
				</div>

				{/* Desktop Menu */}
				<ul className="hidden lg:flex space-x-6 text-[#25354C]">
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
						),
					)}
				</ul>

				{/* Right-aligned items */}
				<div className="flex items-center space-x-2 sm:space-x-4">
					{/* Search Bar (hidden on mobile) */}
					<div className="hidden sm:block w-48 lg:w-64">
						<SearchBarNav />
					</div>

					{/* Mobile Search Icon */}
					<button
						onClick={toggleSearch}
						className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none sm:hidden"
					>
						<CiSearch className="text-2xl" />
					</button>

					{/* Shopping Cart Icon */}
					{(!user || user.type === UserType.User) && (
						<Link to="/cart">
							<ShoppingCartIcon />
						</Link>
					)}

					{/* Language Selector */}
					<div className="relative">
						<button
							onClick={toggleLanguageDropdown}
							className="focus:outline-none"
						>
							<div className="group relative p-2 flex items-center justify-center">
								<MdLanguage className="text-2xl sm:text-3xl" />
								<span className="text-xs ml-1">
									{languageNames[language] || language}
								</span>{" "}
								<span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-900 transition-all duration-300"></span>
							</div>
						</button>
						{isLanguageDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
								{supportedLanguages.map((lang) => (
									<button
										key={lang}
										onClick={() => changeLanguage(lang)}
										className={`block w-full text-left px-4 py-2 text-sm ${
											lang === language
												? "bg-gray-100 font-semibold"
												: "text-gray-700 hover:bg-gray-100"
										}`}
									>
										{languageNames[lang] || lang}
									</button>
								))}
							</div>
						)}
					</div>

					{/* User Profile / Login Button */}
					{user ? (
						<div className="relative">
							<button
								onClick={toggleProfileDropdown}
								className="focus:outline-none"
							>
								<div className="group relative p-2 flex items-center justify-center">
									<CiUser className="text-2xl sm:text-3xl" />
									<span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-900 transition-all duration-300"></span>
								</div>
							</button>
							{isProfileDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
									<Link
										to="/profile"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										{t("Your Profile")}
									</Link>
									<Link
										to="/cart"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										{t("Cart")}
									</Link>
									<Link
										to="/settings"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										{t("Settings")}
									</Link>
									<button
										onClick={handleLoginLogout}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										{t("Logout")}
									</button>
								</div>
							)}
						</div>
					) : (
						<Link to="/login">
							<button
								onClick={handleLoginLogout}
								className="bg-[#FFC212] text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-purple-300 text-sm sm:text-base"
							>
								{t("Login")}
							</button>
						</Link>
					)}

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMobileMenu}
						className="lg:hidden p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
					>
						<CiMenuFries className="text-2xl sm:text-3xl" />
					</button>
				</div>
			</div>

			{/* Mobile Search Bar */}
			{isSearchOpen && (
				<div className="sm:hidden mt-4">
					<SearchBarNav />
				</div>
			)}

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<ul className="lg:hidden bg-[#E9E7F9] flex flex-col space-y-4 px-4 py-2 mt-4">
					{routes.map((route, index) =>
						route.path ? (
							<Link to={route.path} key={index} onClick={toggleMobileMenu}>
								<li className="hover:underline cursor-pointer">{route.name}</li>
							</Link>
						) : (
							<li
								key={index}
								className="hover:underline relative cursor-pointer"
								onClick={() => {
									route.onClick();
									toggleMobileMenu();
								}}
							>
								{route.name}
							</li>
						),
					)}
					{/* Language options in mobile menu */}
					{supportedLanguages.map((lang) => (
						<li
							key={lang}
							className={`hover:underline cursor-pointer ${
								lang === language ? "font-semibold" : ""
							}`}
							onClick={() => changeLanguage(lang)}
						>
							{lang}
						</li>
					))}
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
