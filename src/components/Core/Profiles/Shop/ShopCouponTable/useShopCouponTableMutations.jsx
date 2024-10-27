import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	creatingCoupon,
	editCoupon,
	pauseCoupon,
	deleteCoupon,
} from "@/api/coupon";
import { toast } from "sonner";

/**
 * Custom hook that provides mutations for managing shop coupons.
 *
 * @param {Function} onCloseCreateCoupon - Callback function to be called after a coupon is successfully created.
 * @param {Function} onCloseEditCoupon - Callback function to be called after a coupon is successfully edited.
 * @returns {Array} An array containing the following mutations:
 *   - createMutation: Mutation for creating a new coupon.
 *   - editMutation: Mutation for editing an existing coupon.
 *   - pauseMutation: Mutation for pausing or activating a coupon.
 *   - deleteMutation: Mutation for deleting a coupon.
 */
const useShopCouponTableMutations = (
	onCloseCreateCoupon,
	onCloseEditCoupon,
) => {
	const QUERY_KEY = ["get", "coupons", "shop"];
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: creatingCoupon,
		onSuccess: () => {
			toast.success("Coupon create successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });

			onCloseCreateCoupon();
		},
		onError: () => {
			toast.error(error.message || "Failed to create coupon");
			console.log(error);
		},
	});

	const editMutation = useMutation({
		mutationFn: editCoupon,
		onSuccess: () => {
			toast.success("Coupon edited successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });

			onCloseEditCoupon();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update coupon");
		},
	});

	const pauseMutation = useMutation({
		mutationFn: pauseCoupon,
		onSuccess: (data) => {
			const message = data.active
				? "Coupon activated successfully"
				: "Coupon paused successfully";
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

	return [createMutation, editMutation, pauseMutation, deleteMutation];
};

export default useShopCouponTableMutations;
