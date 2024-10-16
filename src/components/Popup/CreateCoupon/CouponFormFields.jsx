import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useTranslations } from "@/store/languages";

const CouponFormInput = ({
	formData,
	handleChange,
	label,
	name,
	type = "text",
	required = true,
	...props
}) => (
	<div className="sm:col-span-2 md:col-span-1">
		<label className="block text-sm font-medium text-gray-700">{label}</label>
		<input
			type={type}
			name={name}
			value={formData[name]}
			onChange={handleChange}
			className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
			required={required}
			{...props}
		/>
	</div>
);

const CouponFormFields = ({
	formData,
	handleChange,
	handleKeywordsChange,
	categories,
	required,
}) => {
	const { t } = useTranslations();
	const [keyword, setKeyword] = useState("");

	const addKeyword = () => {
		if (keyword.trim() !== "" && !formData.keywords.includes(keyword.trim())) {
			handleKeywordsChange([...formData.keywords, keyword.trim()]);
			setKeyword("");
		}
	};

	const removeKeyword = (keywordToRemove) => {
		handleKeywordsChange(
			formData.keywords.filter((k) => k !== keywordToRemove)
		);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addKeyword();
		}
	};

	const handleNumberChange = (e) => {
		const value = parseInt(e.target.value, 10);
		handleChange({
			target: {
				name: "max_usage",
				value: isNaN(value) ? 0 : Math.max(0, value),
			},
		});
	};

	const incrementNumber = () => {
		handleChange({
			target: {
				name: "max_usage",
				value: (formData.max_usage || 0) + 1,
			},
		});
	};

	const decrementNumber = () => {
		handleChange({
			target: {
				name: "max_usage",
				value: Math.max(0, (formData.max_usage || 0) - 1),
			},
		});
		console.log(formData.max_usage);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
			{/* Category Select */}
			<div className="sm:col-span-2 md:col-span-1">
				<label className="block text-sm font-medium text-gray-700">
					{t(["CouponFormFields", "category"])}
				</label>
				<select
					name="category_id"
					value={formData.category}
					onChange={handleChange}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					required={required}
				>
					<option value="">{t(["CouponFormFields", "select"])}</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			{/* Incrementing Number Input */}
			<div className="sm:col-span-2 md:col-span-1">
				<label className="block text-sm font-medium text-gray-700">
					{t(["CouponFormFields", "usage"])}
				</label>
				<div className="mt-1 flex rounded-md shadow-sm">
					<button
						type="button"
						onClick={decrementNumber}
						className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
					>
						<FaMinus className="h-5 w-5" />
					</button>
					<input
						type="number"
						name="max_usage"
						value={formData.max_usage || 0}
						onChange={handleNumberChange}
						className="block w-full border border-gray-300 rounded-none shadow-sm p-2"
						min="0"
						required={required}
					/>
					<button
						type="button"
						onClick={incrementNumber}
						className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
					>
						<FaPlus className="h-5 w-5" />
					</button>
				</div>
			</div>

			{CouponFormInput({
				formData,
				handleChange,
				label: "Coupon Name",
				name: "name",
				required,
			})}
			{CouponFormInput({
				formData,
				handleChange,
				label: "Coupon Code",
				name: "code",
				required,
			})}
			{CouponFormInput({
				formData,
				handleChange,
				label: "Start Date",
				name: "start_date",
				type: "date",
				required,
			})}
			{CouponFormInput({
				formData,
				handleChange,
				label: "End Date",
				name: "end_date",
				type: "date",
				required,
			})}

			{/* Keywords Input */}
			<div className="sm:col-span-2">
				<label className="block text-sm font-medium text-gray-700">
					{t(["CouponFormFields", "keyword"])}
				</label>
				<div className="flex items-center mt-1">
					<input
						type="text"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2"
						placeholder={t(["CouponFormFields", "enterKeyword"])}
					/>
					<button
						type="button"
						onClick={addKeyword}
						className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
					>
						{t(["CouponFormFields", "addBtn"])}
					</button>
				</div>
				<div className="mt-2 flex flex-wrap gap-2">
					{formData.keywords.map((kw, index) => (
						<span
							key={index}
							className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
						>
							{kw}
							<button
								type="button"
								onClick={() => removeKeyword(kw)}
								className="ml-1 text-red-500 font-bold"
							>
								&times;
							</button>
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default CouponFormFields;
