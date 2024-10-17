import { useState, useEffect } from "react";
import { useTranslations } from "@/store/languages";

import ChangePasswordModal from "./ChangePasswordModal";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangePhoneModal from "./ChangePhoneModal";

import Button from "@/components/Utils/Button";
import { useUserStore } from "@/store/user";

import { updateUser } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

const Setting = () => {
	const { t } = useTranslations();
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

	const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

	// useEffect(() => {
	// 	const gadgetHubUser = shopOwnerData.find(
	// 		(user) => user.user_name === "GadgetHub",
	// 	);
	// 	setUserData(gadgetHubUser);
	// }, []);

	const inputClasses =
		"w-full rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed focus:border-gray-300 focus:ring-0 px-3 py-2";

	const updateMutation = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("User information updated successfully.");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update user.");
		},
	});

	const handlePasswordChange = (newPassword) => {
		// updateMutation.update({ password: newPassword })
		setIsPasswordModalOpen(false);
	};

	const handleEmailChange = (newEmail) => {
		setUser((prevData) => ({
			...prevData,
			email: newEmail,
		}));
		setIsEmailModalOpen(false);
	};

	const handlePhoneChange = (newPhoneNumber) => {
		setUser((prevData) => ({
			...prevData,
			phone_number: newPhoneNumber,
		}));
		setIsPhoneModalOpen(false);
	};

	return (
		<div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg">
			<div className="space-y-6">
				<div>
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						{t(["userSetting", "username"])}
					</label>
					<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
						<input
							type="text"
							name="username"
							id="username"
							className={inputClasses}
							value={user.name}
							readOnly
						/>
						<Button colour="blue-500">{t(["userSetting", "changeBtn"])}</Button>
					</div>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						{t(["userSetting", "password"])}
					</label>
					<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
						<input
							type="password"
							name="password"
							id="password"
							className={inputClasses}
							readOnly
						/>
						<Button
							colour="blue-500"
							onClick={() => setIsPasswordModalOpen(true)}
						>
							{t(["userSetting", "changeBtn"])}
						</Button>
					</div>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						{t(["userSetting", "email"])}
					</label>
					<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
						<input
							type="email"
							name="email"
							id="email"
							className={inputClasses}
							value={user.email || ""}
							placeholder="Add your email"
							readOnly
						/>
						<Button colour="blue-500" onClick={() => setIsEmailModalOpen(true)}>
							{user.email
								? t(["userSetting", "changeBtn"])
								: t(["userSetting", "addBtn"])}
						</Button>
					</div>
				</div>

				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						{t(["userSetting", "phoneNumber"])}
					</label>
					<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
						<input
							type="tel"
							name="phone"
							id="phone"
							className={inputClasses}
							value={user.phone_number || ""}
							placeholder="Add your phone number"
							readOnly
						/>
						<Button colour="blue-500" onClick={() => setIsPhoneModalOpen(true)}>
							{user.email
								? t(["userSetting", "changeBtn"])
								: t(["userSetting", "addBtn"])}
						</Button>
					</div>
				</div>

				{/* TODO: add in loading state for these button similar to buttons from management page  */}
				<ChangePasswordModal
					isOpen={isPasswordModalOpen}
					onClose={() => setIsPasswordModalOpen(false)}
					onSubmit={handlePasswordChange}
				/>

				<ChangeEmailModal
					isOpen={isEmailModalOpen}
					onClose={() => setIsEmailModalOpen(false)}
					onSubmit={handleEmailChange}
					currentEmail={user.email}
				/>

				<ChangePhoneModal
					isOpen={isPhoneModalOpen}
					onClose={() => setIsPhoneModalOpen(false)}
					onSubmit={handlePhoneChange}
					currentPhoneNumber={user.phone_number}
				/>
			</div>
		</div>
	);
};

export default Setting;
