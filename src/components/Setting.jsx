import { useState, useEffect } from "react";
import shopOwnerData from "../data/shopOwnerData.json";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeEmailModal from "../components/ChangeEmailModal";
import ChangePhoneModal from "../components/ChangePhoneModal";
import { useTranslations } from "../store/languages";

const Setting = () => {
	const { t } = useTranslations();
	const [userData, setUserData] = useState(null);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

	useEffect(() => {
		const gadgetHubUser = shopOwnerData.find(
			(user) => user.user_name === "GadgetHub",
		);
		setUserData(gadgetHubUser);
	}, []);

	if (!userData) return null;

	const inputClasses =
		"w-full rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed focus:border-gray-300 focus:ring-0 px-3 py-2";
	const buttonClasses =
		"w-full sm:w-24 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-[#E0DFFE] hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E0DFFE]";

	const handlePasswordChange = (newPassword) => {
		setUserData((prevData) => ({
			...prevData,
			password: newPassword,
		}));
		setIsPasswordModalOpen(false);
	};

	const handleEmailChange = (newEmail) => {
		setUserData((prevData) => ({
			...prevData,
			email: newEmail,
		}));
		setIsEmailModalOpen(false);
	};

	const handlePhoneChange = (newPhoneNumber) => {
		setUserData((prevData) => ({
			...prevData,
			phoneNumber: newPhoneNumber,
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
							value={userData.user_name}
							readOnly
						/>
						<button className={buttonClasses}>Change</button>
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
							value={userData.password.replace(/./g, "*")}
							readOnly
						/>
						<button
							className={buttonClasses}
							onClick={() => setIsPasswordModalOpen(true)}
						>
							{t(["userSetting", "changeBtn"])}
						</button>
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
							value={userData.email || ""}
							placeholder="Add your email"
							readOnly
						/>
						<button
							className={buttonClasses}
							onClick={() => setIsEmailModalOpen(true)}
						>
							{userData.email
								? t(["userSetting", "changeBtn"])
								: t(["userSetting", "addBtn"])}
						</button>
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
							value={userData.phoneNumber || ""}
							placeholder="Add your phone number"
							readOnly
						/>
						<button
							className={buttonClasses}
							onClick={() => setIsPhoneModalOpen(true)}
						>
							{userData.phoneNumber ? "Change" : "Add"}
						</button>
					</div>
				</div>

				<ChangePasswordModal
					isOpen={isPasswordModalOpen}
					onClose={() => setIsPasswordModalOpen(false)}
					onSubmit={handlePasswordChange}
				/>

				<ChangeEmailModal
					isOpen={isEmailModalOpen}
					onClose={() => setIsEmailModalOpen(false)}
					onSubmit={handleEmailChange}
					currentEmail={userData.email}
				/>

				<ChangePhoneModal
					isOpen={isPhoneModalOpen}
					onClose={() => setIsPhoneModalOpen(false)}
					onSubmit={handlePhoneChange}
					currentPhoneNumber={userData.phoneNumber}
				/>
			</div>
		</div>
	);
};

export default Setting;
