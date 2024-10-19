import { useState, useRef, useEffect } from "react";
import OTPInput from "./OTPInput";
import { useTranslations } from "@/store/languages";

import Button from "@/components/Utils/Button";
import { useMutation } from "@tanstack/react-query";
import { validateOtp, sendOtp } from "@/api/otp";
import { toast } from "sonner";

const OTPModal = ({ isOpen, onClose, onVerify, email }) => {
	const { t } = useTranslations();
	const [error, setError] = useState("");
	const modalRef = useRef();
	const [otpValue, setOtpValue] = useState("");
	const [resendCooldown, setResendCooldown] = useState(60);

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

	const resendOtpMutation = useMutation({
		mutationFn: sendOtp,
		onSuccess: () => {
			toast.success("OTP resent successfully")
			setResendCooldown(60);
		},
		onError: (error) => {
			toast.error("Failed to send OTP. Please try again.")
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

	useEffect(() => {
		let timer;
		if (isOpen && resendCooldown > 0) {
			timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
		}
		return () => clearTimeout(timer);
	}, [resendCooldown, isOpen]);

	// Reset cooldown when modal opens
	useEffect(() => {
		if (isOpen) {
			setResendCooldown(60);
		}
	}, [isOpen]);

	const handleOTPComplete = () => {
		if (validateOtpMutation.isPending) {
			return;
		}

		setError("");
		validateOtpMutation.mutate({ email, otp: otpValue });
	};

	const handleResendOTP = () => {
		if (resendCooldown > 0 || resendOtpMutation.isPending) {
			return;
		}

		resendOtpMutation.mutate(email);
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
					length={9} //change length of input
					onComplete={handleOTPComplete}
					value={otpValue}
					onChange={setOtpValue}
				/>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				<div className="mt-4 flex justify-between items-center">
					<Button
						colour="blue-500"
						className="text-sm font-medium"
						onClick={onClose}
						disabled={validateOtpMutation.isPending}
						isLoading={validateOtpMutation.isPending}
					>
						{t(["changeEmailModal", "OTP", "cancelBtn"])}
					</Button>
					<Button
						colour="blue-500"
						className="text-sm font-medium"
						onClick={handleResendOTP}
						disabled={resendCooldown > 0 || resendOtpMutation.isPending}
						isLoading={resendOtpMutation.isPending}
					>
						{resendCooldown > 0
							? `Resend OTP (${resendCooldown}s)`
							: "Resend OTP"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OTPModal;
