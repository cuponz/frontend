import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCoupon, pauseCoupon, deleteCoupon } from '@/api/coupon';
import { toast } from 'sonner';
import { CouponState } from '@/constants';

const useShopCouponTableMutations = () => {
	const QUERY_KEY = ["get", "coupons", "shop"];
  const queryClient = useQueryClient();

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


  return [
    editMutation,
    pauseMutation,
    deleteMutation,
  ];
};

export default useShopCouponTableMutations;
