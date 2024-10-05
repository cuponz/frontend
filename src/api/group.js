import { apiRequest } from "./base";

async function getGroups() {
	return apiRequest(`/api/group`, {
		errorMessage: "Getting Groups Failed",
	});
}

export { getGroups };
