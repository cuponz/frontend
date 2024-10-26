import { apiRequest, apiRequestAuto } from "./base";

// Fetch all available languages
export async function getLanguages() {
	return apiRequest(`/api/contents`, {
		errorMessage: "Fetching languages failed",
	});
}

// Fetch all translations for a specific language
export async function getContentsByLanguage(language) {
	return apiRequest(`/api/contents/${language}`, {
		errorMessage: `Fetching translations for ${language} failed`,
	});
}

// Update a translation by key and language
/**
 * Updates the content translation for a specific language.
 *
 * @param {Object} params - The parameters for the update.
 * @param {string} params.language - The language code for the translation.
 * @param {string} params.key - The key of the content to update.
 * @param {string} params.value - The new value for the content.
 * @returns {Promise<Response>} The response from the API request.
 * @throws Will throw an error if the update fails.
 */
export async function updateContent({ language, key, value }) {
	return apiRequest(`/api/contents/${language}`, {
		method: "PUT",
		body: JSON.stringify({ key, value }),
		errorMessage: `Updating translation for ${language} failed`,
	});
}
