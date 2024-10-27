import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, deleteUser } from "@/api/user";
import { toast } from "sonner";

/**
 * Custom hook for managing user table mutations in the Manager component.
 *
 * @param {Function} updateLoadingState - Function to update the loading state.
 * @returns {Object[]} - Returns an array containing the updateShopMutation and deleteMutation objects.
 *
 * @typedef {Object} Mutation
 * @property {Function} mutationFn - The function to perform the mutation.
 * @property {Function} onSuccess - Callback function to be executed on successful mutation.
 * @property {Function} onError - Callback function to be executed on mutation error.
 *
 * @typedef {Object} UpdateShopMutation
 * @property {Mutation} updateShopMutation - Mutation object for updating a shop.
 *
 * @typedef {Object} DeleteMutation
 * @property {Mutation} deleteMutation - Mutation object for deleting a shop.
 *
 * @example
 * const [updateShopMutation, deleteMutation] = useManagerpUserTableMutations(updateLoadingState);
 *
 * updateShopMutation.mutate(shopData);
 * deleteMutation.mutate(shopId);
 */
const useManagerpUserTableMutations = (updateLoadingState) => {
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
