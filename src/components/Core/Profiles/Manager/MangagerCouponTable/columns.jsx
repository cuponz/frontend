import { Fragment } from "react";
import { format } from "date-fns";
import Button from "@/components/Utils/Button";
import getStateToggleButtonProps from "./getStateToggleButtonProps"; // Create this helper function

import StatusBadge from "@/components/Core/Profiles/StatusBadge";

/**
 * Generates the columns configuration for the ManagerCouponTable component.
 *
 * @param {Function} handleToogleApproval - Function to handle the approval toggle action.
 * @param {Function} handleDelete - Function to handle the delete action.
 * @param {Object} mutationLoadingStates - Object containing the loading states for mutations.
 * @returns {Array<Object>} Array of column configuration objects.
 *
 * @typedef {Object} Column
 * @property {string} header - The header text for the column.
 * @property {string} [accessor] - The key to access the data for the column.
 * @property {string} [sortType] - The type of sorting to be applied to the column.
 * @property {Function} [cell] - Function to render the cell content.
 */
const columns = (handleToogleApproval, handleDelete, mutationLoadingStates) => [
	{
		header: "ID",
		accessor: "id",
		sortType: "number",
	},
	{
		header: "Code",
		accessor: "code",
	},
	{
		header: "Name",
		accessor: "name",
	},
	{
		header: "Category",
		accessor: "category",
	},
	{
		header: "Start Date",
		accessor: "start_date",
		cell: (value) => format(new Date(value), "dd/MM/yyyy"),
	},
	{
		header: "End Date",
		accessor: "end_date",
		cell: (value) => format(new Date(value), "dd/MM/yyyy"),
	},
	{
		header: "Usage",
		accessor: "usage_count",
		cell: (value, row) => `${value}/${row.max_usage || "inf"}`,
	},
	{
		header: "Status",
		cell: (_, row) => (
			<Fragment key={`${row.id}-status-badge`}>
				<StatusBadge active={row.active} state={row.state} />
			</Fragment>
		),
	},
	{
		header: "Actions",
		cell: (_, row) => {
			const toggleButtonProps = getStateToggleButtonProps(row.state);

			const isApproving = mutationLoadingStates[row.id]?.isEditing;
			const isDeleting = mutationLoadingStates[row.id]?.isDeleting;

			return (
				<div className="flex justify-center space-x-2">
					<Button
						onClick={() => handleToogleApproval(row.id, row.state)}
						colour={toggleButtonProps.colour}
						disabled={isApproving}
						isLoading={isApproving}
						className="w-24"
					>
						{toggleButtonProps.text}
					</Button>
					<Button
						onClick={() => handleDelete(row.id)}
						colour="red-500"
						disabled={isDeleting}
						isLoading={isDeleting}
					>
						Delete
					</Button>
				</div>
			);
		},
	},
];

export default columns;
