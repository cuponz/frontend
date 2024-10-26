import { useState, useMemo } from "react";

import { getCategories } from "@/api/category";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import DataTable from "@/components/Wrapper/DataTable";
import { useCategoryStore } from "@/store/categories";

import Button from "@/components/Utils/Button";

const CategoryTable = ({ onBack }) => {
	const setCategories = useCategoryStore((state) => state.setCategories);

	const [selectedCategoryId, setSelectedCategoryId] = useState(false);
	const [mutationLoadingStates, setMutationLoadingStates] = useState({});

	const { isLoading, error, data } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
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
		() => data.find((category) => category.id === selectedCategoryId),
		[selectedCategoryId],
	);

	const columns = [
		{ header: "Group Name", accessor: "group_name" },
		{ header: "Name", accessor: "name" },
		{
			header: "Actions",
			cell: (_, row) => {
				const isEditing = mutationLoadingStates[row.id]?.isEditing;
				const isDeleting = mutationLoadingStates[row.id]?.isDeleting;

				return (
					<div
						key={`${row.id}-btn-actions`}
						className="flex justify-center space-x-2"
					>
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

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		throw error;
	}

	return (
		<div className="p-4">
			<DataTable
				columns={columns}
				data={data}
				name={`Categories`}
				filename={`categories`}
				rightButtons={[
					{
						action: onBack,
						colour: "yellow-500",
						content: "Back",
					},
				]}
			/>
		</div>
	);
};

export default CategoryTable;
