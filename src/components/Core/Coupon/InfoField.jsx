import { useState, useEffect, useCallback } from "react";
import { CouponRequirementType, CountryListWithCode } from "../../../constants";
import { useMutation } from "@tanstack/react-query";
import { redeemCoupon } from "../../../api/redemptions";
import { toast } from "sonner";
import { useUserStore } from "../../../store/user";
import {
	parsePhoneNumberFromString,
	isValidPhoneNumber,
} from "libphonenumber-js";
import validator from "validator";

import ReCaptchaV3 from "@/components/Utils/ReCaptchaV3";

const InfoField = ({ onClose, coupon, onRedeem }) => {
	const [formData, setFormData] = useState({
		email: "",
		phone: "",
		region: "AU",
	});
	const [errors, setErrors] = useState({
		email: false,
		phone: false,
	});
	const [isEmailDisabled, setIsEmailDisabled] = useState(false);
	const [showInfoField, setShowInfoField] = useState(true);

	const user = useUserStore((state) => state.user);

	useEffect(() => {
		if (
			coupon.requirement_type === CouponRequirementType.EmailAndPhoneNumber &&
			!user?.phone_number
		) {
			setIsEmailDisabled(true);
			setFormData((prevData) => ({
				...prevData,
				email: user?.email || "",
			}));
		}

		// Check if user has all required information
		const hasRequiredInfo = checkUserHasRequiredInfo();
		if (showInfoField && hasRequiredInfo) {
			setShowInfoField(false);
			handleDirectSubmit();
		}
	}, [coupon.requirement_type, user?.phone_number, user?.email]);

	const infoMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: redeemCoupon,
		onSuccess: () => {
			toast.success("Redeem successful!");
			onRedeem();
		},
		onError: (err) => {
			console.error("Redemption error:", err);
			toast.error(`Redeem failed. ${err.message || "Please try again."}`);
		},
	});

	const showEmailField =
		coupon.requirement_type !== CouponRequirementType.PhoneNumber;
	const showPhoneField =
		coupon.requirement_type !== CouponRequirementType.Email;

	const isEmailRequired = [
		CouponRequirementType.Email,
		CouponRequirementType.EmailAndPhoneNumber,
	].includes(coupon.requirement_type);
	const isPhoneRequired = [
		CouponRequirementType.PhoneNumber,
		CouponRequirementType.EmailAndPhoneNumber,
	].includes(coupon.requirement_type);
	const isEmailOrPhoneRequired =
		coupon.requirement_type === CouponRequirementType.EmailOrPhoneNumber;

	const checkUserHasRequiredInfo = () => {
		switch (coupon.requirement_type) {
			case CouponRequirementType.Email:
				return !!user?.email;
			case CouponRequirementType.PhoneNumber:
				return !!user?.phone_number;
			case CouponRequirementType.EmailAndPhoneNumber:
				return !!user?.email && !!user?.phone_number;
			case CouponRequirementType.EmailOrPhoneNumber:
				return !!user?.email || !!user?.phone_number;
			default:
				return false;
		}
	};

	const handleReCaptchaVerify = (token) => (payload) => {
		infoMutation.mutate({ ...payload, recaptchaToken: token });
	};

	const submitRedemption = useCallback(async (payload) => {
		const executeReCaptcha = await window.executeReCaptcha("redeemCoupon");
		executeReCaptcha(payload);
	}, []);

	const handleDirectSubmit = async () => {
		const payload = {
			coupon_id: coupon.id,
			user_id: user?.id,
			user_email: user?.email,
			user_phone: user?.phone_number,
		};

		toast.info("Submitting payload directly:", payload);
    submitRedemption(payload);
	};

	const formatPhoneNumber = (phone, region) => {
		try {
			const parsedPhone = parsePhoneNumberFromString(phone, region);
			return parsedPhone && parsedPhone.isValid()
				? parsedPhone.format("E.164")
				: null;
		} catch (error) {
			console.error("Phone parsing error:", error);
			return null;
		}
	};

	const validateForm = () => {
		const newErrors = { email: false, phone: false };
		let hasError = false;

		if (
			showEmailField &&
			isEmailRequired &&
			(!formData.email || !validator.isEmail(formData.email))
		) {
			newErrors.email = true;
			hasError = true;
			toast.error("Invalid email format.");
		}

		if (showPhoneField && isPhoneRequired) {
			const isValidPhone = isValidPhoneNumber(formData.phone, formData.region);
			if (!isValidPhone) {
				newErrors.phone = true;
				hasError = true;
				toast.error("Invalid phone number format.");
			}
		}

		if (isEmailOrPhoneRequired && !formData.email && !formData.phone) {
			newErrors.email = true;
			newErrors.phone = true;
			hasError = true;
			toast.error("Please provide either an email or a phone number.");
		}

		setErrors(newErrors);
		return !hasError;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

    if (!showInfoField) {
      return;
    }

		const formattedPhone = formData.phone
			? formatPhoneNumber(formData.phone, formData.region)
			: undefined;

		const payload = {
			coupon_id: coupon.id,
			user_id: user?.id,
			user_email: formData.email || undefined,
			user_phone: formattedPhone || undefined,
		};

    submitRedemption(payload);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: false });
	};

	const handleClose = () => {
		setFormData({ email: "", phone: "", region: "AU" });
		setErrors({ email: false, phone: false });
		onClose();
	};

	if (!showInfoField) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
			aria-modal="true"
			role="dialog"
		>
			<div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<button
					onClick={handleClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
					aria-label="Close"
				>
					&times;
				</button>
				<h2 className="text-xl font-semibold mb-4 text-center">
					Please enter your details to redeem the coupon.
				</h2>
				<form onSubmit={handleSubmit}>
					{showEmailField && (
						<div className="mb-4">
							<input
								type="email"
								name="email"
								className={`w-full p-2 border ${
									errors.email ? "border-red-500" : "border-gray-300"
								} rounded ${isEmailDisabled ? "bg-gray-100" : ""}`}
								placeholder={isEmailDisabled ? user?.email : "Email"}
								value={isEmailDisabled ? user?.email : formData.email}
								onChange={handleChange}
								required={isEmailRequired}
								disabled={isEmailDisabled}
								readOnly={isEmailDisabled}
							/>
						</div>
					)}
					{showPhoneField && (
						<>
							<select
								name="region"
								value={formData.region}
								onChange={handleChange}
								className="w-full p-2 border mb-4"
							>
								{CountryListWithCode.map((country) => (
									<option key={country.code} value={country.code}>
										{country.name} ({country.callingCode})
									</option>
								))}
							</select>
							<input
								type="tel"
								name="phone"
								className={`w-full p-2 border ${
									errors.phone ? "border-red-500" : "border-gray-300"
								} rounded mb-4`}
								placeholder="Phone Number"
								value={formData.phone}
								onChange={handleChange}
								required={isPhoneRequired}
							/>
						</>
					)}
					<div className="flex justify-between gap-4">
						<button
							type="submit"
							className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
							disabled={infoMutation.isLoading}
						>
							{infoMutation.isLoading ? "Redeeming..." : "Redeem code"}
						</button>
					</div>
				</form>
			</div>
			<ReCaptchaV3 onVerify={handleReCaptchaVerify} />
		</div>
	);
};

export default InfoField;
