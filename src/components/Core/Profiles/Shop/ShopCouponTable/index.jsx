import { useMemo, useState } from "react";

import PopupCreateCoupon from "@/components/Popup/CreateCoupon";
import PopupThankYou from "@/components/Popup/ThankYou";
import PopupDeleteConfirm from "@/components/Popup/DeleteConfirm";

import { getCouponsByShopIdFromShop } from "@/api/coupon";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";

import columns from "./columns";
import { useCategoryStore } from "@/store/categories";

import useShopCouponTableMutations from "./useShopCouponTableMutations";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";

/**
 * ShopCouponTable component renders a table of shop coupons with functionalities to create, edit, delete, and filter coupons.
 * It uses various hooks and mutations to manage the state and perform actions on the coupons.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *   <ShopCouponTable />
 * )
 *
 * @typedef {Object} CouponData
 * @property {string} id - The unique identifier of the coupon.
 * @property {string} name - The name of the coupon.
 * @property {string} category - The category of the coupon.
 * @property {string} start_date - The start date of the coupon.
 * @property {string} end_date - The end date of the coupon.
 *
 * @typedef {Object} MutationLoadingStates
 * @property {boolean} isDeleting - Indicates if the coupon is being deleted.
 * @property {boolean} isPausing - Indicates if the coupon is being paused.
 *
 * @typedef {Object} AdditionalFilter
 * @property {string} name - The name of the filter.
 * @property {string} type - The type of the filter (e.g., "select", "date").
 * @property {string} placeholder - The placeholder text for the filter.
 * @property {Array<string>} [options] - The options for the filter if it's a select type.
 *
 * @typedef {Object} RightButton
 * @property {Function} action - The action to be performed when the button is clicked.
 * @property {string} colour - The colour of the button.
 * @property {string} content - The content/text of the button.
 *
 * @hook useCategoryStore - Custom hook to get the category store state.
 * @hook useQuery - React Query hook to fetch coupons data.
 * @hook useShopCouponTableMutations - Custom hook to get mutations for creating, editing, pausing, and deleting coupons.
 * @hook useState - React hook to manage component state.
 * @hook useMemo - React hook to memoize values.
 *
 * @function handleCloseCreateCoupon - Closes the create coupon popup.
 * @function handleCloseThankYou - Closes the thank you popup.
 * @function handleCloseEditCoupon - Closes the edit coupon popup.
 * @function handleCloseDeleteCoupon - Closes the delete coupon popup.
 * @function handleSubmitCreateCoupon - Submits the create coupon form data.
 * @function handleSubmitEditCoupon - Submits the edit coupon form data.
 * @function handleConfirmDeleteCoupon - Confirms the deletion of a coupon.
 * @function handleEdit - Opens the edit coupon popup with the selected coupon data.
 * @function handleStateToggle - Toggles the state of a coupon (active/inactive).
 * @function handleDelete - Opens the delete coupon popup with the selected coupon data.
 * @function updateLoadingState - Updates the loading state for a specific coupon and action.
 */
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
		useShopCouponTableMutations(handleCloseCreateCoupon, handleCloseEditCoupon);

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

	const rightButtons = [
		{
			action: () => setIsCreateCouponOpen(true),
			colour: "yellow-500",
			content: "Create Coupon",
		},
	];

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Shop Coupons</h1>
			</div>

			<DataTable
				columns={columns(
					handleEdit,
					handleStateToggle,
					handleDelete,
					mutationLoadingStates,
				)}
				data={coupons}
				name="Shop Coupons"
				filename="shop_coupons.csv"
				additionalFilters={additionalFilters}
				rightButtons={rightButtons}
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
