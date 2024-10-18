import { useState, useRef, useEffect } from "react";
import { Validators } from "../../constants";
import OTPModal from "../OTP/OTPModal";
import { useTranslations } from "../../store/languages";
import { sendOtp } from "@/api/otp";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/Utils/Button";
import { toast } from "sonner";

const ChangeEmailModal = ({ isOpen, onClose, onSubmit, currentEmail }) => {
	const { t } = useTranslations();
	const [newEmail, setNewEmail] = useState("");
	const [error, setError] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [showOTPModal, setShowOTPModal] = useState(false);
	const modalRef = useRef();
	const [verifyCooldown, setVerifyCooldown] = useState(0);

	const sendOtpMutation = useMutation({
		mutationFn: sendOtp,
		onSuccess: () => {
			toast.success("OTP sent successfully.");
			setVerifyCooldown(300);
		},
		onError: (error) => {
			toast.error("Failed to send OTP. Please try again.");
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
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
			document.body.style.overflow = "visible";
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		let timer;
		if (verifyCooldown > 0) {
			timer = setTimeout(() => setVerifyCooldown((prev) => prev - 1), 1000);
		}
		return () => clearTimeout(timer);
	}, [verifyCooldown]);

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
			toast.success("Email verified successfully!");
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
		toast.success("Email changed successfully!");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
			<div
				ref={modalRef}
				className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 modal-content relative"
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
					aria-label="Close"
				>
					×
				</button>
				<h2 className="text-2xl font-bold mb-6 text-center">
					{t(["changeEmailModal", "title"])}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="newEmail"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							{t(["changeEmailModal", "newEmail"])}
						</label>
						<div className="flex flex-col sm:flex-row gap-2">
							<input
								type="email"
								id="newEmail"
								value={newEmail}
								onChange={(e) => {
									setNewEmail(e.target.value);
									setIsVerified(false);
								}}
								className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								required
							/>
							<Button
								colour="blue-500"
								disabled={
									isVerified || verifyCooldown > 0 || sendOtpMutation.isPending
								}
								onClick={handleVerify}
								isLoading={sendOtpMutation.isPending}
								className="w-full sm:w-auto whitespace-nowrap"
							>
								{isVerified
									? t(["changeEmailModal", "verified"])
									: verifyCooldown > 0
										? `Verify (${verifyCooldown}s)`
										: t(["changeEmailModal", "verify"])}
							</Button>
						</div>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					{isVerified && (
						<p className="text-green-500 text-sm">
							{t(["changeEmailModal", "successnoti"])}
						</p>
					)}
					<Button
						colour="blue-500"
						disabled={!isVerified}
						type="submit"
						className="w-full"
					>
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
					initialCooldown={verifyCooldown}
				/>
			)}
		</div>
	);
};

export default ChangeEmailModal;
