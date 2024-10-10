import { format } from "date-fns";
import Button from "@/components/Utils/Button";
import getStateToggleButtonProps from "./getStateToggleButtonProps"; // Create this helper function
import { CouponState } from "@/constants";

const columns = (
	handleEdit,
	handleStateToggle,
	handleDelete,
	mutationLoadingStates
) => [
	{
		header: "ID",
		accessor: "id",
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
		header: "State",
		accessor: "state",
		cell: (value) => Object.keys(CouponState)[value],
	},
	{
		header: "Actions",
		accessor: "actions",
		cell: (_, row) => {
			const toggleButtonProps = getStateToggleButtonProps(row.state);

			const isEditing = mutationLoadingStates[row.id]?.isEditing;
			const isPausing = mutationLoadingStates[row.id]?.isPausing;
			const isDeleting = mutationLoadingStates[row.id]?.isDeleting;

			return (
				<div className="flex justify-center space-x-2">
					<Button
						onClick={() => handleEdit(row.id)}
						colour="yellow-500"
						disabled={isEditing}
						isLoading={isEditing}
					>
						Edit
					</Button>
					<Button
						onClick={() => handleStateToggle(row.id, row.state)}
						colour={toggleButtonProps.colour}
						disabled={toggleButtonProps.disabled || isPausing}
						isLoading={isPausing}
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
