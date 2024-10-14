import { Fragment } from "react";
import { format } from "date-fns";
import Button from "@/components/Utils/Button";
import getStateToggleButtonProps from "./getStateToggleButtonProps"; // Create this helper function

import StatusBadge from "@/components/Core/Profiles/StatusBadge";

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
		cell: (value, row) => `${value}/${row.max_usage || "∞"}`,
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
		accessor: "actions",
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
