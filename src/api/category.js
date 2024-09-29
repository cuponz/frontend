import { apiRequest } from "./base";

async function getCategories() {
  return apiRequest(`/api/category`, {
    errorMessage: "Getting Categories Failed",
  })
}

async function createCategory(categoryData) {
  return apiRequest(`/api/category`, {
    method: "POST",
    body: JSON.stringify(categoryData),
    errorMessage: "Creating Category Failed",
  })
}

export {
	getCategories,
  createCategory,
}
