import { useRef, useEffect } from "react";

const OTPInput = ({ length, onComplete, value, onChange }) => {
	const inputRefs = useRef([]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	useEffect(() => {
		if (value === "") {
			inputRefs.current[0].focus();
		}
	}, [value]);

	const handleChange = (element, index) => {
		if (isNaN(element.value)) return false;

		const newOtp = value.split("");
		newOtp[index] = element.value;
		onChange(newOtp.join(""));

		if (element.nextSibling && newOtp[index] !== "") {
			element.nextSibling.focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !value[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	useEffect(() => {
		if (value.length === length) {
			onComplete(value);
		}
	}, [value, length, onComplete]);

	return (
		<div className="flex justify-center items-center space-x-2">
			{Array.from({ length }, (_, index) => (
				<input
					key={index}
					ref={(ref) => (inputRefs.current[index] = ref)}
					type="text"
					maxLength="1"
					value={value[index] || ""}
					className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-300 focus:border-[#E0DFFE] focus:ring focus:ring-[#E0DFFE] focus:ring-opacity-50"
					onChange={(e) => handleChange(e.target, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					onFocus={(e) => e.target.select()}
				/>
			))}
		</div>
	);
};

export default OTPInput;