import { useState, useMemo } from "react";
import LoadingSpinner from "../Utils/LoadingSpinner";
import Pagination from "../Utils/Pagination";
import { useEffect } from "react";

const PaginationContainer = ({
	items = [],
	itemsPerPage = 8,
	isPending,
	renderItems,
}) => {
	const [currentPage, setCurrentPage] = useState(1);

	const currentItems = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return items.slice(start, start + itemsPerPage);
	}, [currentPage, items, itemsPerPage]);

	useEffect(() => setCurrentPage(1), [items]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	if (isPending) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<div className="flex justify-between items-center mt-4 mb-4">
				<div className="text-lg font-medium">
					{`${items.length} Items found`}
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
				{renderItems(currentItems)}
			</div>
			<div className="mt-8 mb-8">
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(items.length / itemsPerPage)}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
};

export default PaginationContainer;
