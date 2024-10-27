import { useState, useEffect, useRef } from "react";

import Button from "@/components/Utils/Button";

/**
 * PopupCreateGroup component renders a popup form for creating or editing a group.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the popup is open.
 * @param {Function} props.onClose - Function to call when the popup is closed.
 * @param {Function} props.onSubmit - Function to call when the form is submitted.
 * @param {boolean} props.isCreating - Indicates if the coupon is being created.
 * @param {boolean} [props.required=true] - Indicates if the form fields are required.
 *
 * @returns {JSX.Element|null} The rendered component or null if not open.
 */
const PopupCreateGroup = ({
	isOpen,
	onClose,
	onSubmit,
	isCreating,
	required = true,
}) => {
	const [formData, setFormData] = useState({
		name: "",
	});

	const popupRef = useRef(null);

	const handleClickOutside = (e) => {
		if (popupRef.current && !popupRef.current.contains(e.target)) {
			onClose();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.name.trim()) {
			console.log("Group created:", formData.name);

			onSubmit(formData);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div
				ref={popupRef}
				className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
			>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Group Name
						</label>
						<input
							type="text"
							placeholder="Enter group name"
							value={formData.name}
							onChange={handleChange}
							name="name"
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
							required
						/>
					</div>

					<div className="flex justify-end space-x-3">
						<Button
							type="button"
							onClick={() => onClose()}
							colour="gray-500"
							className="px-4 py-2"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							colour="green-500"
							className="px-4 py-2"
							isLoading={isCreating}
						>
							{required ? "Create Group" : "Edit Group"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PopupCreateGroup;
