import { useTranslations } from "@/store/languages";

export const languageNames = {
	en: "English",
	es: "Español",
	hindi: "हिन्दी",
	bengali: "বাংলা",
	urdu: "اردو",
};

export const languageFlags = {
	en: "GB",
	es: "ES",
	hindi: "IN",
	bengali: "BD",
	urdu: "PK",
};

/**
 * Generates an array of route objects for navigation.
 *
 * @param {Function} t - Translation function to get localized route names.
 * @returns {Array<Object>} Array of route objects.
 * @returns {string} [Array<Object>.path] - The path of the route.
 * @returns {string} Array<Object>.name - The localized name of the route.
 */
export const getRoutes = (t) => [
	{ path: "/", name: t(["navigation", "home"]) },
	{ path: "/coupon", name: t(["navigation", "coupons"]) },
	{
		path: undefined,
		name: t(["navigation", "categories"]),
	},
	{ path: "/aboutus", name: t(["navigation", "aboutUs"]) },
	{ path: "/contactus", name: t(["navigation", "contactUs"]) },
];
