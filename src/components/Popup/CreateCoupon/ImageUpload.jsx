import { useState, useEffect, useRef } from "react";

/**
 * ImageUpload component allows users to upload and preview an image for a coupon.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.formData - The form data containing the image file.
 * @param {Function} props.handleImageUpload - The function to handle image upload.
 * @returns {JSX.Element} The rendered ImageUpload component.
 */
const ImageUpload = ({ formData, handleImageUpload }) => {
	const fileInputRef = useRef(null);
	const [preview, setPreview] = useState(null);

	const triggerImageUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	useEffect(() => {
		if (formData.logo) {
			const objectUrl = URL.createObjectURL(formData.logo);
			setPreview(objectUrl);

			// Cleanup the object URL to avoid memory leaks
			return () => URL.revokeObjectURL(objectUrl);
		}
	}, [formData.logo]);

	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700">
				Coupon Image
			</label>
			<div className="flex flex-col">
				{preview && (
					<img
						src={preview}
						alt="Coupon Preview"
						className="mb-3 mt-3 w-64 h-64 object-cover rounded-md shadow-sm"
					/>
				)}
				<div className="flex items-center md-1">
					<input
						ref={fileInputRef}
						type="file"
						onChange={handleImageUpload}
						className="hidden"
						accept="image/*"
						name="logo"
					/>
					<button
						type="button"
						onClick={triggerImageUpload}
						className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
					>
						{formData.image ? "Change Image" : "Upload Image"}
					</button>
					{formData.image && (
						<span className="ml-3 text-sm text-gray-600">
							{formData.logo.name}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default ImageUpload;
