import { useMemo, useState } from "react";

import { getCoupons } from "@/api/coupon";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";
import { CouponState } from "@/constants";

import columns from "./columns";
import { useCategoryStore } from "@/store/categories";

import useManagerCouponTableMutations from "./useManagerCouponTableMutations";

import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import PopupDeleteConfirm from "@/components/Popup/DeleteConfirm";

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
				filename="manager_coupons.csv"
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
