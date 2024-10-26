import { useState, useRef, useEffect } from "react";
import { Validators, CountryListWithCode } from "../../constants";
import { useTranslations } from "../../store/languages";

import Button from "@/components/Utils/Button";

/**
 * ChangeNameModal component renders a modal for changing the user's name.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {function} props.onClose - Function to call when the modal is closed.
 * @param {function} props.onSubmit - Function to call when the form is submitted.
 * @param {string} props.currentName - The current name of the user.
 *
 * @returns {JSX.Element|null} The rendered modal component or null if not open.
 */
const ChangeNameModal = ({ isOpen, onClose, onSubmit, currentName }) => {
	const { t } = useTranslations();
	const [newName, setNewName] = useState("");
	const [error, setError] = useState("");
	const modalRef = useRef();

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		onSubmit(newName);
	};

	if (!isOpen) return null;

	const inputClasses =
		"w-full rounded-md sm:text-sm border-2 border-gray-300 focus:border-[#E0DFFE] focus:ring focus:ring-[#E0DFFE] focus:ring-opacity-50 px-3 py-2 mb-4";

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full"
			>
				<h2 className="text-xl font-bold mb-4">
					{t(["changeNameModal", "title"])}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changeNameModal", "change"])}
						</label>
						<input
							type="tel"
							id="name"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					<Button type="submit" colour="blue-500">
						{t(["changeNameModal", "changeNameBtn"])}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ChangeNameModal;
