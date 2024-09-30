import { apiRequest } from "./base";

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
