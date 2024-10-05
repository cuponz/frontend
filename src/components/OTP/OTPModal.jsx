import { useState, useRef, useEffect } from "react";
import OTPInput from "./OTPInput";
import Popup from "./Popup";

const OTPModal = ({ isOpen, onClose, onVerify, email, onChangeEmail }) => {
	const [error, setError] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const [popup, setPopup] = useState(null);
	const modalRef = useRef();
	const [otpValue, setOtpValue] = useState("");

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target) &&
				!event.target.closest(".modal-content")
			) {
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

	const handleOTPComplete = (otp) => {
		if (isVerifying) return;

		setOtpValue(otp);
		setError("");
		setIsVerifying(true);

		setTimeout(() => {
			setIsVerifying(false);
			if (otp === "123456") {
				onVerify(true);
				onClose();
			} else {
				setError("Invalid OTP. Please try again.");
				onVerify(false);
				setOtpValue("");
			}
		}, 2000);
	};

	const handleChangeEmail = () => {
		onChangeEmail();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full modal-content"
			>
				<h2 className="text-xl font-bold mb-4">Verify Email</h2>
				<p className="mb-2">Please enter the OTP sent to:</p>
				<p className="mb-4 font-semibold">{email}</p>
				<OTPInput
					length={6}
					onComplete={handleOTPComplete}
					value={otpValue}
					onChange={setOtpValue}
				/>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				{isVerifying && (
					<div className="mt-4 flex items-center justify-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
						<span className="ml-2">Verifying...</span>
					</div>
				)}
				<div className="mt-4 flex justify-between">
					<button
						className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						onClick={handleChangeEmail}
						disabled={isVerifying}
					>
						Change Email
					</button>
					<button
						className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-[#E0DFFE] hover:bg-[#D0CFFE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E0DFFE]"
						onClick={onClose}
						disabled={isVerifying}
					>
						Cancel
					</button>
				</div>
			</div>
			{popup && (
				<Popup
					message={popup.message}
					type={popup.type}
					onClose={() => setPopup(null)}
				/>
			)}
		</div>
	);
};

export default OTPModal;
