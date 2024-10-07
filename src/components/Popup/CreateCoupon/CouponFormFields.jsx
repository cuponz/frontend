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

const CouponFormFields = ({ formData, handleChange, categories }) => {
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
		</div>
	);
};

export default CouponFormFields;
