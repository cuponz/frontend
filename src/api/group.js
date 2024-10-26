import { apiRequest, apiRequestAuto } from "./base";

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

/**
 * Fetches a list of groups by Manager from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function getGroupsByManager() {
	return apiRequest(`/api/group/manager`, {
		errorMessage: "Getting Groups by Manager Failed",
	});
}

/**
 * Create a group from the API.
 *
 * @returns {Promise<number>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function createGroup(groupData) {
	return apiRequest(`/api/group`, {
		method: "POST",
		body: JSON.stringify(groupData),
		errorMessage: "Editng Group Failed",
	});
}

/**
 * Edit a group from the API.
 *
 * @returns {Promise<number>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function editGroup({ groupId, groupData }) {
	return apiRequest(`/api/group/${groupId}`, {
		method: "PUT",
		body: JSON.stringify(groupData),
		errorMessage: "Editng Group Failed",
	});
}

/**
 * Edit a group from the API.
 *
 * @returns {Promise<number>} A promise that resolves to the response of the API request.
 * @throws Will throw an error if the API request fails.
 */
async function deleteGroup(groupId) {
	return apiRequestAuto(`/api/group/${groupId}`, {
		method: "DELETE",
		errorMessage: "Deleting Group Failed",
	});
}

export { getGroups, getGroupsByManager, createGroup, editGroup, deleteGroup };
