import { useState, useRef, useEffect } from "react";
import { CouponRequirementType } from "@/constants";
import { useCategoryStore } from "@/store/categories";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

import UserInfoOptions from "./UserInfoOptions";
import CouponFormFields from "./CouponFormFields";
import ImageUpload from "./ImageUpload";
import Button from "@/components/Utils/Button";
import { useTranslations } from "@/store/languages";
import { useUserStore } from "../../../store/user";

const PopupCreateCoupon = ({
	isOpen,
	onClose,
	onSubmit,
	isCreating,
	required = true,
	couponData = undefined,
}) => {
	const { t } = useTranslations();
	const [formData, setFormData] = useState({
		category_id: "",
		name: "",
		code: "",
		start_date: "",
		end_date: "",
		logo: undefined,
		desc: "",
		type: required ? CouponRequirementType.Email : undefined,
		keywords: [],
		max_usage: 0,
	});
	const categories = useCategoryStore((state) => state.categories);
	const popupRef = useRef(null);
	const headerRef = useRef(null);

	const user = useUserStore((state) => state.user);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	useEffect(() => {
		const handleScroll = () => {
			if (headerRef.current) {
				if (window.scrollY > 0) {
					headerRef.current.classList.add("shadow-md");
				} else {
					headerRef.current.classList.remove("shadow-md");
				}
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

		if (!required && !hasChanges) {
			toast.error(t(["UserInfoOptions", "contentErr1"]));
			return;
		} else if (required && !formData.logo) {
			toast.error(t(["UserInfoOptions", "contentErr2"]));
			return;
		}

		await onSubmit(formData);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div
				ref={popupRef}
				className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
			>
				<div
					ref={headerRef}
					className="sticky top-0 bg-gray-50 z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center"
				>
					<h2 className="text-2xl font-bold text-gray-800">
						{required ? "Create Coupon" : `Editing Coupon ${couponData?.id}`}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1"
						aria-label="Close"
					>
						<IoIosClose className="text-3xl" />
					</button>
				</div>
				<div className="p-6 overflow-y-auto flex-grow bg-white">
					<form onSubmit={handleSubmit} className="space-y-8">
						<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
							<h3 className="text-lg font-semibold mb-4 text-gray-700">
								Coupon Details
							</h3>
							<CouponFormFields
								formData={formData}
								handleChange={handleChange}
								handleKeywordsChange={handleKeywordsChange}
								categories={categories}
								required={required}
							/>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
							<h3 className="text-lg font-semibold mb-4 text-gray-700">
								Coupon Image
							</h3>
							<ImageUpload
								formData={formData}
								handleImageUpload={handleImageUpload}
							/>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
							<h3 className="text-lg font-semibold mb-4 text-gray-700">
								Description
							</h3>
							<textarea
								name="desc"
								value={formData.desc}
								onChange={handleChange}
								className="w-full border border-gray-300 rounded-md shadow-sm p-3 h-40 focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="Write your coupon description here..."
								required={required}
							></textarea>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
							<h3 className="text-lg font-semibold mb-4 text-gray-700">
								User Information Options
							</h3>
							<UserInfoOptions
								formData={formData}
								handleChange={handleChange}
								tier={user.tier}
								required={required}
							/>
						</div>
					</form>
				</div>
				<div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
					<Button
						type="submit"
						colour="yellow-500"
						className="w-full py-3 text-lg font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
						disabled={isCreating}
						isLoading={isCreating}
						onClick={handleSubmit}
					>
						{required ? "Create Coupon" : "Edit Coupon"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PopupCreateCoupon;
