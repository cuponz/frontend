import React from "react";
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
		header: "Title",
		accessor: "title",
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

			return (
				<div className="flex justify-center space-x-2">
					<Button
						onClick={(e) => {
							e.preventDefault();
							handleEdit(row.id);
						}}
						colour="yellow-500"
						disabled={mutationLoadingStates.isEditLoading}
					>
						Edit
					</Button>
					<Button
						onClick={(e) => {
							e.preventDefault();
							handleStateToggle(row.id, row.state);
						}}
						colour={toggleButtonProps.colour}
						disabled={
							toggleButtonProps.disabled || mutationLoadingStates.isPauseLoading
						}
					>
						{toggleButtonProps.text}
					</Button>
					<Button
						onClick={(e) => {
							e.preventDefault();
							handleDelete(row.id);
						}}
						colour="red-500"
						disabled={mutationLoadingStates.isDeleteLoading}
					>
						Delete
					</Button>
				</div>
			);
		},
	},
];

export default columns;
