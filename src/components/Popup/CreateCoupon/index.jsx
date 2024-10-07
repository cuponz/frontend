import { useState } from "react";
import { CouponRequirementType } from "@/constants";
import { useCategoryStore } from "@/store/categories";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

import UserInfoOptions from "./UserInfoOptions";
import CouponFormFields from "./CouponFormFields";
import ImageUpload from "./ImageUpload";
import Button from "@/components/Utils/Button";

const PopupCreateCoupon = ({
	isOpen,
	onClose,
	onSubmit,
	couponImage = null,
	isCreating,
	createError,
}) => {
	const [formData, setFormData] = useState({
		category_id: "",
		name: "",
		code: "",
		start_date: "",
		end_date: "",
		logo: null,
		desc: "",
		type: CouponRequirementType.Email,
		keywords: [],
	});
	const categories = useCategoryStore((state) => state.categories);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleKeywordsChange = (keywords) => {
		setFormData((prev) => ({ ...prev, keywords }));
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prev) => ({ ...prev, logo: file }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		if (!formData.logo) {
			toast.error("Please upload an image for the coupon.");
			return;
		}

		onSubmit(formData);
	};

	if (!isOpen) {
		return null;
	}

	if (createError) {
		console.error(createError);
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
			<div className="relative bg-white p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Create Coupon</h2>
					<button
						onClick={onClose}
						className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Close"
					>
						<IoIosClose className="text-3xl" />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<CouponFormFields
						formData={formData}
						handleChange={handleChange}
						handleKeywordsChange={handleKeywordsChange}
						categories={categories}
					/>

					<ImageUpload
						formData={formData}
						handleImageUpload={handleImageUpload}
						defaultImage={couponImage}
					/>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							name="desc"
							value={formData.desc}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							rows="3"
							placeholder="Write your message.."
							required
						></textarea>
					</div>
					<UserInfoOptions formData={formData} handleChange={handleChange} />
					<Button
						type="submit"
						colour="yellow-500"
						className="w-full"
						disabled={isCreating}
						isLoading={isCreating}
					>
						Create Coupon
					</Button>
				</form>
			</div>
		</div>
	);
};

export default PopupCreateCoupon;
