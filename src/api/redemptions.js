import { RedemptionState } from "../constants";
import { apiRequest } from "./base";

async function getRedemptionsByCouponId(couponId) {
  return apiRequest(`/api/redemption/coupon/${couponId}`, {
    errorMessage: "Getting Redemptions Failed",
  })
}

async function getRedemptionsByUserId() {
  return apiRequest(`/api/redemption/user`, {
    errorMessage: "Getting Redemptions Failed",
  })
}

async function getRedemptionsById(redemptionId) {
  return apiRequest(`/api/redemption/${redemptionId}`, {
    errorMessage: "Getting Redemption Failed",
  })
}

async function usingRedemptionById(redemptionId) {
  return apiRequest(`/api/redemption/${redemptionId}/state`, {
    errorMessage: "Updating Redemption Failed",
  })
}

async function redeemCoupon(userInfo) {
  return apiRequest(`/api/redemption`, {
    method: "POST",
    body: JSON.stringify(userInfo),
    errorMessage: "Creating Redemption Failed",
  })
}

export {
	getRedemptionsByCouponId,
	getRedemptionsByUserId,
	getRedemptionsById,
	usingRedemptionById,
  redeemCoupon,
}
