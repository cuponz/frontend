import { useState, useMemo } from "react";
import { UserType } from "@/constants";
import { useUserStore } from "@/store/user";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import { CiUser } from "react-icons/ci";

const UserInfo = () => {
	const user = useUserStore((state) => state.user);
	const [isHovered, setIsHovered] = useState(false);
	const isShop = useMemo(() => user?.type === UserType["Shop"], [user]);

	const getContactInfo = () => {
		if (user.email) {
			return user.email;
		} else if (user.phone_number) {
			return user.phone_number;
		} else {
			return "No contact information provided";
		}
	};

	const handleAvatarClick = async () => {
		if (!isShop) {
			return;
		}

		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.onchange = async (e) => {
			const file = e.target.files[0];
			if (file) {
				// Add your file handling logic here
				await (
					await window.executeReCaptcha("updateAvatar")
				)({ avatar: file });
			}
		};
		fileInput.click();
	};

	if (!user) {
		return <LoadingSpinner />;
	}

	return (
		<div className="container mx-auto justify-center">
			<div className="grid grid-cols-[auto_1fr] sm:gap-5 items-center p-6 gap-0">
				<div
					className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
						isShop ? "cursor-pointer" : "cursor-default"
					} ${
						isHovered && isShop
							? "border-blue-500 shadow-lg"
							: "border-gray-300"
					}`}
					onClick={handleAvatarClick}
					onMouseEnter={() => isShop && setIsHovered(true)}
					onMouseLeave={() => isShop && setIsHovered(false)}
					title={isShop ? "Click to change avatar" : undefined}
				>
					{user.avatar_url ? (
						<img
							src={user.avatar_url}
							className="h-full w-full rounded-full object-cover"
						/>
					) : (
						<CiUser
							className="w-full h-full p-2"
							style={{ color: "#46467A" }}
						/>
					)}
				</div>
				<div className="ml-6">
					<h2 className="sm:text-2xl font-medium text-gray-900 text-lg">
						{user.name} ({Object.keys(UserType)[user.type]}){" "}
						{user.type === UserType.Shop && ` - Tier ${user.tier}`}
					</h2>
					<p className="sm:text-xl text-gray-500 text-sm">{getContactInfo()}</p>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
