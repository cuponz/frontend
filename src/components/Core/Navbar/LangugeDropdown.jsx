import ReactCountryFlag from "react-country-flag";
import { MdExpandMore } from "react-icons/md";
import { languageFlags, languageNames } from "./menuItems.js";
import { useTranslations } from "@/store/languages";

const LanguageDropdown = ({ language, toggleMenuState, isOpen }) => {
	const { setLanguage, supportedLanguages } = useTranslations();

	const changeLanguage = (lng) => {
		setLanguage(lng);
		toggleMenuState("isLanguageDropdownOpen");
	};

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
					{supportedLanguages.map((lang) => (
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
								style={{
									width: "1.5em",
									height: "1.5em",
								}}
								title={languageFlags[lang]}
							/>
							<span className="ml-2">{languageNames[lang] || lang}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageDropdown;
