import Button from "@/components/Utils/Button";

/**
 * PopupDeleteConfirm component renders a confirmation popup for deleting a coupon.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the popup is open.
 * @param {function} props.onClose - Function to call when closing the popup.
 * @param {function} props.onConfirm - Function to call when confirming the deletion.
 * @param {boolean} props.isDeleting - Indicates if the deletion process is ongoing.
 * @param {string} props.extraMessage - Extra information of the deleting object
 * @returns {JSX.Element|null} The rendered component or null if not open.
 */
const PopupDeleteConfirm = ({
	isOpen,
	onClose,
	onConfirm,
	isDeleting,
	extraMessage = "this",
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
				<h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
				<p className="mb-6">Are you sure you want to delete {extraMessage}?</p>
				<div className="flex justify-end space-x-2">
					<button
						className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
						onClick={onClose}
					>
						No
					</button>
					<Button
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
						isLoading={isDeleting}
						onClick={onConfirm}
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PopupDeleteConfirm;
