import { apiRequest } from "./base";

/**
 * Fetches a list of groups from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function getGroups() {
	return apiRequest(`/api/group`, {
		errorMessage: "Getting Groups Failed",
	});
}

export { getGroups };
