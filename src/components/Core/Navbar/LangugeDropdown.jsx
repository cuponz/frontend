import ReactCountryFlag from "react-country-flag";
import { MdExpandMore } from "react-icons/md";
import { languageFlags, languageNames } from "./menuItems.js";
import { useTranslations } from "@/store/languages";
import { useMemo, useCallback } from "react";

/**
 * LanguageDropdown component renders a dropdown menu for selecting languages.
 * It displays the current language with a flag and allows users to change the language.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.language - The currently selected language.
 * @param {function} props.toggleMenuState - Function to toggle the dropdown menu state.
 * @param {boolean} props.isOpen - Boolean indicating if the dropdown menu is open.
 * @returns {JSX.Element} The rendered LanguageDropdown component.
 */
const LanguageDropdown = ({ language, toggleMenuState, isOpen }) => {
	const { setLanguage, supportedLanguages } = useTranslations();

	const changeLanguage = (lng) => {
		setLanguage(lng);
		toggleMenuState("isLanguageDropdownOpen");
	};

	const renderFlagButton = useCallback(
		(lang) => (
			<button
				key={lang}
				onClick={() => changeLanguage(lang)}
				className={`block w-full text-left px-4 py-2 text-sm ${
					lang === language
						? "bg-gray-100 font-semibold"
						: "text-gray-700 hover:bg-gray-100"
				} flex items-center`}
			>
				<ReactCountryFlag
					countryCode={languageFlags[lang]}
					svg
					className="w-6 h-6"
					title={languageFlags[lang]}
				/>
				<span className="ml-2">{languageNames[lang] || lang}</span>
			</button>
		),
		[changeLanguage, language],
	);

	const memoizedSupportedLanguages = useMemo(
		() => supportedLanguages.map(renderFlagButton),
		[supportedLanguages, renderFlagButton],
	);

	return (
		<div className="relative">
			<button
				onClick={() => toggleMenuState("isLanguageDropdownOpen")}
				className="flex items-center space-x-1 focus:outline-none"
			>
				<ReactCountryFlag
					countryCode={languageFlags[language]}
					svg
					style={{
						width: "1.5em",
						height: "1.5em",
					}}
					title={languageFlags[language]}
				/>
				<MdExpandMore className="text-xl" />
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
					{memoizedSupportedLanguages}
				</div>
			)}
		</div>
	);
};

export default LanguageDropdown;
