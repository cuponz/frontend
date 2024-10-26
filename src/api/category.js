import { apiRequest } from "./base";

async function getCategories() {
	return apiRequest(`/api/category`, {
		errorMessage: "Getting Categories Failed",
	});
}

/**
 * Creates a new category by sending a POST request to the API.
 *
 * @param {Object} categoryData - The data for the new category.
 * @param {string} categoryData.name - The name of the category.
 * @param {string} [categoryData.description] - The description of the category.
 * @returns {Promise<Object>} The response from the API.
 * @throws Will throw an error if the request fails.
 */
async function createCategory(categoryData) {
	return apiRequest(`/api/category`, {
		method: "POST",
		body: JSON.stringify(categoryData),
		errorMessage: "Creating Category Failed",
	});
}

export { getCategories, createCategory };
