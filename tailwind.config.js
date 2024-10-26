/** @type {require('tailwindcss').Config} */
/**
 * Tailwind CSS configuration file.
 *
 * @type {require('tailwindcss').Config}
 * @property {string[]} content - An array of file paths or glob patterns to include in the purge process.
 * @property {object} theme - An object to extend the default theme.
 * @property {object[]} plugins - An array of plugins to use with Tailwind CSS.
 */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
};
