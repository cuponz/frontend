import { useMemo, useState } from "react";

import PopupCreateCoupon from "@/components/PopupCreateCoupon";
import {
	getCouponsByShopIdFromShop,
	editCoupon,
	pauseCoupon,
	deleteCoupon,
} from "@/api/coupon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";
import { CouponState } from "@/constants";

import Button from "@/components/Utils/Button";
import columns from "./columns";
import { useCategoryStore } from "@/store/categories";
import getStateToggleButtonProps from "./getStateToggleButtonProps";

import { toast } from "sonner";

const ShopCouponTable = () => {
	const categoryObjects = useCategoryStore((state) => state.categories);
	const categories = useMemo(
		() => categoryObjects.map((category) => category.name),
		[categoryObjects]
	);

	const queryClient = useQueryClient();
	const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);
	const QUERY_KEY = ["get", "coupons", "shop"];

	const {
		isLoading,
		error,
		data: coupons = [],
	} = useQuery({
		queryKey: QUERY_KEY,
		queryFn: getCouponsByShopIdFromShop,
		retry: false,
	});

	// Mutations
	const editMutation = useMutation({
		mutationFn: editCoupon,
		onSuccess: () => {
			toast.success("Coupon edited successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update coupon");
		},
	});

	const pauseMutation = useMutation({
		mutationFn: pauseCoupon,
		onSuccess: (data) => {
			const message =
				data.state === CouponState.Pause
					? "Coupon paused successfully"
					: "Coupon activated successfully";
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to pause coupon");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteCoupon,
		onSuccess: () => {
			toast.success("Coupon deleted successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to delete coupon");
		},
	});

	// Action handlers
	const handleEdit = (couponId) => {
		editMutation.mutate(couponId);
	};

	const handleStateToggle = (couponId, currentState) => {
		const newState =
			currentState === CouponState.Active
				? CouponState.Pause
				: CouponState.Active;

		pauseMutation.mutate({ couponId, state: newState });
	};

	const handleDelete = (couponId) => {
		if (window.confirm("Are you sure you want to delete this coupon?")) {
			deleteMutation.mutate(couponId);
		}
	};

	const mutationLoadingStates = {
		isEditLoading: editMutation.isPending,
		isPauseLoading: pauseMutation.isPending,
		isDeleteLoading: deleteMutation.isPending,
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
					handleEdit,
					handleStateToggle,
					handleDelete,
					mutationLoadingStates
				)}
				data={coupons}
				filename="shop_coupons.csv"
				additionalFilters={additionalFilters}
			/>

			{isCreateCouponOpen && (
				<PopupCreateCoupon
					isOpen={isCreateCouponOpen}
					onClose={handleCloseCreateCoupon}
					onSubmit={handleSubmitCreateCoupon}
				/>
			)}
		</div>
	);
};

export default ShopCouponTable;
