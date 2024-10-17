import { useState, useRef, useEffect } from "react";
import { Validators } from "../../constants";
import OTPModal from "../OTP/OTPModal";
import Popup from "../OTP/Popup";
import { useTranslations } from "../../store/languages";

import { sendOtp } from "@/api/otp";
import { useMutation } from "@tanstack/react-query";

import Button from "@/components/Utils/Button";

const ChangeEmailModal = ({ isOpen, onClose, onSubmit, currentEmail }) => {
	const { t } = useTranslations();
	const [newEmail, setNewEmail] = useState("");
	const [error, setError] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [showOTPModal, setShowOTPModal] = useState(false);
	const [popup, setPopup] = useState(null);
	const modalRef = useRef();

	const sendOtpMutation = useMutation({
		mutationFn: sendOtp,
		onSuccess: () => {
			setPopup({ message: "OTP sent successfully.", type: "success" });
		},
		onError: (error) => {
			setPopup({
				message: "Failed to send OTP. Please try again.",
				type: "error",
			});
		},
	});

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

		sendOtpMutation.mutate(newEmail);
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
	};

	if (!isOpen) return null;

	const inputClasses =
		"w-full rounded-l-md sm:text-sm border-2 border-gray-300 focus:border-[#E0DFFE] focus:ring focus:ring-[#E0DFFE] focus:ring-opacity-50 px-3 py-2";

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full modal-content"
			>
				<h2 className="text-xl font-bold mb-4">
					{t(["changeEmailModal", "title"])}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="newEmail"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changeEmailModal", "newEmail"])}
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
							<Button
								colour="blue-500"
								disabled={isVerified}
								onClick={handleVerify}
								isLoading={sendOtpMutation.isPending}
							>
								{isVerified
									? t(["changeEmailModal", "verified"])
									: t(["changeEmailModal", "verify"])}
							</Button>
						</div>
					</div>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					{isVerified && (
						<p className="text-green-500 text-sm mb-4">
							{t(["changeEmailModal", "successnoti"])}
						</p>
					)}
					<Button colour="blue-500" disabled={!isVerified} type="submit">
						{t(["changeEmailModal", "changeEmailBtn"])}
					</Button>
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
