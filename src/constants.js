"use strict";

const UserType = Object.freeze({
	Manager: 0,
	Shop: 1,
	User: 2,
});

const ProfileTab = Object.freeze({
	Coupons: 0,
	Management: 1,
	Settings: 2,
	Details: 3,
});

const CouponCatalougeType = Object.freeze({
	All: 0,
	ShopManage: 1,
	ShopList: 2,
	User: 3,
})

const RedemptionState = Object.freeze({
	Redeemed: 0,
	Used: 1,
});

const CouponRequirementType = Object.freeze({
  Email: 0,
  PhoneNumber: 1,
  EmailOrPhoneNumber: 2,
  EmailAndPhoneNumber: 3,
});

const CouponCardModalType = Object.freeze({
  PopUp: 1,
  InfoField: 2,
});

export {
	UserType,
	ProfileTab,
	CouponCatalougeType,
	RedemptionState,
	CouponRequirementType,
	CouponCardModalType,
};