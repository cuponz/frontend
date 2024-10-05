import { useEffect } from "react";

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
