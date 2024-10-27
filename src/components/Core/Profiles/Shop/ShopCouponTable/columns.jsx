import { Fragment } from "react";
import { format } from "date-fns";
import Button from "@/components/Utils/Button";
import getStateToggleButtonProps from "./getStateToggleButtonProps"; // Create this helper function

import StatusBadge from "@/components/Core/Profiles/StatusBadge";

/**
 * Generates the columns configuration for the ShopCouponTable component.
 *
 * @param {Function} handleEdit - Function to handle the edit action for a coupon.
 * @param {Function} handleStateToggle - Function to handle the state toggle action for a coupon.
 * @param {Function} handleDelete - Function to handle the delete action for a coupon.
 * @param {Object} mutationLoadingStates - Object containing the loading states for mutations.
 * @param {Object} mutationLoadingStates.<id> - Loading states for a specific coupon.
 * @param {boolean} mutationLoadingStates.<id>.isEditing - Indicates if the coupon is being edited.
 * @param {boolean} mutationLoadingStates.<id>.isPausing - Indicates if the coupon state is being toggled.
 * @param {boolean} mutationLoadingStates.<id>.isDeleting - Indicates if the coupon is being deleted.
 * @returns {Array<Object>} Array of column configuration objects for the table.
 */
const columns = (
	handleEdit,
	handleStateToggle,
	handleDelete,
	mutationLoadingStates,
) => [
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
			const toggleButtonProps = getStateToggleButtonProps(
				row.active,
				row.state,
			);

			const isEditing = mutationLoadingStates[row.id]?.isEditing;
			const isPausing = mutationLoadingStates[row.id]?.isPausing;
			const isDeleting = mutationLoadingStates[row.id]?.isDeleting;

			return (
				<div
					key={`${row.id}-btn-actions`}
					className="flex justify-center space-x-2"
				>
					<Button
						onClick={() => handleEdit(row.id)}
						colour="yellow-500"
						disabled={isEditing}
						isLoading={isEditing}
					>
						Edit
					</Button>
					<Button
						onClick={() => handleStateToggle(row.id, row.active)}
						colour={toggleButtonProps.colour}
						disabled={toggleButtonProps.disabled || isPausing}
						isLoading={isPausing}
						className="w-16"
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
