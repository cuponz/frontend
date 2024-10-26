const isDevelopment = process.env.NODE_ENV === "development";
const CREDENTIALS = isDevelopment ? "include" : "same-origin";

/**
 * Makes an API request using the Fetch API.
 *
 * @param {string} url - The URL to which the request is sent.
 * @param {Object} [options={}] - Optional configurations for the request.
 * @param {Object} [options.headers] - Additional headers to include in the request.
 * @param {string} [options.errorMessage] - Custom error message to use if the request fails.
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
async function apiRequest(url, options = {}) {
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
				data?.msg ||
				data?.message ||
				data?.error ||
				options.errorMessage ||
				"Request failed";
			throw new Error(errorMsg);
		}

		return data;
	} catch (error) {
		throw error;
	}
}

async function apiRequestAuto(url, options = {}) {
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
				data?.msg ||
				data?.message ||
				data?.error ||
				options.errorMessage ||
				"Request failed";
			throw new Error(errorMsg);
		}

		return data;
	} catch (error) {
		throw error;
	}
}

export { apiRequest, apiRequestAuto };
