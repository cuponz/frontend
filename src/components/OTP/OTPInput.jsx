import { useRef, useEffect, useCallback, useMemo } from "react";

import { useMutation } from "@tanstack/react-query";

/**
 * OTPInput component for handling OTP (One Time Password) input fields.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.length - The number of OTP input fields.
 * @param {function} props.onComplete - Callback function to be called when OTP input is complete.
 * @param {string} props.value - The current value of the OTP input.
 * @param {function} props.onChange - Callback function to be called when the OTP input value changes.
 *
 * @returns {JSX.Element} The OTPInput component.
 */
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

	const handleChange = useCallback(
		(element, index) => {
			if (isNaN(element.value)) return false;

			const newOtp = value.split("");
			newOtp[index] = element.value;
			onChange(newOtp.join(""));

			if (element.nextSibling && newOtp[index] !== "") {
				element.nextSibling.focus();
			}
		},
		[value, onChange],
	);

	const handleKeyDown = useCallback(
		(e, index) => {
			if (e.key === "Backspace" && !value[index] && index > 0) {
				inputRefs.current[index - 1].focus();
			}
		},
		[value],
	);

	useEffect(() => {
		if (value.length === length) {
			onComplete(value);
		}
	}, [value, length, onComplete]);

	const inputs = useMemo(
		() =>
			Array.from({ length }, (_, index) => (
				<input
					key={index}
					ref={(ref) => (inputRefs.current[index] = ref)}
					type="text"
					maxLength="1"
					value={value[index] || ""}
					className="w-10 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-300 focus:border-[#E0DFFE] focus:ring focus:ring-[#E0DFFE] focus:ring-opacity-50"
					onChange={(e) => handleChange(e.target, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					onFocus={(e) => e.target.select()}
				/>
			)),
		[handleChange, handleKeyDown, length, value],
	);

	return (
		<div className="flex justify-center items-center space-x-2">{inputs}</div>
	);
};

export default OTPInput;
