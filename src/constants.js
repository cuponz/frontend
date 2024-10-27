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
	GroupManagement: 5,
	CategoryManagement: 6,
});

const CouponCatalogueType = Object.freeze({
	All: 0,
	ShopManage: 1,
	ManagerManage: 2,
	ShopList: 3,
	User: 4,
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

/**
 * A collection of validation functions.
 * @namespace Validators
 */

/**
 * Validates if the given name has a minimum length of 2 characters.
 * @function
 * @memberof Validators
 * @param {string} name - The name to validate.
 * @returns {boolean} True if the name is valid, false otherwise.
 */

/**
 * Validates if the given email is in a proper email format.
 * @function
 * @memberof Validators
 * @param {string} email - The email to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */

/**
 * Validates if the given password has a minimum length of 8 characters.
 * @function
 * @memberof Validators
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */

/**
 * Validates if the given phone number is valid for the specified region.
 * If the phone number is an empty string, it is considered valid (optional field).
 * @function
 * @memberof Validators
 * @param {string} phoneNumber - The phone number to validate.
 * @param {string} region - The region code to validate the phone number against.
 * @returns {boolean} True if the phone number is valid or empty, false otherwise.
 */

/**
 * Formats the given phone number to E.164 format for the specified region.
 * @function
 * @memberof Validators
 * @param {string} phone - The phone number to format.
 * @param {string} region - The region code to format the phone number against.
 * @returns {string|null} The formatted phone number in E.164 format, or null if invalid.
 */
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
