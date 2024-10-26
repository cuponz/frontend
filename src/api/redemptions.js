import { RedemptionState } from "../constants";
import { apiRequest } from "./base";

async function getRedemptionsByCouponId(couponId) {
	return apiRequest(`/api/redemption/coupon/${couponId}`, {
		errorMessage: "Getting Redemptions Failed",
	});
}

async function getRedemptionsByUserId() {
	return apiRequest(`/api/redemption/user`, {
		errorMessage: "Getting Redemptions Failed",
	});
}

async function getRedemptionsById(redemptionId) {
	return apiRequest(`/api/redemption/${redemptionId}`, {
		errorMessage: "Getting Redemption Failed",
	});
}

/**
 * Updates the state of a redemption to "Used" by its ID.
 *
 * @param {string} redemptionId - The ID of the redemption to update.
 * @returns {Promise<Object>} The response from the API request.
 * @throws Will throw an error if the API request fails.
 */
async function usingRedemptionById(redemptionId) {
	return apiRequest(`/api/redemption/${redemptionId}/state`, {
		method: "PATCH",
		body: JSON.stringify({ state: RedemptionState.Used }),
		errorMessage: "Updating Redemption Failed",
	});
}

async function redeemCoupon(userInfo) {
	return apiRequest(`/api/redemption`, {
		method: "POST",
		body: JSON.stringify(userInfo),
		errorMessage: "Creating Redemption Failed",
	});
}

export {
	getRedemptionsByCouponId,
	getRedemptionsByUserId,
	getRedemptionsById,
	usingRedemptionById,
	redeemCoupon,
};
