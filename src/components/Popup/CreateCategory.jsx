import Button from "@/components/Button";

const PopupCreateCategory = () => {
	const groups = [
		{ id: 1, name: "Electronics" },
		{ id: 2, name: "Clothing" },
		{ id: 3, name: "Books" },
		{ id: 4, name: "Sports" },
	];

	const [categoryName, setCategoryName] = useState("");
	const [selectedGroup, setSelectedGroup] = useState("");

	const handleCreateCategory = (e) => {
		e.preventDefault();
		if (categoryName.trim() && selectedGroup) {
			console.log("Category created:", {
				name: categoryName,
				groupId: selectedGroup,
			});
			setCategoryName("");
			setSelectedGroup("");
			setIsCategoryModalOpen(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">

				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-gray-800">
						Create New Category
					</h2>
					<button
						onClick={() => setIsCategoryModalOpen(false)}
						className="text-gray-500 hover:text-gray-700"
					>
						✕
					</button>
				</div>

				<form onSubmit={handleCreateCategory} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Select Group
						</label>
						<select
							value={selectedGroup}
							onChange={(e) => setSelectedGroup(e.target.value)}
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
							required
						>
							<option value="">Select a group</option>
							{groups.map((group) => (
								<option key={group.id} value={group.id}>
									{group.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Category Name
						</label>
						<input
							type="text"
							placeholder="Enter category name"
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
							required
						/>
					</div>

					<div className="flex justify-end space-x-3">
						<Button
							type="button"
							onClick={() => setIsCategoryModalOpen(false)}
							colour="gray-500"
							className="px-4 py-2"
						>
							Cancel
						</Button>
						<Button type="submit" colour="yellow-500" className="px-4 py-2">
							Create Category
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PopupCreateCategory;