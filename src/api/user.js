import { apiRequest, apiRequestAuto } from "./base";

export async function userAuth() {
	return apiRequest(`/api/user/auth`, {
		errorMessage: "Auth failed",
	});
}

export async function userLogout() {
	return apiRequest(`/api/user/logout`, {
		errorMessage: "Logout failed",
	});
}

export async function userLogin(loginData) {
	return apiRequest(`/api/user/login`, {
		method: "POST",
		body: JSON.stringify(loginData),
		errorMessage: "Login failed",
	});
}
export async function userRegister(registerData) {
	return apiRequest(`/api/user/register`, {
		method: "POST",
		body: JSON.stringify(registerData),
		errorMessage: "Register failed",
	});
}

export async function searchShops(searchTerm) {
	return apiRequest(`/api/user/shop?searchTerm=${searchTerm}`, {
		method: "POST",
		body: JSON.stringify({ searchTerm }),
		errorMessage: "Search Shop Failed",
	});
}

export async function getAllShops() {
	return apiRequest(`/api/user/shop`, {
		method: "GET",
		errorMessage: "Get Shops Failed",
	});
}

export async function updateUser({ userId, userData }) {
	return apiRequestAuto(`/api/user/${userId}`, {
		method: "PUT",
		// body: JSON.stringify(userData),
		body: userData,
		errorMessage: "Update User Failed",
	});
}

export async function deleteUser(userId) {
	return apiRequestAuto(`/api/user/${userId}`, {
		method: "DELETE",
		errorMessage: "Deleting User Failed",
	});
}