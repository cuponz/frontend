import { apiRequest } from "./base";

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
  return apiRequest(`/api/coupon/`, {
    method: "POST",
    body: JSON.stringify(couponData),
    errorMessage: "Creating Coupon Failed",
  });
}

export {
	getCoupons,
	getCouponsByShopIdFromOthers,
	getCouponsByShopIdFromShop,
	creatingCoupon,
}
