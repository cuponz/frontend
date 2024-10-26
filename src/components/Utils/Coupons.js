/**
 * Updates filter states based on URL parameters.
 *
 * @param {URLSearchParams} params - The URL parameters to extract filter values from.
 * @param {function} setStartDate - Function to update the start date state.
 * @param {function} setEndDate - Function to update the end date state.
 * @param {function} setSelectedCategories - Function to update the selected categories state.
 * @param {function} setSearchTerm - Function to update the search term state.
 */
const updateFiltersFromParams = (
	params,
	setStartDate,
	setEndDate,
	setSelectedCategories,
	setSearchTerm,
) => {
	const startDate = params.get("start");
	const endDate = params.get("end");
	const categories = params.getAll("categories[]");
	const searchTerm = params.get("search");

	if (startDate) {
		setStartDate(startDate);
	}

	if (endDate) {
		setEndDate(endDate);
	}

	if (categories) {
		setSelectedCategories(categories);
	}

	if (searchTerm) {
		setSearchTerm(searchTerm);
	}
};

export { updateFiltersFromParams };
