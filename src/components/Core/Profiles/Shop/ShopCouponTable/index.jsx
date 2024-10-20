import { useMemo, useState } from "react";

import PopupCreateCoupon from "@/components/Popup/CreateCoupon";
import PopupThankYou from "@/components/Popup/ThankYou";
import PopupDeleteConfirm from "@/components/Popup/DeleteConfirm";

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
	const [isDeleteCouponOpen, setIsDeleteCouponOpen] = useState(false);
	const [selectedCouponId, setSelectedCouponId] = useState(false);
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

	const handleCloseDeleteCoupon = () => {
		setIsDeleteCouponOpen(false);
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

	// use for delete and edit
	const selectedCoupon = useMemo(
		() => coupons.find((coupon) => coupon.id === selectedCouponId),
		[selectedCouponId],
	);

	const [createMutation, editMutation, pauseMutation, deleteMutation] =
		useShopCouponTableMutations(
			handleCloseCreateCoupon,
			handleCloseEditCoupon,
		);

	const handleSubmitCreateCoupon = (couponData) => {
		const formData = new FormData();

		for (const key in couponData) {
			formData.append(key, couponData[key]);
		}

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

		editMutation.mutate({ couponId: selectedCouponId, couponData: formData });
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

	// Action handlers
	const handleEdit = (couponId) => {
		setSelectedCouponId(couponId);
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
		setSelectedCouponId(couponId);
		setIsDeleteCouponOpen(true);
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
					isCreating={editMutation.isPending}
					createError={editMutation.error}
					couponData={selectedCoupon}
					required={false}
				/>
			)}

			{isDeleteCouponOpen && (
				<PopupDeleteConfirm
					isOpen={isDeleteCouponOpen}
					onClose={handleCloseDeleteCoupon}
					onConfirm={handleConfirmDeleteCoupon}
					isDeleting={deleteMutation.isPending}
					couponData={selectedCoupon}
				/>
			)}

			{isShowThankYou && (
				<PopupThankYou isOpen={true} onClose={handleCloseThankYou} />
			)}
		</div>
	);
};

export default ShopCouponTable;
