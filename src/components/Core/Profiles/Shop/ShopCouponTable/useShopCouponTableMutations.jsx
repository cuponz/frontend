import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	creatingCoupon,
	editCoupon,
	pauseCoupon,
	deleteCoupon,
} from "@/api/coupon";
import { toast } from "sonner";

const useShopCouponTableMutations = (
	setIsCreateCouponOpen,
	setIsShowThankYou,
	onCloseCreateCoupon,
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
