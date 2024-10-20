import { UserType } from "@/constants";
import { useUserStore } from "@/store/user";

import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import { CiUser } from "react-icons/ci";

const UserInfo = () => {
	const user = useUserStore((state) => state.user);

	const getContactInfo = () => {
		if (user.email) {
			return user.email;
		} else if (user.phone_number) {
			return user.phone_number;
		} else {
			return "No contact information provided";
		}
	};

	if (!user) {
		return <LoadingSpinner />;
	}

	return (
		<div className="container mx-auto justify-center">
			<div className="grid grid-cols-[auto_1fr] sm:gap-5 items-center p-6 gap-0">
				<div className="w-24 h-24">
					{/* svg delete */}
					<CiUser className="text-8xl m-2 " style={{ color: "#46467A" }} />
				</div>
				<div className="ml-6">
					<h2 className="sm:text-2xl font-medium text-gray-900 text-lg">
						{user.name} ({Object.keys(UserType)[user.type]}) {user.type === UserType.Shop && ` - Tier ${user.tier}`}
					</h2>
					<p className="sm:text-xl text-gray-500 text-sm">{getContactInfo()}</p>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
