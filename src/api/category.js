import { apiRequest, apiRequestAuto } from "./base";

/**
 * Fetches a list of categories from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function getCategories() {
	return apiRequest(`/api/category`, {
		errorMessage: "Getting Categories Failed",
	});
}

/**
 * Fetches a list of categoryes by Group's ID by Manager from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function getCategoriesByGroupIdByManager(groupId) {
	return apiRequest(`/api/category/manager/${groupId}`, {
		errorMessage: "Getting Categories by Group's ID by Manager Failed",
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

/**
 * Edit a category from the API.
 *
 * @returns {Promise<number>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function editCategory({ categoryId, categoryData }) {
	return apiRequest(`/api/category/${categoryId}`, {
		method: "PUT",
		body: JSON.stringify(categoryData),
		errorMessage: "Editng Category Failed",
	});
}

/**
 * Edit a category from the API.
 *
 * @returns {Promise<number>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function deleteCategory(categoryId) {
	return apiRequestAuto(`/api/category/${categoryId}`, {
		method: "DELETE",
		errorMessage: "Deleting Category Failed",
	});
}

export {
	getCategories,
	getCategoriesByGroupIdByManager,
	createCategory,
	editCategory,
	deleteCategory,
};
