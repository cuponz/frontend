import { Fragment } from "react";
import Button from "@/components/Utils/Button";
import getStateToggleButtonProps from "./getStateToggleButtonProps";

import ShopBadge from "@/components/Core/Profiles/ShopBadge";

/**
 * Generates the columns configuration for the Manager User Table.
 *
 * @param {Function} handleToogleApproval - Function to handle toggling approval status.
 * @param {Function} handleDelete - Function to handle deleting a user.
 * @param {Function} handleChangeTier - Function to handle changing the user's tier.
 * @param {Object} mutationLoadingStates - Object containing loading states for various mutations.
 * @returns {Array<Object>} Array of column configuration objects.
 */
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
		header: "Viewing Status",
		cell: (_, row) => (
			<Fragment key={`${row.id}-status-badge`}>
				<ShopBadge approved={row.viewing_perm} />
			</Fragment>
		),
	},
	{
		header: "Viewing Perm",
		cell: (_, row) => {
			const toggleButtonProps = getStateToggleButtonProps(row.viewing_perm);

			const isApprovingViewPerm =
				mutationLoadingStates[row.id]?.isApproving_viewing_perm;

			return (
				<div className="flex justify-center space-x-2">
					<Button
						onClick={() =>
							handleToogleApproval("viewing_perm", row.id, row.viewing_perm)
						}
						colour={toggleButtonProps.colour}
						disabled={isApprovingViewPerm}
						isLoading={isApprovingViewPerm}
						className="w-24"
					>
						{toggleButtonProps.text}
					</Button>
				</div>
			);
		},
	},
	{
		header: "Active Status",
		cell: (_, row) => (
			<Fragment key={`${row.id}-status-badge`}>
				<ShopBadge approved={row.approved} />
			</Fragment>
		),
	},
	{
		header: "Actions",
		cell: (_, row) => {
			const toggleButtonProps = getStateToggleButtonProps(row.approved);

			const isApproving = mutationLoadingStates[row.id]?.isApproving_approved;
			const isDeleting = mutationLoadingStates[row.id]?.isDeleting;

			return (
				<div className="flex justify-center space-x-2">
					<Button
						onClick={() =>
							handleToogleApproval("approved", row.id, row.approved)
						}
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
