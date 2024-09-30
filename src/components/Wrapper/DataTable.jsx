import { useState, useMemo } from 'react';
import Pagination from "../Utils/Pagination";

const DataTable = ({ columns, data, itemsPerPage = 10, filename = 'data.csv' }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		// setCurrentPage(1); // Reset to first page on search
	};

	// Filter data based on search term
	const filteredData = useMemo(() => {
		const term = searchTerm.toLowerCase();
		return data.filter((item) =>
			columns.some((column) => {
				const value = item[column.accessor];
				return value && value.toString().toLowerCase().includes(term);
			})
		);
	}, [data, searchTerm, columns]);

	// Paginate the filtered data
	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredData.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredData, currentPage, itemsPerPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleDownloadCSV = () => {
		const csv = convertToCSV(filteredData);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const csvURL = URL.createObjectURL(blob);
		const link = document.createElement('a');
    link.href = csvURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
	};

	const convertToCSV = (data) => {
		if (!data || data.length === 0) {
			return '';
		}

		const headers = columns.map((col) => col.headder);

		const rows = data.map((row) =>
			columns.map((col) => {
				const value = row[col.accessor];
				// Escape quotes and wrap in double quotes
				return `"${String(value).replace(/"/g, '""')}"`
			})
		);

		const csvContent = [
			headers.join(','), // Header row
			...rows.map((row) => row.join(',')), // Data rows
		].join('\n');

		return csvContent;
	};

	return (
		<div className="p-4">
			<div className="flex justify-between mb-4">
				<div>
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
						onClick={handleDownloadCSV}
					>
						Download CSV
					</button>
				</div>
				<input
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={handleSearch}
					className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
				/>
			</div>

			{filteredData.length === 0 ? (
				<div className="text-center text-gray-500">No records found</div>
			) : (
				<>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white">
							<thead>
								<tr>
									{columns.map((column) => (
										<th key={column.accessor} className="px-4 py-2 border-b">
											{column.header}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{paginatedData.map((item, index) => (
									<tr key={index} className="text-center">
										{columns.map((column) => (
											<td key={column.accessor} className="px-4 py-2 border-b">
												{item[column.accessor]}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(filteredData.length / itemsPerPage)}
						onPageChange={handlePageChange}
					/>
				</>
			)}
		</div>
	);
};

export default DataTable;
