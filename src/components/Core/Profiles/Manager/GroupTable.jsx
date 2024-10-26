import { useState, useMemo } from "react";

import {
	getGroupsByManager,
	deleteGroup,
	editGroup,
	createGroup,
} from "@/api/group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import DataTable from "@/components/Wrapper/DataTable";

import Button from "@/components/Utils/Button";
import PopupDeleteConfirm from "@/components/Popup/DeleteConfirm";
import PopupCreateGroup from "@/components/Popup/CreateGroup";

import CategoryTable from "./CategoryTable";

import { toast } from "sonner";

const GroupTable = () => {
	const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false);
	const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
	const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
	const [selectedGroupId, setSelectedGroupId] = useState(false);
	const [mutationLoadingStates, setMutationLoadingStates] = useState({});
	const [showCateogryTable, setShowCategoryTable] = useState(false);

	const updateLoadingState = (id, key, value) => {
		setMutationLoadingStates((prevState) => ({
			...prevState,
			[id]: {
				...prevState[id],
				[key]: value,
			},
		}));
	};

	const QUERY_KEY = ["groups", "manager"];
	const queryClient = useQueryClient();

	const {
		isLoading,
		error,
		data: groups = [],
	} = useQuery({
		queryKey: QUERY_KEY,
		queryFn: getGroupsByManager,
	});

	const handleEdit = (groupId) => {
		setSelectedGroupId(groupId);
		setIsEditGroupOpen(true);
	};

	const handleDelete = (groupId) => {
		setSelectedGroupId(groupId);
		setIsDeleteGroupOpen(true);
	};

	const handleViewing = (groupId) => {
		setSelectedGroupId(groupId);
		setShowCategoryTable(true);
	};

	// use for delete and edit
	const selectedGroup = useMemo(
		() => groups.find((group) => group.id === selectedGroupId),
		[selectedGroupId],
	);

	const handleBack = () => {
		setShowCategoryTable(false);
		setSelectedGroupId(null);
	};

	const createMutation = useMutation({
		mutationFn: createGroup,
		onSuccess: (data) => {
			toast.success("Create group successfully.");
			setIsCreateGroupOpen(false);
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update group");
		},
	});

	const editMutation = useMutation({
		mutationFn: editGroup,
		onSuccess: (data) => {
			toast.success("Update group successfully.");
			setIsEditGroupOpen(false);
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update group");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteGroup,
		onSuccess: () => {
			toast.success("Group deleted successfully");
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to delete group");
		},
	});

	if (showCateogryTable && selectedGroupId) {
		return <CategoryTable groupId={selectedGroupId} onBack={handleBack} />;
	}

	const columns = [
		{ header: "Id", accessor: "id", sortType: "number" },
		{ header: "Name", accessor: "group_name" },
		{ header: "Coupon Count", accessor: "coupon_count" },
		{
			header: "Actions",
			cell: (_, row) => {
				const isEditing = mutationLoadingStates[row.id]?.isEditing;
				const isDeleting = mutationLoadingStates[row.id]?.isDeleting;
				const isViewing = mutationLoadingStates[row.id]?.isViewing;

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
						<Button
							onClick={() => handleViewing(row.id)}
							colour="gray-500"
							disabled={isViewing}
							isLoading={isViewing}
						>
							View Categories
						</Button>
					</div>
				);
			},
		},
	];

	const handleCloseDeleteGroup = () => {
		setIsDeleteGroupOpen(false);
	};

	const handleConfirmDeleteGroup = () => {
		updateLoadingState(selectedGroupId, "isDeleting", true);
		setIsDeleteGroupOpen(false);
		deleteMutation.mutate(selectedGroupId, {
			onSettled: () => {
				updateLoadingState(selectedGroupId, "isDeleting", false);
			},
		});
	};

	const handleCloseCreateGroup = () => {
		setIsCreateGroupOpen(false);
	};

	const handleCloseEditGroup = () => {
		setIsEditGroupOpen(false);
	};

	const handleSubmitCreateGroup = (groupData) => {
		createMutation.mutate(groupData);
	};

	const handleSubmitEditGroup = (groupData) => {
		editMutation.mutate({ groupId: selectedGroupId, groupData });
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		throw error;
	}

	const rightButtons = [
		{
			action: () => setIsCreateGroupOpen(true),
			colour: "yellow-500",
			content: "Create Group",
		},
	];

	return (
		<div className="p-4">
			<DataTable
				columns={columns}
				data={groups}
				name={`Groups`}
				filename={`groups`}
				rightButtons={rightButtons}
			/>
			{isDeleteGroupOpen && (
				<PopupDeleteConfirm
					isOpen={isDeleteGroupOpen}
					onClose={handleCloseDeleteGroup}
					onConfirm={handleConfirmDeleteGroup}
					isDeleting={deleteMutation.isPending}
					extraMessage={`${selectedGroup.group_name} (ID: ${selectedGroup.id})`}
				/>
			)}
			{isCreateGroupOpen && (
				<PopupCreateGroup
					isOpen={isCreateGroupOpen}
					onClose={handleCloseCreateGroup}
					onSubmit={handleSubmitCreateGroup}
					isCreating={createMutation.isPending}
					createError={createMutation.error}
				/>
			)}

			{isEditGroupOpen && (
				<PopupCreateGroup
					isOpen={isEditGroupOpen}
					onClose={handleCloseEditGroup}
					onSubmit={handleSubmitEditGroup}
					isCreating={editMutation.isPending}
					createError={editMutation.error}
					required={false}
				/>
			)}
		</div>
	);
};

export default GroupTable;
