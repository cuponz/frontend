import { useState, useEffect, useRef } from "react";
import { useTranslations } from "@/store/languages";
import { useGroupStore } from "@/store/groups";

import Button from "@/components/Utils/Button";

import { toast } from "sonner";

/**
 * PopupCreateCategory component renders a popup form for creating or editing a category.
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
const PopupCreateCategory = ({
	isOpen,
	onClose,
	onSubmit,
	isCreating,
	required = true,
}) => {
	const { t } = useTranslations();
	const groups = useGroupStore((state) => state.groups);

	const [formData, setFormData] = useState({
		name: "",
		group_id: 0,
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

		const hasChanges = Object.keys(formData).some(
			(key) =>
				!(
					formData[key] === undefined ||
					formData[key]?.length === 0 ||
					formData[key] === 0
				),
		);

		console.log(hasChanges)

		if (!required && !hasChanges) {
			toast.error(t(["PopupErrors", "contentErr1"]));
			return;
		} 

		if (!formData.name.trim()) {
			delete formData.name;
		}

		onSubmit(formData)
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
							Select Group
						</label>
						<select
							name="group_id"
							value={formData.group_id}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
							required={required}
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
							value={formData.name}
							onChange={handleChange}
							name="name"
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
							required={required}
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
							{required ? "Create Category" : "Edit Category"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PopupCreateCategory;
