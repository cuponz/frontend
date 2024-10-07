import { useState } from "react";

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
}) => {
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
			e.preventDefault(); // Prevent form submission
			addKeyword();
		}
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
			{/* Category Select */}
			<div className="sm:col-span-2 md:col-span-1">
				<label className="block text-sm font-medium text-gray-700">
					Category
				</label>
				<select
					name="category_id"
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

			{CouponFormInput({
				formData,
				handleChange,
				label: "Coupon Name",
				name: "name",
			})}
			{CouponFormInput({
				formData,
				handleChange,
				label: "Coupon Code",
				name: "code",
			})}
			{CouponFormInput({
				formData,
				handleChange,
				label: "Start Date",
				name: "start_date",
				type: "date",
			})}
			{CouponFormInput({
				formData,
				handleChange,
				label: "End Date",
				name: "end_date",
				type: "date",
			})}

			{/* Keywords Input */}
			<div className="sm:col-span-2">
				<label className="block text-sm font-medium text-gray-700">
					Keywords
				</label>
				<div className="flex items-center mt-1">
					<input
						type="text"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2"
						placeholder="Enter a keyword and press Enter or Add"
					/>
					<button
						type="button"
						onClick={addKeyword}
						className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
					>
						Add
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
