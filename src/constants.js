"use strict";
import { getCode, getNames } from "country-list";
import metadata from "libphonenumber-js/metadata.min.json";
import validator from "validator";
import {
	parsePhoneNumberFromString,
	isValidPhoneNumber,
} from "libphonenumber-js";

const UserType = Object.freeze({
	Manager: 0,
	Shop: 1,
	User: 2,
});

const ProfileTab = Object.freeze({
	Coupons: 0,
	CouponManagement: 1,
	Settings: 2,
	Details: 3,
	UserManagement: 4,
});

const CouponCatalogueType = Object.freeze({
	All: 0,
	ShopManage: 1,
	ShopList: 2,
	User: 3,
});

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

const CouponState = Object.freeze({
	Pending: 0,
	Approved: 1,
	Rejected: 2,
});

const CouponCardModalType = Object.freeze({
	PopUp: 1,
	InfoField: 2,
});

// Regex patterns
const getCountryCallingCode = (countryCode) => {
	const countryMetadata = metadata.countries[countryCode];
	return countryMetadata?.[0] ?? null;
};

const CountryListWithCode = Object.freeze(
	getNames().map((name) => {
		const countryCode = getCode(name);
		const callingCode = getCountryCallingCode(countryCode);
		return {
			name,
			code: countryCode,
			callingCode: callingCode ? `+${callingCode}` : "",
		};
	}),
);

const Validators = Object.freeze({
	isValidName: (name) => validator.isLength(name, { min: 2 }),
	isValidEmail: (email) => validator.isEmail(email),
	isValidPassword: (password) => validator.isLength(password, { min: 8 }),
	isValidPhoneNumber: (phoneNumber, region) => {
		if (phoneNumber.trim() === "") return true; // Optional field
		return isValidPhoneNumber(phoneNumber, region);
	},
	formatPhoneNumber: (phone, region) => {
		try {
			const parsedPhone = parsePhoneNumberFromString(phone, region);
			return parsedPhone && parsedPhone.isValid()
				? parsedPhone.format("E.164")
				: null;
		} catch (error) {
			console.error("Phone parsing error:", error);
			return null;
		}
	},
});

export {
	UserType,
	ProfileTab,
	CouponCatalogueType,
	RedemptionState,
	CouponRequirementType,
	CouponState,
	CouponCardModalType,
	CountryListWithCode,
	Validators,
};
