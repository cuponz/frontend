import { useState, useRef, useEffect } from "react";
import { Validators } from "../constants";
import OTPModal from "../components/OTP/OTPModal";
import Popup from "../components/OTP/Popup";

const ChangeEmailModal = ({ isOpen, onClose, onSubmit, currentEmail }) => {
	const [newEmail, setNewEmail] = useState("");
	const [error, setError] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [showOTPModal, setShowOTPModal] = useState(false);
	const [popup, setPopup] = useState(null);
	const modalRef = useRef();

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

	const handleVerify = () => {
		setError("");

		if (!Validators.isValidEmail(newEmail)) {
			setError("Please enter a valid email address.");
			return;
		}

		if (newEmail === currentEmail) {
			setError("New email is the same as the current email.");
			return;
		}

		setShowOTPModal(true);
	};

	const handleOTPVerify = (success) => {
		if (success) {
			setIsVerified(true);
			setError("");
			setShowOTPModal(false);
			setPopup({ message: "Email verified successfully!", type: "success" });
		}
	};

	const handleChangeEmail = () => {
		setShowOTPModal(false);
		setIsVerified(false);
		setNewEmail("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isVerified) {
			setError("Please verify your email first.");
			return;
		}

		onSubmit(newEmail);
		setPopup({ message: "Email changed successfully!", type: "success" });
		setTimeout(() => {
			onClose();
		}, 2000);
	};

	if (!isOpen) return null;

	const inputClasses =
		"w-full rounded-l-md sm:text-sm border-2 border-gray-300 focus:border-[#E0DFFE] focus:ring focus:ring-[#E0DFFE] focus:ring-opacity-50 px-3 py-2";
	const buttonClasses =
		"w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-[#E0DFFE] hover:bg-[#D0CFFE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E0DFFE]";
	const verifyButtonClasses =
		"px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-gray-700 bg-[#E0DFFE] hover:bg-[#D0CFFE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E0DFFE]";

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full modal-content"
			>
				<h2 className="text-xl font-bold mb-4">Change Email</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="newEmail"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							New Email
						</label>
						<div className="flex">
							<input
								type="email"
								id="newEmail"
								value={newEmail}
								onChange={(e) => {
									setNewEmail(e.target.value);
									setIsVerified(false);
								}}
								className={inputClasses}
								required
							/>
							<button
								type="button"
								onClick={handleVerify}
								className={verifyButtonClasses}
								disabled={isVerified}
							>
								{isVerified ? "Verified" : "Verify"}
							</button>
						</div>
					</div>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					{isVerified && (
						<p className="text-green-500 text-sm mb-4">
							Email verified successfully!
						</p>
					)}
					<button
						type="submit"
						className={buttonClasses}
						disabled={!isVerified}
					>
						Change Email
					</button>
				</form>
			</div>
			{showOTPModal && (
				<OTPModal
					isOpen={showOTPModal}
					onClose={() => setShowOTPModal(false)}
					onVerify={handleOTPVerify}
					email={newEmail}
					onChangeEmail={handleChangeEmail}
				/>
			)}
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

export default ChangeEmailModal;
