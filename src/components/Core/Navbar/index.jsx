import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo";
import CategoriesMenu from "./CategoriesMenu";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SearchBarNav from "./SearchBarNav";
import { CiMenuFries, CiSearch } from "react-icons/ci";

import { useUserStore } from "@/store/user";
import { useCategoryStore } from "@/store/categories";
import { getCategories } from "@/api/category";
import { getGroups } from "@/api/group";

import { useQueries, useSuspenseQueries } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import { UserType } from "@/constants";
import { useTranslations } from "@/store/languages";
import useNavbarState from "./useNavbarState";
import LanguageDropdown from "./LanguageDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { getRoutes } from "./menuItems";
import Button from "@/components/Utils/Button";

const Navbar = () => {
	const { t, language } = useTranslations();
	const [user, logout] = useUserStore((state) => [state.user, state.logout]);
	const [categories, setCategories] = useCategoryStore((state) => [
		state.categories,
		state.setCategories,
	]);
	const categoriesButtonRef = useRef(null);
	const categoriesButtonMobileRef = useRef(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	const [
		menuState,
		setMenuState,
		toggleMenuState,
		closeAllMenus,
		toggleCategoriesOpen,
		isCategoriesOpen,
	] = useNavbarState();

	const location = useLocation();

	const {
		isPending,
		data: [fetchedCategories, groups],
	// } = useSuspenseQueries({
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
		closeAllMenus();
	}, [location]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleLoginLogout = () => {
		if (user) {
			logout();
		}
		closeAllMenus();
	};

	const routes = getRoutes(t);

	return (
		<nav className="bg-[#E9E7F9] p-4 z-50 shadow-md">
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
								ref={categoriesButtonRef}
								key={index}
								className="hover:underline relative cursor-pointer"
								onClick={toggleCategoriesOpen}
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
						onClick={() => toggleMenuState("isSearchOpen")}
						className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none sm:hidden"
					>
						<CiSearch className="text-2xl" />
					</button>

					{/* Shopping Cart Icon */}
					{(!user || user?.type === UserType.User) && (
						<Link to="/cart">
							<ShoppingCartIcon />
						</Link>
					)}

					<LanguageDropdown
						language={language}
						toggleMenuState={toggleMenuState}
						isOpen={menuState.isLanguageDropdownOpen}
					/>

					{/* User Profile / Login Button */}
					{user ? (
						<ProfileDropdown
							toggleMenuState={toggleMenuState}
							handleLoginLogout={handleLoginLogout}
							isOpen={menuState.isProfileDropdownOpen}
						/>
					) : (
						<Link to="/login">
							<Button onClick={handleLoginLogout} colour="yellow-500">
								{t(["navigation", "userActions", "login"])}
							</Button>
						</Link>
					)}

					{/* Mobile Menu Button */}
					<button
						onClick={() => toggleMenuState("isMobileMenuOpen")}
						className="lg:hidden p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
					>
						<CiMenuFries className="text-2xl sm:text-3xl" />
					</button>
				</div>
			</div>

			{/* Mobile Search Bar */}
			{menuState.isSearchOpen && (
				<div className="sm:hidden mt-4">
					<SearchBarNav />
				</div>
			)}

			{/* Mobile Menu */}
			{menuState.isMobileMenuOpen && (
				<ul className="lg:hidden bg-[#E9E7F9] flex flex-col space-y-4 px-4 py-2 mt-4">
					{routes.map((route, index) =>
						route.path ? (
							<Link
								to={route.path}
								key={index}
								onClick={() => toggleMenuState("isMobileMenuOpen")}
							>
								<li className="hover:underline cursor-pointer">{route.name}</li>
							</Link>
						) : (
							<li
								ref={categoriesButtonMobileRef}
								key={index}
								className="hover:underline relative cursor-pointer"
								onClick={() => {
									toggleCategoriesOpen();
									toggleMenuState("isMobileMenuOpen");
								}}
							>
								{route.name}
							</li>
						),
					)}
				</ul>
			)}

			{isCategoriesOpen &&
				(isPending ? (
					<LoadingSpinner />
				) : (
					<CategoriesMenu
						groups={groups}
						categories={categories}
						categoriesButtonRef={categoriesButtonRef}
						categoriesButtonMobileRef={categoriesButtonMobileRef}
						isMobile={isMobile}
					/>
				))}
		</nav>
	);
};

export default Navbar;
