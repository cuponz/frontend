const DeleteConfirm = ({
	isOpen,
	onClose,
	onConfirm,
	itemName = "this item",
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
				<h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
				<p className="mb-6">Are you sure you want to delete {itemName}?</p>
				<div className="flex justify-end space-x-2">
					<button
						className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
						onClick={onClose}
					>
						No
					</button>
					<button
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
						onClick={onConfirm}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirm;
