import { useState, useMemo, useCallback, Fragment } from "react";
import Pagination from "@/components/Utils/Pagination";
import { dataTableCompareValues, filterMatchCheck } from "./utils";
import Button from "@/components/Utils/Button";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { debounce } from "@/utils";

/**
 * DataTable component for displaying and managing tabular data with features like search, sort, filter, pagination, and export.
 *
 * @param {Object[]} columns - Array of column definitions for the table.
 * @param {string} columns[].header - The header text for the column.
 * @param {string} columns[].accessor - The key to access the column's data in the data objects.
 * @param {Function} [columns[].cell] - Optional function to customize cell rendering.
 * @param {string} [columns[].sortType] - Optional sort type for the column (e.g., "string", "number").
 * @param {Object[]} data - Array of data objects to be displayed in the table.
 * @param {number} [itemsPerPage=10] - Number of items to display per page.
 * @param {string} [filename="data"] - Filename for the exported files.
 * @param {string} [name="Data Table"] - Name of the table, used in export files.
 * @param {Object[]} [additionalFilters=[]] - Array of additional filter definitions.
 * @param {string} additionalFilters[].name - The name of the filter.
 * @param {string} additionalFilters[].type - The type of the filter (e.g., "select", "text").
 * @param {string} additionalFilters[].placeholder - Placeholder text for the filter input.
 * @param {string[]} additionalFilters[].options - Array of options for select-type filters.
 * @param {Object[]} [rightButtons=[]] - Array of button definitions to be displayed on the right side of the control panel.
 * @param {Function} rightButtons[].action - The action to be performed when the button is clicked.
 * @param {string} rightButtons[].colour - The color of the button.
 * @param {string} rightButtons[].content - The content to be displayed inside the button.
 *
 * @returns {JSX.Element} The rendered DataTable component.
 */
const DataTable = ({
	columns,
	data,
	itemsPerPage = 10,
	filename = "data",
	name = "Data Table",
	additionalFilters = [],
	rightButtons = [],
}) => {
	// Table states
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState(columns[0].accessor);
	const [sortDirection, setSortDirection] = useState("asc");
	const [filters, setFilters] = useState({});

	const debouncedSearch = useCallback(debounce(setSearchTerm, 300), []);

	const handleSearch = useCallback((e) => {
		debouncedSearch(e.target.value);
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
	}, [
		data,
		searchTerm,
		filters,
		sortField,
		sortDirection,
		columns,
		additionalFilters,
	]);

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredAndSortedData, currentPage, itemsPerPage]);

	const handlePageChange = useCallback((page) => {
		setCurrentPage(page);
	}, []);

	const handleDownloadExcel = useCallback(() => {
		const validColumns = columns.filter((col) => col.accessor);
		const exportData = filteredAndSortedData.map((item) => {
			const exportItem = {};
			validColumns.forEach((col) => {
				if (col.cell) {
					exportItem[col.accessor] = col.cell(item[col.accessor], item);
				} else {
					exportItem[col.accessor] = item[col.accessor];
				}
			});
			return exportItem;
		});

		const worksheet = XLSX.utils.json_to_sheet(exportData);

		const header = [name];
		const columnCount = validColumns.length;
		XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
		worksheet["!merges"] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: columnCount - 1 } },
		];

		worksheet["A1"].s = {
			font: { bold: true, sz: 24 },
			alignment: { horizontal: "center" },
		};

		// Add the table header row based on column headers
		const headerRow = validColumns.map((col) => col.header);
		XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: "A2" });

		// Add data rows starting from the third row
		XLSX.utils.sheet_add_json(worksheet, exportData, {
			origin: "A3",
			skipHeader: true,
		});

		// Auto-fit column widths based on content
		const columnWidths = validColumns.map((col, index) => {
			const maxContentWidth = Math.max(
				...exportData.map((row) => String(row[col.accessor]).length),
				col.header.length,
			);
			return { wch: Math.min(maxContentWidth + 5, 45) }; // add padding, cap width
		});
		worksheet["!cols"] = columnWidths;

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

		XLSX.writeFile(workbook, `${filename}.xlsx`);
	}, [columns, filteredAndSortedData, filename, name]);

	const handleDownloadPDF = useCallback(() => {
		const doc = new jsPDF();
		doc.setFont("Helvetica", "normal");
		doc.text(name, 20, 10);

		const validColumns = columns.filter((col) => col.accessor);
		const tableColumn = validColumns.map((col) => col.header);
		const tableRows = filteredAndSortedData.map((item) =>
			validColumns.map((col) => {
				if (col.cell) {
					return col.cell(item[col.accessor], item);
				} else {
					return item[col.accessor];
				}
			}),
		);

		doc.autoTable({
			head: [tableColumn],
			body: tableRows,
			startY: 20,
			styles: { font: "Helvetica" },
		});

		doc.save(`${filename}.pdf`);
	}, [columns, filteredAndSortedData, filename, name]);

	const renderCell = useCallback((item, column) => {
		if (column.cell) {
			return column.cell(item[column.accessor], item);
		}
		return item[column.accessor];
	}, []);

	return (
		<div className="p-4 space-y-6">
			{/* Control Panel */}
			<div className="bg-white rounded-lg shadow p-4">
				{/* Search and Sort Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
					<input
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={handleSearch}
						className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
					/>

					<select
						value={`${sortField}-${sortDirection}`}
						onChange={handleSortChange}
						className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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

					{/* Additional Filters */}
					{additionalFilters.map((filter) => (
						<div key={filter.name}>
							{filter.type === "select" ? (
								<select
									value={filters[filter.name] || ""}
									onChange={(e) =>
										handleFilterChange(filter.name, e.target.value)
									}
									className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
									className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
								/>
							)}
						</div>
					))}
				</div>

				{/* Action Buttons Section */}
				<div className="border-t pt-4">
					<div className="flex flex-wrap gap-3">
						<div className="flex-1 flex gap-3">
							{/* Left-aligned buttons */}
							<Button
								onClick={handleResetFilters}
								colour="gray-500"
								className="px-4 py-2"
							>
								Reset Filters
							</Button>
							<Button
								onClick={handleDownloadExcel}
								colour="green-500"
								className="px-4 py-2"
							>
								Download Excel
							</Button>
							<Button
								onClick={handleDownloadPDF}
								colour="red-500"
								className="px-4 py-2"
							>
								Download PDF
							</Button>
						</div>

						{/* Right-aligned management buttons */}
						<div className="flex gap-3">
							{rightButtons.map((btn, i) => (
								<Button
									key={`right-btn-${i}`}
									onClick={btn.action}
									colour={btn.colour}
									className="px-4 py-2"
								>
									{btn.content}
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Table Section with updated styling */}
			{filteredAndSortedData.length === 0 ? (
				<div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
					No records found
				</div>
			) : (
				<div className="bg-white rounded-lg shadow">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead>
								<tr>
									{columns.map((column) => (
										<th
											key={column.accessor}
											className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
										>
											{column.header}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{paginatedData.map((item, index) => (
									<tr key={index}>
										{columns.map((column) => (
											<td
												key={column.accessor}
												className="px-6 py-4 whitespace-nowrap"
											>
												{renderCell(item, column)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="p-4 border-t">
						<Pagination
							currentPage={currentPage}
							totalPages={Math.ceil(
								filteredAndSortedData.length / itemsPerPage,
							)}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataTable;
