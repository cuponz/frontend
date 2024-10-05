const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className="flex items-center justify-center space-x-4 mt-8">
			<button
				onClick={handlePrevious}
				className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-purple-700 text-purple-700 ${
					currentPage === 1
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-purple-700 hover:text-white"
				}`}
				disabled={currentPage === 1}
			>
				←
			</button>
			{[...Array(totalPages).keys()].map((page) => (
				<button
					key={page + 1}
					onClick={() => onPageChange(page + 1)}
					className={`text-lg ${
						currentPage === page + 1
							? "underline text-purple-700"
							: "text-gray-500 hover:text-purple-700"
					}`}
				>
					{page + 1}
				</button>
			))}
			<button
				onClick={handleNext}
				className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-purple-700 text-purple-700 ${
					currentPage === totalPages
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-purple-700 hover:text-white"
				}`}
				disabled={currentPage === totalPages}
			>
				→
			</button>
		</div>
	);
};

export default Pagination;
