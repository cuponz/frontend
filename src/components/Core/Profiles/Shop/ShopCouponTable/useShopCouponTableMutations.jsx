import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import {
	creatingCoupon,
	editCoupon,
	pauseCoupon,
	deleteCoupon,
} from "@/api/coupon";
import { toast } from "sonner";
import { CouponState } from "@/constants";

const useShopCouponTableMutations = (setIsCreateCouponOpen) => {
	const QUERY_KEY = ["get", "coupons", "shop"];
	const queryClient = useQueryClient();
	const [isShowThankYou, setIsShowThankYou] = useState(false);

	useEffect(() => {
		const shouldShow = localStorage.getItem("showThankYouPopup");
		if (shouldShow === "false") {
			setIsShowThankYou(false);
		}
	}, []);

	const showThankYouPopup = useCallback(() => {
		const shouldShow = localStorage.getItem("showThankYouPopup");
		if (shouldShow !== "false") {
			setIsShowThankYou(true);
		}
	}, []);

	const createMutation = useMutation({
		mutationFn: creatingCoupon,
		onSuccess: () => {
			setIsCreateCouponOpen(false);
			showThankYouPopup();
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			console.error(error);
			toast.error("Failed to create coupon");
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

	const handleCloseThankYou = useCallback((dontShowAgain) => {
		if (dontShowAgain) {
			localStorage.setItem("showThankYouPopup", "false");
		}
		setIsShowThankYou(false);
	}, []);

	return {
		createMutation,
		editMutation,
		pauseMutation,
		deleteMutation,
		isShowThankYou,
		handleCloseThankYou,
	};
};

export default useShopCouponTableMutations;
