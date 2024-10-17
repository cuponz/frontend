import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { useTranslations } from "@/store/languages";
import { useRef, useEffect } from "react";

const ProfileDropdown = ({ toggleMenuState, handleLoginLogout, isOpen }) => {
	const { t } = useTranslations();
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				toggleMenuState("isProfileDropdownOpen");
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, toggleMenuState]);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => toggleMenuState("isProfileDropdownOpen")}
				className="focus:outline-none"
			>
				<div className="group relative p-2 flex items-center justify-center">
					<CiUser className="text-2xl sm:text-3xl" />
					<span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-900 transition-all duration-300"></span>
				</div>
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
					<Link
						to="/profile"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						{t(["navigation", "userActions", "yourProfile"])}
					</Link>
					<Link
						to="/cart"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						{t(["navigation", "userActions", "cart"])}
					</Link>
					<button
						onClick={handleLoginLogout}
						className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						{t(["navigation", "userActions", "logout"])}
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileDropdown;
