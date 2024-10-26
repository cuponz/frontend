import { useState } from "react";
import { useIsCategoriesOpenStore } from "@/store/categories";

/**
 * Custom hook to manage the state of the Navbar component.
 *
 * @returns {Array} An array containing:
 * - `menuState` {Object}: The state object for various menu elements.
 * - `setMenuState` {Function}: Function to update the `menuState`.
 * - `toggleMenuState` {Function}: Function to toggle a specific menu state by key.
 * - `closeAllMenus` {Function}: Function to close all menus.
 * - `toggleCategoriesOpen` {Function}: Function to toggle the categories open state.
 * - `isCategoriesOpen` {boolean}: Boolean indicating if the categories are open.
 */
const useNavbarState = () => {
	const [menuState, setMenuState] = useState({
		isMobileMenuOpen: false,
		isProfileDropdownOpen: false,
		isSearchOpen: false,
		isLanguageDropdownOpen: false,
	});

	const [isCategoriesOpen, setIsCategoriesOpen] = useIsCategoriesOpenStore(
		(state) => [state.isCategoriesOpen, state.setIsCategoriesOpen],
	);

	const toggleMenuState = (key) =>
		setMenuState((prev) => ({ ...prev, [key]: !prev[key] }));

	const closeAllMenus = () =>
		setMenuState({
			isMobileMenuOpen: false,
			isProfileDropdownOpen: false,
			isSearchOpen: false,
			isLanguageDropdownOpen: false,
		});

	const toggleCategoriesOpen = () => setIsCategoriesOpen(!isCategoriesOpen);

	return [
		menuState,
		setMenuState,
		toggleMenuState,
		closeAllMenus,
		toggleCategoriesOpen,
		isCategoriesOpen,
	];
};

export default useNavbarState;
