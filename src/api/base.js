const isDevelopment = process.env.NODE_ENV === "development";
const CREDENTIALS = isDevelopment ? "include" : "same-origin";

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
