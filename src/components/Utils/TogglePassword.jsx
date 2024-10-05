import { useState } from "react";
import { CiRead, CiUnread } from "react-icons/ci";

const PasswordInput = ({ name, value, onChange, placeholder, error }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="mb-4 relative">
			<input
				type={showPassword ? "text" : "password"}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="w-full p-3 border border-gray-300 rounded"
				required
			/>
			<button
				type="button"
				onClick={togglePasswordVisibility}
				className="absolute right-3 top-1/2 transform -translate-y-1/2"
			>
				{showPassword ? <CiUnread size={20} /> : <CiRead size={20} />}
			</button>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default PasswordInput;
