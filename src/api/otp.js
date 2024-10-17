import { apiRequest } from "./base";

export async function sendOtp(userEmail) {
	return apiRequest(`/api/otp/send`, {
		method: "POST",
		body: JSON.stringify({ email: userEmail }),
		errorMessage: "Sending OTP Failed",
	});
}

export async function validateOtp({ email, otp }) {
	return apiRequest(`/api/otp/validate`, {
		method: "POST",
		body: JSON.stringify({ email, otp }),
		errorMessage: "Validating OTP Failed",
	});
}