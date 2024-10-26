import { apiRequest } from "./base";

export async function sendOtp(userEmail) {
	return apiRequest(`/api/otp/send`, {
		method: "POST",
		body: JSON.stringify({ email: userEmail }),
		errorMessage: "Sending OTP Failed",
	});
}

/**
 * Validates the OTP (One-Time Password) for a given email.
 *
 * @param {Object} params - The parameters for the OTP validation.
 * @param {string} params.email - The email address to validate the OTP for.
 * @param {string} params.otp - The OTP to be validated.
 * @returns {Promise<Object>} The response from the API request.
 * @throws Will throw an error if the API request fails.
 */
export async function validateOtp({ email, otp }) {
	return apiRequest(`/api/otp/validate`, {
		method: "POST",
		body: JSON.stringify({ email, otp }),
		errorMessage: "Validating OTP Failed",
	});
}
