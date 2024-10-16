import { useState, useMemo, useCallback, Fragment } from "react";
import Pagination from "@/components/Utils/Pagination";
import { dataTableCompareValues, downloadCSV, filterMatchCheck } from "./utils";

import Button from "@/components/Utils/Button";

const DataTable = ({
	columns,
	data,
	itemsPerPage = 10,
	filename = "data.csv",
	additionalFilters = [],
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState(columns[0].accessor);
	const [sortDirection, setSortDirection] = useState("asc");
	const [filters, setFilters] = useState({});

	const handleSearch = useCallback((e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	}, []);

	const handleSortChange = useCallback((e) => {
		const [field, direction] = e.target.value.split("-");
		setSortField(field);
		setSortDirection(direction);
	}, []);

	const handleFilterChange = useCallback((filterName, value) => {
		setFilters((prev) => ({ ...prev, [filterName]: value }));
		setCurrentPage(1);
	}, []);

	const handleResetFilters = useCallback(() => {
		setSearchTerm("");
		setFilters({});
		setSortField(columns[0].accessor);
		setSortDirection("asc");
		setCurrentPage(1);
	}, [columns]);

	const filteredAndSortedData = useMemo(() => {
		return data
			.filter((item) => {
				const searchMatch = columns.some((column) => {
					const value = item[column.accessor];
					return (
						value &&
						value.toString().toLowerCase().includes(searchTerm.toLowerCase())
					);
				});

				const filterMatch = filterMatchCheck(item, filters, additionalFilters);

				return searchMatch && filterMatch;
			})
			.sort((a, b) => {
				const column = columns.find((col) => col.accessor === sortField);
				const sortType = column?.sortType || "string";
				const multiplier = sortDirection === "asc" ? 1 : -1;

				return (
					multiplier *
					dataTableCompareValues(a[sortField], b[sortField], sortType)
				);
			});
	}, [data, searchTerm, filters, sortField, sortDirection, columns]);

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredAndSortedData, currentPage, itemsPerPage]);

	const handlePageChange = useCallback((page) => {
		setCurrentPage(page);
	}, []);

	const handleDownloadCSV = useCallback(() => {
		const exportData = filteredAndSortedData.map((item) => {
			const exportItem = {};
			columns.forEach((column) => {
				if (column.cell) {
					exportItem[column.accessor] = column.cell(
						item[column.accessor],
						item,
					);
				} else {
					exportItem[column.accessor] = item[column.accessor];
				}
			});
			return exportItem;
		});

		downloadCSV(columns, exportData, filename);
	}, [columns, filteredAndSortedData, filename]);

	const renderCell = useCallback((item, column) => {
		if (column.cell) {
			return column.cell(item[column.accessor], item);
		}
		return item[column.accessor];
	}, []);

	return (
		<div className="p-4">
			<div className="flex flex-wrap justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
				<input
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={handleSearch}
					className="w-full sm:w-auto flex-grow px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
				/>
				<select
					value={`${sortField}-${sortDirection}`}
					onChange={handleSortChange}
					className="w-full sm:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
				>
					{columns.map((column) => (
						<Fragment key={column.accessor}>
							<option value={`${column.accessor}-asc`}>
								Sort by {column.header} (Asc)
							</option>
							<option value={`${column.accessor}-desc`}>
								Sort by {column.header} (Desc)
							</option>
						</Fragment>
					))}
				</select>

				{additionalFilters.map((filter) => (
					<div key={filter.name} className="w-full sm:w-auto">
						{filter.type === "select" ? (
							<select
								value={filters[filter.name] || ""}
								onChange={(e) =>
									handleFilterChange(filter.name, e.target.value)
								}
								className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
							>
								<option value="">{filter.placeholder}</option>
								{filter.options.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						) : (
							<input
								type={filter.type}
								placeholder={filter.placeholder}
								value={filters[filter.name] || ""}
								onChange={(e) =>
									handleFilterChange(filter.name, e.target.value)
								}
								className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
							/>
						)}
					</div>
				))}

				<Button
					onClick={handleResetFilters}
					className="w-full sm:w-auto"
					colour="gray-500"
				>
					Reset Filters
				</Button>

				<Button
					className="w-full sm:w-auto"
					onClick={handleDownloadCSV}
					colour="blue-500"
				>
					Download CSV
				</Button>
			</div>

			{filteredAndSortedData.length === 0 ? (
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
												{renderCell(item, column)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(filteredAndSortedData.length / itemsPerPage)}
						onPageChange={handlePageChange}
					/>
				</>
			)}
		</div>
	);
};

export default DataTable;
