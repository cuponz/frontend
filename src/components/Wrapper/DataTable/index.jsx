import { useState, useMemo, useCallback, Fragment } from "react";
import Pagination from "@/components/Utils/Pagination";
import { dataTableCompareValues, downloadCSV, filterMatchCheck } from "./utils";
import Button from "@/components/Utils/Button";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import debounce from "@/utils";

const DataTable = ({
	columns,
	data,
	itemsPerPage = 10,
	filename = "data.csv",
	name = "Data Table",
	additionalFilters = [],
}) => {
	// Table states
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState(columns[0].accessor);
	const [sortDirection, setSortDirection] = useState("asc");
	const [filters, setFilters] = useState({});

	// Group modal states
	const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
	const [groupName, setGroupName] = useState("");

	// Category modal states
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [selectedGroup, setSelectedGroup] = useState("");

	// Mock groups data (replace with your actual data source)
	const groups = [
		{ id: 1, name: "Electronics" },
		{ id: 2, name: "Clothing" },
		{ id: 3, name: "Books" },
		{ id: 4, name: "Sports" },
	];

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

	const handleCreateGroup = (e) => {
		e.preventDefault();
		if (groupName.trim()) {
			console.log("Group created:", groupName);
			setGroupName("");
			setIsGroupModalOpen(false);
		}
	};

	const handleCreateCategory = (e) => {
		e.preventDefault();
		if (categoryName.trim() && selectedGroup) {
			console.log("Category created:", {
				name: categoryName,
				groupId: selectedGroup,
			});
			setCategoryName("");
			setSelectedGroup("");
			setIsCategoryModalOpen(false);
		}
	};

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
							<Button
								onClick={() => setIsGroupModalOpen(true)}
								colour="green-500"
								className="px-4 py-2"
							>
								Create Group
							</Button>
							<Button
								onClick={() => setIsCategoryModalOpen(true)}
								colour="yellow-500"
								className="px-4 py-2"
							>
								Create Category
							</Button>
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

			{/* Group Modal */}
			{isGroupModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">
								Create New Group
							</h2>
							<button
								onClick={() => setIsGroupModalOpen(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								✕
							</button>
						</div>

						<form onSubmit={handleCreateGroup} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Group Name
								</label>
								<input
									type="text"
									placeholder="Enter group name"
									value={groupName}
									onChange={(e) => setGroupName(e.target.value)}
									className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
									required
								/>
							</div>

							<div className="flex justify-end space-x-3">
								<Button
									type="button"
									onClick={() => setIsGroupModalOpen(false)}
									colour="gray-500"
									className="px-4 py-2"
								>
									Cancel
								</Button>
								<Button type="submit" colour="green-500" className="px-4 py-2">
									Create Group
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Category Modal */}
			{isCategoryModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">
								Create New Category
							</h2>
							<button
								onClick={() => setIsCategoryModalOpen(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								✕
							</button>
						</div>

						<form onSubmit={handleCreateCategory} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Select Group
								</label>
								<select
									value={selectedGroup}
									onChange={(e) => setSelectedGroup(e.target.value)}
									className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
									required
								>
									<option value="">Select a group</option>
									{groups.map((group) => (
										<option key={group.id} value={group.id}>
											{group.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Category Name
								</label>
								<input
									type="text"
									placeholder="Enter category name"
									value={categoryName}
									onChange={(e) => setCategoryName(e.target.value)}
									className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
									required
								/>
							</div>

							<div className="flex justify-end space-x-3">
								<Button
									type="button"
									onClick={() => setIsCategoryModalOpen(false)}
									colour="gray-500"
									className="px-4 py-2"
								>
									Cancel
								</Button>
								<Button type="submit" colour="yellow-500" className="px-4 py-2">
									Create Category
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataTable;
