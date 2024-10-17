import { useState, useRef, useEffect } from "react";
import OTPInput from "./OTPInput";
import Popup from "./Popup";
import { useTranslations } from "@/store/languages";

import Button from "@/components/Utils/Button";
import { useMutation } from "@tanstack/react-query";
import { validateOtp } from "@/api/otp";

const OTPModal = ({ isOpen, onClose, onVerify, email }) => {
	const { t } = useTranslations();
	const [error, setError] = useState("");
	const [popup, setPopup] = useState(null);
	const modalRef = useRef();
	const [otpValue, setOtpValue] = useState("");

	const validateOtpMutation = useMutation({
		mutationFn: validateOtp,
		onSuccess: () => {
			onVerify(true);
			onClose();
		},
		onError: (error) => {
			setError("Invalid OTP. Please try again.");
			onVerify(false);
			setOtpValue("");
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

	const handleOTPComplete = () => {
		if (validateOtpMutation.isPending) {
			return;
		}

		setError("");
		validateOtpMutation.mutate({ email, otp: otpValue });
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full modal-content"
			>
				<h2 className="text-xl font-bold mb-4">
					{t(["changeEmailModal", "OTP", "title"])}
				</h2>
				<p className="mb-2">{t(["changeEmailModal", "OTP", "quote"])}</p>
				<p className="mb-4 font-semibold">{email}</p>
				<OTPInput
					length={6}
					onComplete={handleOTPComplete}
					value={otpValue}
					onChange={setOtpValue}
				/>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				<div className="mt-4 flex justify-between">
					<Button
						colour="blue-500"
						className="text-sm font-medium"
						onClick={onClose}
						disabled={validateOtpMutation.isPending}
						isLoading={validateOtpMutation.isPending}
					>
						{t(["changeEmailModal", "OTP", "cancelBtn"])}
					</Button>
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
