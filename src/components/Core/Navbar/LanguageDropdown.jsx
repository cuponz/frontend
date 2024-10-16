import ReactCountryFlag from "react-country-flag";
import { MdExpandMore } from "react-icons/md";
import { languageFlags, languageNames } from "./menuItems.js";
import { useTranslations } from "@/store/languages";
import { useMemo, useCallback, useRef, useEffect } from "react";

const LanguageDropdown = ({ language, toggleMenuState, isOpen }) => {
	const { setLanguage, supportedLanguages } = useTranslations();
	const dropdownRef = useRef(null);

	const changeLanguage = (lng) => {
		setLanguage(lng);
		toggleMenuState("isLanguageDropdownOpen");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				toggleMenuState("isLanguageDropdownOpen");
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, toggleMenuState]);

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
		<div className="relative" ref={dropdownRef}>
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
