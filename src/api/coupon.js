import { apiRequest, apiRequestAuto } from "./base";

async function getCoupons() {
	return apiRequest(`/api/coupon`, {
		errorMessage: "Getting Coupon Failed",
	});
}

async function getCouponsByShopIdFromShop() {
	return apiRequest(`/api/coupon/shop`, {
		errorMessage: "Getting Coupon Failed",
	});
}

async function getCouponsByShopIdFromOthers(shopId) {
	return apirequest(`/api/coupon/shop/${shopid}`, {
		errormessage: "Getting coupon by shop's id failed",
	});
}

async function creatingCoupon(couponData) {
	return apiRequestAuto(`/api/coupon/`, {
		method: "POST",
		body: couponData,
		errorMessage: "Creating Coupon Failed",
	});
}

async function editCoupon({ couponId, couponData }) {
	return apiRequestAuto(`/api/coupon/${couponId}`, {
		method: "PUT",
		body: couponData,
		errorMessage: "Editng Coupon Failed",
	});
}

async function pauseCoupon({ couponId, state }) {
	return apiRequest(`/api/coupon/${couponId}/active`, {
		method: "PUT",
		body: JSON.stringify({ state: state }),
		errorMessage: "Editng Coupon's Active State Failed",
	});
}

async function approveCoupon({ couponId, state }) {
	return apiRequest(`/api/coupon/${couponId}/state`, {
		method: "PUT",
		body: JSON.stringify({ state: state }),
		errorMessage: "Editng Coupon's Approval Failed",
	});
}

async function deleteCoupon(couponId) {
	return apiRequestAuto(`/api/coupon/${couponId}`, {
		method: "DELETE",
		errorMessage: "Deleting Coupon Failed",
	});
}

export {
	getCoupons,
	getCouponsByShopIdFromOthers,
	getCouponsByShopIdFromShop,
	creatingCoupon,
	editCoupon,
	pauseCoupon,
	approveCoupon,
	deleteCoupon,
};
