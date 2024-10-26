import { useMemo, useState } from "react";

import { getCoupons } from "@/api/coupon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";
import { CouponState } from "@/constants";

import columns from "./columns";
import { useCategoryStore } from "@/store/categories";

import useManagerCouponTableMutations from "./useManagerCouponTableMutations";

import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import PopupDeleteConfirm from "@/components/Popup/DeleteConfirm";

/**
 * ManagerCouponTable component is responsible for displaying and managing a table of coupons.
 * It fetches coupon data, handles approval toggling, and deletion of coupons.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <ManagerCouponTable />
 *
 * @description
 * This component uses the following hooks:
 * - `useCategoryStore`: Fetches category data from the store.
 * - `useMemo`: Memoizes the categories and selected coupon.
 * - `useState`: Manages local state for delete confirmation modal and selected coupon ID.
 * - `useQuery`: Fetches coupon data from the server.
 * - `useManagerCouponTableMutations`: Provides mutation functions for toggling approval and deleting coupons.
 *
 * @function handleToggleApproval
 * @param {string} couponId - The ID of the coupon to toggle approval.
 * @param {string} currentState - The current state of the coupon.
 *
 * @function handleDelete
 * @param {string} couponId - The ID of the coupon to delete.
 *
 * @function handleConfirmDeleteCoupon
 * Confirms the deletion of the selected coupon.
 *
 * @function handleCloseDeleteCoupon
 * Closes the delete confirmation modal.
 *
 * @function updateLoadingState
 * @param {string} id - The ID of the coupon.
 * @param {string} key - The key of the loading state to update.
 * @param {boolean} value - The value of the loading state.
 *
 * @constant {Array} additionalFilters - Additional filters for the DataTable component.
 *
 * @throws Will throw an error if the query fails.
 */
const ManagerCouponTable = () => {
	const categoryObjects = useCategoryStore((state) => state.categories);
	const categories = useMemo(
		() => (categoryObjects || []).map((category) => category.name),
		[categoryObjects],
	);

	const [isDeleteCouponOpen, setIsDeleteCouponOpen] = useState(false);
	const [selectedCouponId, setSelectedCouponId] = useState(false);

	const {
		isLoading,
		error,
		data: coupons = [],
	} = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});

	const selectedCoupon = useMemo(
		() => coupons.find((coupon) => coupon.id === selectedCouponId),
		[selectedCouponId],
	);

	const [toggleApprovalMutation, deleteMutation] =
		useManagerCouponTableMutations();

	// Action handlers
	const handleToggleApproval = (couponId, currentState) => {
		const newState =
			currentState === CouponState.Approved
				? CouponState.Rejected
				: CouponState.Approved;

		updateLoadingState(couponId, "isApproving", true);

		toggleApprovalMutation.mutate(
			{ couponId, state: newState },
			{
				onSettled: () => updateLoadingState(couponId, "isApproving", false),
			},
		);
	};

	const handleDelete = (couponId) => {
		setSelectedCouponId(couponId);
		setIsDeleteCouponOpen(true);
	};

	const handleConfirmDeleteCoupon = () => {
		updateLoadingState(selectedCouponId, "isDeleting", true);
		setIsDeleteCouponOpen(false);
		deleteMutation.mutate(selectedCouponId, {
			onSettled: () => {
				updateLoadingState(selectedCouponId, "isDeleting", false);
			},
		});
	};

	const handleCloseDeleteCoupon = () => {
		setIsDeleteCouponOpen(false);
	};

	const [mutationLoadingStates, setMutationLoadingStates] = useState({});

	const updateLoadingState = (id, key, value) => {
		setMutationLoadingStates((prevState) => ({
			...prevState,
			[id]: {
				...prevState[id],
				[key]: value,
			},
		}));
	};

	const QUERY_KEY = ["get", "groups", "manager"];
	const queryClient = useQueryClient();

	const updateGroupMutation = useMutation({
		mutationFn: updateGroup,
		onSuccess: (data) => {
			toast.success("Update shop successfully.");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update shop");
		},
	});

	const deleteGroupMutation = useMutation({
		mutationFn: deleteGroup,
		onSuccess: () => {
			toast.success("Shop deleted successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to delete coupon");
		},
	});

	const additionalFilters = [
		{
			name: "category",
			type: "select",
			placeholder: "Filter by Category",
			options: categories,
		},
		{
			name: "start_date",
			type: "date",
			placeholder: "Start Date",
		},
		{
			name: "end_date",
			type: "date",
			placeholder: "End Date",
		},
	];

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		throw error;
	}

	return (
		<div className="p-4">
			<DataTable
				columns={columns(
					handleToggleApproval,
					handleDelete,
					mutationLoadingStates,
				)}
				data={coupons}
				name="Manager Coupons"
				filename="manager_coupons"
				additionalFilters={additionalFilters}
			/>

			{isDeleteCouponOpen && (
				<PopupDeleteConfirm
					isOpen={isDeleteCouponOpen}
					onClose={handleCloseDeleteCoupon}
					onConfirm={handleConfirmDeleteCoupon}
					isDeleting={deleteMutation.isPending}
					couponData={selectedCoupon}
				/>
			)}
		</div>
	);
};

export default ManagerCouponTable;
