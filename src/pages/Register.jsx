import { useState } from "react";
import CouponImage1 from "@/assets/coupon1";
import CouponImage2 from "@/assets/coupon2";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { UserType, CountryListWithCode, Validators } from "../constants";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "../api/user";
import TogglePassword from "../components/Utils/TogglePassword";
import { useTranslations } from "../store/languages";
import ReCaptchaV3 from "@/components/Utils/ReCaptchaV3";

import Button from "@/components/Utils/Button";

/**
 * RegisterPage component renders a registration form for new users.
 * It includes form validation, reCAPTCHA verification, and handles user registration.
 *
 * @component
 * @example
 * return (
 *   <RegisterPage />
 * )
 *
 * @returns {JSX.Element} The rendered registration page component.
 *
 * @function
 * @name RegisterPage
 *
 * @description
 * The RegisterPage component manages the state of the registration form, including form data and errors.
 * It validates the form inputs, handles changes to the form fields, and submits the form data to the server.
 * On successful registration, it navigates the user to the login page.
 *
 * @property {Object} formData - The state object containing form data.
 * @property {string} formData.firstName - The user's first name.
 * @property {string} formData.lastName - The user's last name.
 * @property {string} formData.email - The user's email address.
 * @property {string} formData.phoneNumber - The user's phone number.
 * @property {string} formData.region - The user's region code.
 * @property {string} formData.password - The user's password.
 * @property {string} formData.confirmPassword - The user's password confirmation.
 * @property {string} formData.userType - The type of user (e.g., customer, admin).
 *
 * @property {Object} errors - The state object containing form validation errors.
 *
 * @property {function} handleChange - Handles changes to form input fields.
 * @param {Object} e - The event object.
 * @param {string} e.target.name - The name of the form field.
 * @param {string} e.target.value - The value of the form field.
 *
 * @property {function} handleReCaptchaVerify - Handles reCAPTCHA verification.
 * @param {string} token - The reCAPTCHA token.
 *
 * @property {function} validateForm - Validates the form inputs.
 * @returns {boolean} - Returns true if the form is valid, otherwise false.
 *
 * @property {function} handleSubmit - Handles form submission.
 * @param {Object} e - The event object.
 */
