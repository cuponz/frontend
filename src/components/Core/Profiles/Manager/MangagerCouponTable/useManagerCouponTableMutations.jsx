import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveCoupon, deleteCoupon } from "@/api/coupon";
import { toast } from "sonner";
import { CouponState } from "@/constants";

const useManagerpCouponTableMutations = (refetch) => {
	const QUERY_KEY = ["get", "coupons"];
	const queryClient = useQueryClient();

	const toggleApprovalMutation = useMutation({
		mutationFn: approveCoupon,
		onSuccess: (data) => {
			const message =
				data.state === CouponState.Approved
					? "Coupon approved successfully"
					: "Coupon rejected successfully";
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

	return [toggleApprovalMutation, deleteMutation];
};

export default useManagerpCouponTableMutations;