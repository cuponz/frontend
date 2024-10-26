import { useEffect } from "react";

/**
 * Popup component to display a temporary message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to display in the popup.
 * @param {string} props.type - The type of the message, which determines the background color. Can be "success" or "error".
 * @param {Function} props.onClose - The function to call when the popup should be closed.
 *
 * @returns {JSX.Element} The rendered Popup component.
 */
const Popup = ({ message, type, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 2000);

		return () => clearTimeout(timer);
	}, [onClose]);

	const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

	return (
		<div
			className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-md`}
		>
			{message}
		</div>
	);
};

export default Popup;
