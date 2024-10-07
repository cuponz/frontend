import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const PopupThankYou = ({ isOpen, onClose }) => {
	const [dontShowAgain, setDontShowAgain] = useState(false);

	if (!isOpen) return null;

	const handleClose = () => {
		onClose(dontShowAgain);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
			<div className="bg-[#8475CA] text-white p-6 w-full max-w-md relative min-h-[60vh] flex flex-col border border-white border-4">
				<button
					onClick={handleClose}
					className="absolute top-2 left-2 text-white hover:text-gray-300"
					aria-label="Close"
				>
					<IoIosClose className="text-4xl text-white m-2" />
				</button>
				<div className="flex-grow mt-2">
					<h2 className="text-2xl font-bold mb-4 mt-8">
						Thank You for Adding your Product to CuponZ
					</h2>
					<p className="mb-4">
						You will not see your product right away after uploading.
					</p>
					<p className="mb-6">
						Thank you for being patient while waiting for our admin to approve
						your product.
					</p>
					<label className="flex items-center mb-6">
						<input
							type="checkbox"
							checked={dontShowAgain}
							onChange={() => setDontShowAgain(!dontShowAgain)}
							className="mr-2"
						/>
						Do not show this again
					</label>
				</div>
				<div className="absolute bottom-0 right-0 m-4">
					<div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
					<div className="w-24 h-24 bg-pink-300 rounded-full -mt-12 -ml-12"></div>
				</div>
			</div>
		</div>
	);
};

export default PopupThankYou;
