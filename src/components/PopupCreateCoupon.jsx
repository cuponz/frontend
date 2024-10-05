import { useState, useCallback, useMemo } from "react";
import PopupThankYou from "../components/PopupThankYou";
import { CouponRequirementType } from "../constants";
import { useCategoryStore } from "../store/categories";

const userInfoOptions = {
	Email: "Email",
	PhoneNumber: "Phone Number",
	EmailOrPhoneNumber: "Email or Phone Number",
	EmailAndPhoneNumber: "Email and Phone Number",
};

const PopupCreateCoupon = ({ isOpen, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		category: "",
		couponName: "",
		startDate: "",
		endDate: "",
		image: null,
		description: "",
		userInfoRequired: CouponRequirementType.Email,
	});
	const [showThankYou, setShowThankYou] = useState(false);
	const categories = useCategoryStore((state) => state.categories);

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}, []);

	const handleImageUpload = useCallback((e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prev) => ({ ...prev, image: file }));
		}
	}, []);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (!formData.image) {
				alert("Please upload an image for the coupon.");
				return;
			}
			console.log(formData);
			onSubmit(formData);
			setShowThankYou(true);
		},
		[formData, onSubmit],
	);

	const handleCloseThankYou = useCallback(() => {
		setShowThankYou(false);
		onClose();
	}, [onClose]);

	const renderInput = useCallback(
		({ label, name, type = "text", ...rest }) => (
			<div className="sm:col-span-2 md:col-span-1">
				<label className="block text-sm font-medium text-gray-700">
					{label}
				</label>
				<input
					type={type}
					name={name}
					value={formData[name]}
					onChange={handleChange}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					required
					{...rest}
				/>
			</div>
		),
		[formData, handleChange],
	);

	const renderSelect = useMemo(
		() => (
			<div className="sm:col-span-2 md:col-span-1">
				<label className="block text-sm font-medium text-gray-700">
					Category
				</label>
				<select
					name="category"
					value={formData.category}
					onChange={handleChange}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					required
				>
					<option value="">Select a category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>
		),
		[categories, formData.category, handleChange],
	);

	if (!isOpen) return null;
	if (showThankYou)
		return <PopupThankYou isOpen={true} onClose={handleCloseThankYou} />;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
			<div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Create Coupon</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						✕
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
						{renderSelect}
						{renderInput({ label: "Coupon Name", name: "couponName" })}
						{renderInput({
							label: "Start Date",
							name: "startDate",
							type: "date",
						})}
						{renderInput({ label: "End Date", name: "endDate", type: "date" })}
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Coupon Image
						</label>
						<div className="mt-1 flex items-center">
							<input
								id="image-upload"
								type="file"
								onChange={handleImageUpload}
								className="hidden"
								accept="image/*"
								required
							/>
							<button
								type="button"
								onClick={() => document.getElementById("image-upload").click()}
								className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
							>
								{formData.image ? "Change Image" : "Upload Image"}
							</button>
							{formData.image && (
								<span className="ml-3 text-sm text-gray-600">
									{formData.image.name}
								</span>
							)}
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							rows="3"
							placeholder="Write your message.."
						></textarea>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							User Information Required
						</label>
						<div className="mt-2 space-x-4">
							{Object.entries(userInfoOptions).map(([key, value]) => (
								<label key={key} className="inline-flex items-center">
									<input
										type="radio"
										name="userInfoRequired"
										value={CouponRequirementType[key]}
										checked={
											formData.userInfoRequired === CouponRequirementType[key]
										}
										onChange={handleChange}
										className="form-radio"
									/>
									<span className="ml-2">{value}</span>
								</label>
							))}
						</div>
					</div>
					<button
						type="submit"
						className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
					>
						Create Coupon
					</button>
				</form>
			</div>
		</div>
	);
};

export default PopupCreateCoupon;
