import { useState } from "react";
import { useTranslations } from "@/store/languages";

import ChangePasswordModal from "./ChangePasswordModal";
import ChangeNameModal from "./ChangeNameModal";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangePhoneModal from "./ChangePhoneModal";

import Button from "@/components/Utils/Button";
import { useUserStore } from "@/store/user";

const Setting = () => {
	const { t } = useTranslations();
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isNameModalOpen, setIsNameModalOpen] = useState(false);
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

	const user = useUserStore((state) => state.user);

	const inputClasses =
		"w-full rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed focus:border-gray-300 focus:ring-0 px-3 py-2";

	const handlePasswordChange = async (oldPassword, newPassword) => {
		await (
			await window.executeReCaptcha("updatePassword")
		)({ password: newPassword, oldPassword });
		setIsPasswordModalOpen(false);
	};

	const handleNameChange = async (newName) => {
		await (
			await window.executeReCaptcha("updateUsername")
		)({ name: newName });
		setIsNameModalOpen(false);
	};

	const handleEmailChange = async (newEmail) => {
		await (
			await window.executeReCaptcha("updateEmail")
		)({ email: newEmail });
		setIsEmailModalOpen(false);
	};

	const handlePhoneChange = async (newPhoneNumber) => {
		await (
			await window.executeReCaptcha("updatePhoneNumber")
		)({ phone_number: newPhoneNumber });
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
						<Button colour="blue-500" onClick={() => setIsNameModalOpen(true)}>
							{t(["userSetting", "changeBtn"])}
						</Button>
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
				<ChangeNameModal
					isOpen={isNameModalOpen}
					onClose={() => setIsNameModalOpen(false)}
					onSubmit={handleNameChange}
				/>

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
