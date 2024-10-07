import { useMemo, useState } from "react";

// import PopupCreateCoupon from "@/components/PopupCreateCoupon";
import PopupCreateCoupon from "@/components/Popup/CreateCoupon";
import PopupThankYou from "@/components/Popup/ThankYou";
import { getCouponsByShopIdFromShop } from "@/api/coupon";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";
import { CouponState } from "@/constants";

import Button from "@/components/Utils/Button";
import columns from "./columns";
import { useCategoryStore } from "@/store/categories";

import useShopCouponTableMutations from "./useShopCouponTableMutations";
import { creatingCoupon } from "@/api/coupon";

const ShopCouponTable = () => {
	const categoryObjects = useCategoryStore((state) => state.categories);
	const categories = useMemo(
		() => categoryObjects.map((category) => category.name),
		[categoryObjects]
	);

	const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);
	const [isShowThankYou, setIsShowThankYou] = useState(false);

	const handleCloseCreateCoupon = () => {
		setIsCreateCouponOpen(false);
	};

	const handleCloseThankYou = () => {
		setIsCreateCouponOpen(false);
		setIsShowThankYou(false);
	};

	const {
		isLoading,
		error,
		data: coupons = [],
	} = useQuery({
		queryKey: ["get", "coupons", "shop"],
		queryFn: getCouponsByShopIdFromShop,
		retry: false,
	});

	const [createMutation, editMutation, pauseMutation, deleteMutation] =
		useShopCouponTableMutations(setIsCreateCouponOpen, setIsShowThankYou);

	const handleSubmitCreateCoupon = (couponData) => {
		const formData = new FormData();

		for (const key in couponData) {
			if (couponData.hasOwnProperty(key)) {
				formData.append(key, couponData[key]);
			}
		}

		console.log(formData);

		// createMutation.mutate(formData);
	};

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

	const mutationLoadingStates = useMemo(
		() => ({
			editingId: editMutation.isPending ? editMutation.variables : null,
			pausingId: pauseMutation.isPending
				? pauseMutation.variables?.couponId
				: null,
			deletingId: deleteMutation.isPending ? deleteMutation.variables : null,
		}),
		[
			editMutation.isPending,
			editMutation.variables,
			pauseMutation.isPending,
			pauseMutation.variables,
			deleteMutation.isPending,
			deleteMutation.variables,
		]
	);

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
					isCreating={createMutation.isPending}
					createError={createMutation.error}
				/>
			)}

			{isShowThankYou && (
				<PopupThankYou isOpen={true} onClose={handleCloseThankYou} />
			)}
		</div>
	);
};

export default ShopCouponTable;
