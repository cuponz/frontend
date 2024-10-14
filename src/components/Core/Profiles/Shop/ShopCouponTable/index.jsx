import { useMemo, useState } from "react";

// import PopupCreateCoupon from "@/components/PopupCreateCoupon";
import PopupCreateCoupon from "@/components/Popup/CreateCoupon";
import PopupThankYou from "@/components/Popup/ThankYou";
import { getCouponsByShopIdFromShop } from "@/api/coupon";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";

import Button from "@/components/Utils/Button";
import columns from "./columns";
import { useCategoryStore } from "@/store/categories";

import useShopCouponTableMutations from "./useShopCouponTableMutations";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";

const ShopCouponTable = () => {
	const categoryObjects = useCategoryStore((state) => state.categories);
	const categories = useMemo(
		() => (categoryObjects || []).map((category) => category.name),
		[categoryObjects],
	);

	const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);
	const [isEditCouponOpen, setIsEditCouponOpen] = useState(false);
	const [editId, setEditId] = useState(false);
	const [isShowThankYou, setIsShowThankYou] = useState(false);

	const handleCloseCreateCoupon = () => {
		setIsCreateCouponOpen(false);
	};

	const handleCloseThankYou = () => {
		setIsCreateCouponOpen(false);
		setIsShowThankYou(false);
	};

	const handleCloseEditCoupon = () => {
		setIsEditCouponOpen(false);
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
			formData.append(key, couponData[key]);
		}

		console.log(formData);

		createMutation.mutate(formData);
	};

	const handleSubmitEditCoupon = (couponData) => {
		const formData = new FormData();

		for (const key in couponData) {
			if (
				!(
					couponData[key] === undefined ||
					couponData[key]?.length === 0 ||
					couponData[key] === 0
				)
			) {
				formData.append(key, couponData[key]);
			}
		}

		console.log(formData);

		editMutation.mutate({ couponId: editId, couponData: formData });
	};

	// Action handlers
	const handleEdit = (couponId) => {
		setEditId(couponId);
		setIsEditCouponOpen(true);
	};

	const handleStateToggle = (couponId, currentState) => {
		const newState = !currentState;

		updateLoadingState(couponId, "isPausing", true);

		pauseMutation.mutate(
			{ couponId, state: newState },
			{
				onSettled: () => updateLoadingState(couponId, "isPausing", false),
			},
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
					handleEdit,
					handleStateToggle,
					handleDelete,
					mutationLoadingStates,
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

			{isEditCouponOpen && (
				<PopupCreateCoupon
					isOpen={isEditCouponOpen}
					onClose={handleCloseEditCoupon}
					onSubmit={handleSubmitEditCoupon}
					isCreating={createMutation.isPending}
					createError={createMutation.error}
					couponImage={coupons[editId].logo_url}
					couponData={coupons[editId]}
					required={false}
				/>
			)}

			{isShowThankYou && (
				<PopupThankYou isOpen={true} onClose={handleCloseThankYou} />
			)}
		</div>
	);
};

export default ShopCouponTable;
