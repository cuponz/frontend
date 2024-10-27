module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
		commonjs: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended", // Ensures ESLint works with Prettier
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
			modules: true,
		},
	},
	settings: {
		react: {
			version: "18.2",
		},
	},
	plugins: ["react-refresh", "prettier"], // Added Prettier plugin
	rules: {
		"react/jsx-no-target-blank": "off",
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"react/prop-types": "off",

		// Prettier-related rules to enforce Prettier settings
		"prettier/prettier": [
			"error",
			{
				tabWidth: 2,
				useTabs: true,
				singleQuote: false,
			},
		],
	},
};