const RegisterPage = () => {
	const { t } = useTranslations();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		region: "AU",
		password: "",
		confirmPassword: "",
		userType: "",
	});

	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const registerMutation = useMutation({
		mutationKey: ["register"],
		mutationFn: userRegister,
		onSuccess: () => {
			toast.success("Register successful!");
			navigate("/login");
		},
		onError: (err) => {
			toast.error(`Register failed. ${err.message}`);
		},
	});

	const handleReCaptchaVerify = (token) => {
		const formattedPhone =
			formData.phoneNumber.trim() !== ""
				? Validators.formatPhoneNumber(formData.phoneNumber, formData.region)
				: null;

		const registerData = {
			name: formData.firstName.trim() + " " + formData.lastName.trim(),
			email: formData.email,
			phoneNumber: formattedPhone,
			password: formData.password,
			type: parseInt(formData.userType, 10),
		};

		registerMutation.mutate({ ...registerData, recaptchaToken: token });
	};

	const validateForm = () => {
		let formErrors = {};

		if (!Validators.isValidName(formData.firstName)) {
			formErrors.firstName = "First name should be at least 2 characters long";
		}
		if (!Validators.isValidName(formData.lastName)) {
			formErrors.lastName = "Last name should be at least 2 characters long";
		}
		if (!Validators.isValidEmail(formData.email)) {
			formErrors.email = "Please enter a valid email address";
		}
		if (!Validators.isValidPhoneNumber(formData.phoneNumber, formData.region)) {
			formErrors.phoneNumber =
				"Please enter a valid phone number or leave it blank";
		}
		if (!Validators.isValidPassword(formData.password)) {
			formErrors.password = "Password should be at least 8 characters long";
		}
		if (formData.password !== formData.confirmPassword) {
			formErrors.confirmPassword = "Passwords do not match";
		}
		if (!formData.userType) {
			formErrors.userType = "Please select a user type";
		}

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			await window.executeReCaptcha("register");
		} else {
			toast.error("Please correct the errors in the form");
		}
	};

	return (
		<div className="h-screen bg-gradient-to-br from-[#7766C6] to-[#E0DFFD] relative flex items-center justify-center">
			<div className="bg-white w-full max-w-5xl rounded-lg shadow-lg flex overflow-hidden">
				{/* Left Section */}
				<div className="hidden lg:flex lg:flex-col lg:justify-between w-2/5 bg-gradient-to-tr from-purple-400 via-purple-600 to-purple-800 p-8 text-white relative">
					<div className="flex flex-col items-start">
						<h1 className="text-4xl font-bold mb-2">
							{t(["register", "title"])}
						</h1>
						<p className="mb-6 text-lg">{t(["register", "quote"])}</p>
						<img
							src={CouponImage2}
							alt="Coupon Graphic"
							className="w-40 transform rotate-[-15deg] mb-8"
						/>
					</div>
					<div className="absolute bottom-8 left-0 flex justify-center w-full">
						<img
							src={CouponImage1}
							alt="Discount Coupon"
							className="w-80 transform rotate-[-10deg]"
						/>
					</div>
				</div>

				{/* Right Section */}
				<div className="w-full lg:w-3/5 p-12 bg-white rounded-tl-[1-0px]">
					<h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
						{t(["register", "form", "title"])}
					</h2>
					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
							<div>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									placeholder={t(["register", "form", "fname"])}
									className="p-3 border border-gray-300 rounded w-full"
									required
								/>
								{errors.firstName && (
									<p className="text-red-500 text-sm mt-1">
										{errors.firstName}
									</p>
								)}
							</div>
							<div>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									placeholder={t(["register", "form", "lname"])}
									className="p-3 border border-gray-300 rounded w-full"
									required
								/>
								{errors.lastName && (
									<p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
								)}
							</div>
						</div>
						<div className="mb-4">
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder={t(["register", "form", "email"])}
								className="w-full p-3 border border-gray-300 rounded"
								required
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">{errors.email}</p>
							)}
						</div>
						<div className="mb-4">
							<div className="flex">
								<select
									name="region"
									value={formData.region}
									onChange={handleChange}
									className="w-1/3 p-3 border border-gray-300 rounded-l"
								>
									{CountryListWithCode.map((country) => (
										<option key={country.code} value={country.code}>
											{country.name} ({country.callingCode})
										</option>
									))}
								</select>
								<input
									type="tel"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									placeholder={t(["register", "form", "phoneNumber"])}
									className="w-2/3 p-3 border border-gray-300 rounded-r"
								/>
							</div>
							{errors.phoneNumber && (
								<p className="text-red-500 text-sm mt-1">
									{errors.phoneNumber}
								</p>
							)}
							<p className="text-gray-500 text-xs mt-1">
								{t(["register", "form", "miniNote"])}
							</p>
						</div>
						<TogglePassword
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder={t(["register", "form", "password"])}
							error={errors.password}
						/>
						<TogglePassword
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder={t(["register", "form", "reconfirmPassword"])}
							error={errors.confirmPassword}
						/>
						<div className="mb-6">
							<select
								name="userType"
								value={formData.userType}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded"
								required
							>
								<option value="">
									{t(["register", "form", "select", "title"])}
								</option>
								{Object.entries(UserType).map(
									([key, value]) =>
										key !== "Manager" && (
											<option key={value} value={value}>
												{key}
											</option>
										),
								)}
							</select>
							{errors.userType && (
								<p className="text-red-500 text-sm mt-1">{errors.userType}</p>
							)}
						</div>
						<Button
							type="submit"
							colour="yellow-500"
							className="w-full p-3"
							isLoading={registerMutation.isPending}
						>
							{t(["register", "form", "button"])}
						</Button>
					</form>
					<div className="mt-4 text-center">
						<p>
							{t(["register", "form", "registerQuote"])}{" "}
							<Link to="/login" className="text-blue-500 hover:underline">
								{t(["register", "form", "registerLink"])}
							</Link>
						</p>
					</div>
				</div>
			</div>
			<ReCaptchaV3 onVerify={handleReCaptchaVerify} />
		</div>
	);
};

export default RegisterPage;
