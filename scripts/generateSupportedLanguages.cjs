const fs = require("node:fs");
const path = require("node:path");

// Directory where language files are stored
const localesDir = path.join(__dirname, "../src/locales");

// Output file for supported languages
const outputFile = path.join(__dirname, "../src/generated/supportedLanguages.js");

// Function to generate the supported languages file
const generateSupportedLanguages = () => {
	try {
		// Read all files from the locales directory
		const files = fs.readdirSync(localesDir);

		// Filter out non-JSON files and extract language codes from file names
		const supportedLanguages = files
			.filter((file) => file.endsWith(".json"))
			.map((file) => path.basename(file, ".json")); // Remove .json extension to get language code

		// Prepare the content for the output file
		const outputContent = `// This file is auto-generated by the generateSupportedLanguages script
export const supportedLanguages = ${JSON.stringify(
			supportedLanguages,
			null,
			2
		)};
`;

		// Write the content to the output file
		fs.writeFileSync(outputFile, outputContent, "utf8");
		console.log("Supported languages file generated successfully!");
	} catch (error) {
		console.error("Error generating supported languages:", error);
	}
};

// Run the function
generateSupportedLanguages();