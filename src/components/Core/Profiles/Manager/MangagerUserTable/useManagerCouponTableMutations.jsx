import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, deleteUser } from "@/api/user";
import { toast } from "sonner";

const useManagerpUserTableMutations = (refetch) => {
	const QUERY_KEY = ["get", "all", "shops"];
	const queryClient = useQueryClient();

	const updateShopMutation = useMutation({
		mutationFn: updateUser,
		onSuccess: (data) => {
			toast.success("Update shop successfully.");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update shop");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			toast.success("Shop deleted successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to delete coupon");
		},
	});

	return [updateShopMutation, deleteMutation];
};

export default useManagerpUserTableMutations;