import { useEffect } from "react";
import UserInfo from "@/components/Core/Profiles/UserInfo";
import MiniNav from "@/components/Core/Profiles/UserProfileMiniNav";

import ReCaptchaV3 from "@/components/Utils/ReCaptchaV3";

import { useUserStore } from "@/store/user";
import { updateUser } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

function UserProfile() {
	const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

	const updateMutation = useMutation({
		mutationFn: updateUser,
		onSuccess: (data) => {
			toast.success("User information updated successfully.");
			setUser(data);
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update user.");
		},
	});

	const handleReCaptchaVerify = (token) => (userData) => {
		const formData = new FormData();

		for (const key in userData) {
			formData.append(key, userData[key]);
		}

		formData.append("recaptchaToken", token);

		updateMutation.mutate({
			userId: user.id,
			userData: formData,
		});
	};

	return (
		<div>
			<div className=" sm:px-6">
				<UserInfo />
				<MiniNav />
			</div>
			<ReCaptchaV3 onVerify={handleReCaptchaVerify} />
		</div>
	);
}

export default UserProfile;
