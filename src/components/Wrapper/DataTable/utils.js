export const dataTableCompareValues = (a, b, type) => {
	if (a === b) {
		return 0;
	}
	if (a === null || a === undefined) {
		return 1;
	}
	if (b === null || b === undefined) {
		return -1;
	}

	switch (type) {
		case "date":
			const dateA = new Date(a);
			const dateB = new Date(b);
			return dateA - dateB;
		case "number":
			return Number(a) - Number(b);
		case "string":
		default:
			return String(a).localeCompare(String(b));
	}
};

/**
 * Checks if an item matches all the provided filters and additional filters.
 *
 * @param {Object} item - The item to be checked against the filters.
 * @param {Object} filters - An object containing the filters to be applied.
 * @param {Array} additionalFilters - An array of additional filter objects, each containing a `name` and `type`.
 * @returns {boolean} - Returns true if the item matches all the filters, otherwise false.
 */
export const filterMatchCheck = (item, filters, additionalFilters) => {
	return Object.entries(filters).every(([key, value]) => {
		if (!value) {
			return true;
		}

		const filter = additionalFilters.find((f) => f.name === key);
		const itemValue = item[key];

		if (filter?.type === "date") {
			const filterDate = new Date(value);
			const itemDate = new Date(itemValue);

			if (key.includes("start")) {
				return itemDate >= filterDate;
			}
			if (key.includes("end")) {
				return itemDate <= filterDate;
			}
		}

		return itemValue?.toString().toLowerCase().includes(value.toLowerCase());
	});
};
