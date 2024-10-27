import { useState, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useCategoryStore } from "@/store/categories";

import { getCategoriesByGroupIdByManager, createCategory, editCategory, deleteCategory } from "@/api/category";

import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import DataTable from "@/components/Wrapper/DataTable";
import Button from "@/components/Utils/Button";
import PopupDeleteConfirm from "@/components/Popup/DeleteConfirm";
import PopupCreateCategory from "@/components/Popup/CreateCategory";

import { toast } from "sonner";

const CategoryTable = ({ groupId, onBack }) => {
	const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
	const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
	const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
	const [selectedCategoryId, setSelectedCategoryId] = useState(false);

	const [mutationLoadingStates, setMutationLoadingStates] = useState({});

	const setCategories = useCategoryStore((state) => state.setCategories);

	const updateLoadingState = (id, key, value) => {
		setMutationLoadingStates((prevState) => ({
			...prevState,
			[id]: {
				...prevState[id],
				[key]: value,
			},
		}));
	};

	const QUERY_KEY = ["categories", "manager", groupId];
	const queryClient = useQueryClient();

	const refetchCategoriesAndUpdateStore = async () => {
		const updatedCategories = await queryClient.fetchQuery({ queryKey: ["categories"] });
		setCategories(updatedCategories);
	};

	const {
		isLoading,
		error,
		data: categories = [],
	} = useQuery({
		queryKey: QUERY_KEY,
		queryFn: () => getCategoriesByGroupIdByManager(groupId),
		retry: false,
	});

	const handleEdit = (categoryId) => {
		setSelectedCategoryId(categoryId);
		setIsEditCategoryOpen(true);
	};

	const handleDelete = (categoryId) => {
		setSelectedCategoryId(categoryId);
		setIsDeleteCategoryOpen(true);
	};

	// use for delete and edit
	const selectedCategory = useMemo(
		() => categories.find((category) => category.id === selectedCategoryId),
		[selectedCategoryId],
	);

	const createMutation = useMutation({
		mutationFn: createCategory,
		onSuccess: (data) => {
			toast.success("Create category successfully.");
			setIsCreateCategoryOpen(false);
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			refetchCategoriesAndUpdateStore();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update category");
		},
	});

	const editMutation = useMutation({
		mutationFn: editCategory,
		onSuccess: (data) => {
			toast.success("Update category successfully.");
			setIsEditCategoryOpen(false);
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			refetchCategoriesAndUpdateStore();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update category");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			toast.success("Category deleted successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			refetchCategoriesAndUpdateStore();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to delete category");
		},
	});

	const columns = [
		{ header: "ID", accessor: "id", sortType: "number" },
		{ header: "Name", accessor: "name" },
		{ header: "Group Name", accessor: "group_name" },
		{ header: "Coupon Count", accessor: "coupon_count" },
		{
			header: "Actions",
			cell: (_, row) => {
				const isEditing = mutationLoadingStates[row.id]?.isEditing;
				const isDeleting = mutationLoadingStates[row.id]?.isDeleting;

				return (
					<div key={`${row.id}-btn-actions`} className="flex space-x-2">
						<Button
							onClick={() => handleEdit(row.id)}
							colour="yellow-500"
							disabled={isEditing}
							isLoading={isEditing}
						>
							Edit
						</Button>
						<Button
							onClick={() => handleDelete(row.id)}
							colour="red-500"
							disabled={isDeleting}
							isLoading={isDeleting}
						>
							Delete
						</Button>
					</div>
				);
			},
		},
	];

	const handleCloseDeleteCategory = () => {
		setIsDeleteCategoryOpen(false);
	};

	const handleConfirmDeleteCategory = () => {
		updateLoadingState(selectedCategoryId, "isDeleting", true);
		setIsDeleteCategoryOpen(false);
		deleteMutation.mutate(selectedCategoryId, {
			onSettled: () => {
				updateLoadingState(selectedCategoryId, "isDeleting", false);
			},
		});
	};

	const handleCloseCreateCategory = () => {
		setIsCreateCategoryOpen(false);
	};

	const handleCloseEditCategory = () => {
		setIsEditCategoryOpen(false);
	};

	const handleSubmitCreateCategory = (categoryData) => {
		createMutation.mutate(categoryData);
	};

	const handleSubmitEditCategory = (categoryData) => {
		editMutation.mutate({ categoryId: selectedCategoryId, categoryData });
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		throw error;
	}

	const rightButtons = [
		{
			action: () => setIsCreateCategoryOpen(true),
			colour: "blue-500",
			content: "Create Category",
		},
		{
			action: onBack,
			colour: "yellow-500",
			content: "Back",
		},
	];

	return (
		<div className="p-4">
			<DataTable
				columns={columns}
				data={categories}
				name={`Categories`}
				filename={`categories`}
				rightButtons={rightButtons}
			/>
			{isDeleteCategoryOpen && (
				<PopupDeleteConfirm
					isOpen={isDeleteCategoryOpen}
					onClose={handleCloseDeleteCategory}
					onConfirm={handleConfirmDeleteCategory}
					isDeleting={deleteMutation.isPending}
					extraMessage={`${selectedCategory.name} (ID: ${selectedCategory.id})`}
				/>
			)}
			{isCreateCategoryOpen && (
				<PopupCreateCategory
					isOpen={isCreateCategoryOpen}
					onClose={handleCloseCreateCategory}
					onSubmit={handleSubmitCreateCategory}
					isCreating={createMutation.isPending}
					createError={createMutation.error}
				/>
			)}

			{isEditCategoryOpen && (
				<PopupCreateCategory
					isOpen={isEditCategoryOpen}
					onClose={handleCloseEditCategory}
					onSubmit={handleSubmitEditCategory}
					isCreating={editMutation.isPending}
					createError={editMutation.error}
					required={false}
				/>
			)}
		</div>
	);
};

export default CategoryTable;
