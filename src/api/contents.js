// src/api/translations.js
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
export async function updateContent({ language, key, value }) {
	return apiRequest(`/api/contents/${language}`, {
		method: "PUT",
		body: JSON.stringify({ key, value }),
		errorMessage: `Updating translation for ${language} failed`,
	});
}
