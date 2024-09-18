const updateFiltersFromParams = (params, setStartDate, setEndDate, setSelectedCategories, setSearchTerm) => {
	const startDate = params.get('start');
	const endDate = params.get('end');
	const categories = params.getAll('categories[]');
	const searchTerm = params.get('search');

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
}

export {
	updateFiltersFromParams,
}