const isDevelopment = process.env.NODE_ENV === "development";
const BASE_URL = isDevelopment ? "http://localhost:3000" : "";
const CREDENTIALS = isDevelopment ? "include" : "same-origin";

async function apiRequest(endpoint, options = {}) {
	const url = `${BASE_URL}${endpoint}`;
	const fetchOptions = {
		credentials: CREDENTIALS,
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
		...options,
	};

	try {
		const response = await fetch(url, fetchOptions);
		const data = await response.json().catch(() => undefined);

		if (!response.ok) {
			const errorMsg =
				data?.msg || data?.error || options.errorMessage || "Request failed";
			throw new Error(errorMsg);
		}

		return data;
	} catch (error) {
		throw error;
	}
}

async function apiRequestFormBody(endpoint, options = {}) {
	const url = `${BASE_URL}${endpoint}`;
	const fetchOptions = {
		credentials: CREDENTIALS,
		headers: {
			...(options.headers || {}),
		},
		...options,
	};

	try {
		const response = await fetch(url, fetchOptions);
		const data = await response.json().catch(() => undefined);

		if (!response.ok) {
			const errorMsg =
				data?.msg || data?.error || options.errorMessage || "Request failed";
			throw new Error(errorMsg);
		}

		return data;
	} catch (error) {
		throw error;
	}
}

export { 
	apiRequest,
	apiRequestFormBody,
};
