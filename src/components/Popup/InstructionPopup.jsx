import { useState, useEffect } from "react";
import { useTranslations } from "@/store/languages";

/**
 * InstructionPopup component displays a popup with instructions for the user.
 * The popup is shown only on the first visit unless the user opts to not show it again.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - Function to call when the popup is closed.
 *
 * @example
 * <InstructionPopup onClose={handleClose} />
 */
const InstructionPopup = ({ onClose }) => {
	const { t } = useTranslations();
	const [dontShowAgain, setDontShowAgain] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const isFirstVisit = localStorage.getItem("isFirstVisit") !== "false";
		if (!isFirstVisit) {
			onClose();
		} else {
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [onClose]);

	const handlePopupClose = () => {
		if (dontShowAgain) {
			localStorage.setItem("isFirstVisit", "false");
		}
		setIsVisible(false);
		setTimeout(onClose, 300);
	};

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className={`bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 transform transition-transform duration-300 ${
					isVisible ? "scale-100" : "scale-95"
				}`}
			>
				<h2 className="text-xl font-semibold mb-4">
					{t(["InstructionPopUp", "welcome"])}
				</h2>
				<p className="mb-4 whitespace-pre-line">
					{t(["InstructionPopUp", "content"])}
				</p>
				<div className="flex items-center justify-between">
					<label className="flex items-center">
						<input
							type="checkbox"
							checked={dontShowAgain}
							onChange={() => setDontShowAgain(!dontShowAgain)}
							className="mr-2"
						/>
						<span className="text-sm">
							{t(["InstructionPopUp", "showOneTime"])}
						</span>
					</label>
					<button
						onClick={handlePopupClose}
						className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
					>
						{t(["InstructionPopUp", "understood"])}
					</button>
				</div>
			</div>
		</div>
	);
};

export default InstructionPopup;
