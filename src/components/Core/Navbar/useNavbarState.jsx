import { useState } from "react";
import { useIsCategoriesOpenStore } from "@/store/categories";

const useNavbarState = () => {
	const [menuState, setMenuState] = useState({
		isMobileMenuOpen: false,
		isProfileDropdownOpen: false,
		isSearchOpen: false,
		isLanguageDropdownOpen: false,
	});

	const [isCategoriesOpen, setIsCategoriesOpen] = useIsCategoriesOpenStore(
		(state) => [state.isCategoriesOpen, state.setIsCategoriesOpen]
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
