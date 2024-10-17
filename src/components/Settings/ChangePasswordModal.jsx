import { useState, useRef, useEffect } from "react";
import { useTranslations } from "@/store/languages";

import Button from "@/components/Utils/Button";

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {
	const { t } = useTranslations();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const modalRef = useRef();

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newPassword === confirmPassword) {
			onSubmit(newPassword);
		} else {
			alert("New passwords don't match!");
		}
	};

	if (!isOpen) return null;

	const inputClasses =
		"w-full rounded-md sm:text-sm border-2 border-gray-300 focus:border-[#E0DFFE] focus:ring focus:ring-[#E0DFFE] focus:ring-opacity-50 px-3 py-2 mb-4";

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full"
			>
				<h2 className="text-xl font-bold mb-4">
					{t(["changePasswordModal", "title"])}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="oldPassword"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changePasswordModal", "oldPassword"])}
						</label>
						<input
							type={showPassword ? "text" : "password"}
							id="oldPassword"
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="newPassword"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changePasswordModal", "newPassword"])}
						</label>
						<input
							type={showPassword ? "text" : "password"}
							id="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t(["changePasswordModal", "confirmNewPass"])}
						</label>
						<input
							type={showPassword ? "text" : "password"}
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="flex items-center">
							<input
								type="checkbox"
								checked={showPassword}
								onChange={() => setShowPassword(!showPassword)}
								className="mr-2"
							/>
							<span className="text-sm text-gray-700">
								{t(["changePasswordModal", "showPass"])}
							</span>
						</label>
					</div>
					<Button type="submit" colour="blue-500">
						{t(["changePasswordModal", "changePassBtn"])}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ChangePasswordModal;