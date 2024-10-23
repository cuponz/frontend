import { Fragment } from "react";
import Button from "@/components/Utils/Button";
import getStateToggleButtonProps from "./getStateToggleButtonProps";

import ShopBadge from "@/components/Core/Profiles/ShopBadge";

const columns = (
	handleToogleApproval,
	handleDelete,
	handleChangeTier,
	mutationLoadingStates,
) => [
	{
		header: "ID",
		accessor: "id",
		sortType: "number",
	},
	{
		header: "Name",
		accessor: "name",
	},
	{
		header: "Email",
		accessor: "email",
	},
	{
		header: "Tier",
		accessor: "tier",
		cell: (_, row) => {
			const isChangingTier = mutationLoadingStates[row.id]?.isChangingTier;
			return (
				<input
					type="number"
					min="0"
					max="3"
					value={row.tier || 0}
					onChange={(e) => handleChangeTier(row.id, e.target.value)}
					className={`w-16 p-1 border rounded ${isChangingTier ? "opacity-50" : ""}`}
				/>
			);
		},
	},
	{
		header: "Status",
		cell: (_, row) => (
			<Fragment key={`${row.id}-status-badge`}>
				<ShopBadge approved={row.approved} />
			</Fragment>
		),
	},
	{
		header: "Actions",
		accessor: "actions",
		cell: (_, row) => {
			const toggleButtonProps = getStateToggleButtonProps(row.approved);

			const isApproving = mutationLoadingStates[row.id]?.isApproving;
			const isDeleting = mutationLoadingStates[row.id]?.isDeleting;

			return (
				<div className="flex justify-center space-x-2">
					{/* <Button
						onClick={() => handleToogleApproval(row.id, row.approved)}
						colour={toggleButtonProps.colour}
						disabled={isApproving}
						isLoading={isApproving}
						className="w-24"
					>
						{toggleButtonProps.text} Viewing
					</Button> */}
					<Button
						onClick={() => handleToogleApproval(row.id, row.approved)}
						colour={toggleButtonProps.colour}
						disabled={isApproving}
						isLoading={isApproving}
						className="w-24"
					>
						{toggleButtonProps.text} Account
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
