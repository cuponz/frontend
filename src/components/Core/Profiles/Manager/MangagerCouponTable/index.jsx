import { useMemo, useState } from "react";

import { getCoupons } from "@/api/coupon";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";
import { CouponState } from "@/constants";

import Button from "@/components/Utils/Button";
import columns from "./columns";
import { useCategoryStore } from "@/store/categories";

import useManagerCouponTableMutations from "./useManagerCouponTableMutations";

import LoadingSpinner from "@/components/Utils/LoadingSpinner";

const ManagerCouponTable = () => {
	const categoryObjects = useCategoryStore((state) => state.categories);
	const categories = useMemo(
		() => (categoryObjects || []).map((category) => category.name),
		[categoryObjects]
	);

	const {
		isLoading,
		error,
		data: coupons = [],
	} = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});

	const [toggleApprovalMutation, deleteMutation] = useManagerCouponTableMutations();

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
			}
		);
	};

	const handleDelete = (couponId) => {
		if (window.confirm("Are you sure you want to delete this coupon?")) {
			updateLoadingState(couponId, "isEditing", true);
			deleteMutation.mutate(couponId, {
				onSettled: () => updateLoadingState(couponId, "isEditing", false),
			});
		}
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
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Shop Coupons</h1>
				<Button onClick={() => setIsCreateCouponOpen(true)} colour="yellow-500">
					Create Coupon
				</Button>
			</div>

			<DataTable
				columns={columns(
					handleToggleApproval,
					handleDelete,
					mutationLoadingStates,
				)}
				data={coupons}
				filename="manager_coupons.csv"
				additionalFilters={additionalFilters}
			/>
		</div>
	);
};

export default ManagerCouponTable;
