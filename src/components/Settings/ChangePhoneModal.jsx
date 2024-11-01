import { useState, useRef, useEffect } from "react";
import { Validators, CountryListWithCode } from "../../constants";
import { useTranslations } from "../../store/languages";

import Button from "@/components/Utils/Button";

/**
 * ChangePhoneModal component allows users to change their phone number.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {Function} props.onSubmit - Function to call when the form is submitted with the new phone number.
 * @param {string} props.currentPhoneNumber - The current phone number of the user.
 *
 * @returns {JSX.Element|null} The rendered component or null if the modal is not open.
 */
const ChangePhoneModal = ({
	isOpen,
	onClose,
	onSubmit,
	currentPhoneNumber,
}) => {
	const { t } = useTranslations();
	const [newPhoneNumber, setNewPhoneNumber] = useState("");
	const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("");
	const [selectedRegion, setSelectedRegion] = useState("AU"); // Default to Australia
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

		if (!Validators.isValidPhoneNumber(newPhoneNumber, selectedRegion)) {
			setError("Please enter a valid phone number for the selected region.");
			return;
		}

		if (newPhoneNumber !== confirmPhoneNumber) {
			setError("Phone numbers don't match!");
			return;
		}

		if (newPhoneNumber === currentPhoneNumber) {
			setError("New phone number is the same as the current phone number.");
			return;
		}

		const formattedPhoneNumber = Validators.formatPhoneNumber(
			newPhoneNumber,
			selectedRegion,
		);
		console.log("Submitting new phone number:", formattedPhoneNumber);
		onSubmit(formattedPhoneNumber);
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
					{t(["changePhoneModal", "title"])}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="region"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changePhoneModal", "region"])}
						</label>
						<select
							id="region"
							value={selectedRegion}
							onChange={(e) => setSelectedRegion(e.target.value)}
							className={inputClasses}
						>
							{CountryListWithCode.map((country) => (
								<option key={country.code} value={country.code}>
									{country.name} ({country.callingCode})
								</option>
							))}
						</select>
					</div>
					<div className="mb-4">
						<label
							htmlFor="newPhoneNumber"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changePhoneModal", "newNumber"])}
						</label>
						<input
							type="tel"
							id="newPhoneNumber"
							value={newPhoneNumber}
							onChange={(e) => setNewPhoneNumber(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="confirmPhoneNumber"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changePhoneModal", "confirmNumber"])}
						</label>
						<input
							type="tel"
							id="confirmPhoneNumber"
							value={confirmPhoneNumber}
							onChange={(e) => setConfirmPhoneNumber(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					<Button type="submit" colour="blue-500">
						{t(["changePhoneModal", "changeNumBtn"])}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ChangePhoneModal;
