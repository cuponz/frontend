import { useState } from "react";

import { getAllShops } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";
import ReCaptchaV3 from "@/components/Utils/ReCaptchaV3";

import columns from "./columns";

import useManagerCouponTableMutations from "./useManagerCouponTableMutations";

import LoadingSpinner from "@/components/Utils/LoadingSpinner";

const ManagerUserTable = () => {
	const {
		isLoading,
		error,
		data: shops = [],
	} = useQuery({
		queryKey: ["get", "all", "shops"],
		queryFn: getAllShops,
		retry: false,
	});

	const [mutationLoadingStates, setMutationLoadingStates] = useState({});

	const updateLoadingState = (id, key, value) => {
		setMutationLoadingStates((prevState) => ({
			...prevState,
			[id]: {
				...prevState[id],
				[key]: value,
			},
		}));
	};

	const [updateShopMutation, deleteMutation] =
		useManagerCouponTableMutations(updateLoadingState);

	// Action handlers
	const handleToggleApproval = async (field, userId, currentState) => {
		const newState = !currentState;

		updateLoadingState(userId, `isApproving_${field}`, true);

		const executeReCaptcha =
			await window.executeReCaptcha("toggleApprovalShop");

		executeReCaptcha(userId, { [field]: newState }, `isApproving_${field}`);
	};

	const handleChangeTier = async (userId, tier) => {
		updateLoadingState(userId, "isChangingTier", true);

		const executeReCaptcha = await window.executeReCaptcha("changingShopTier");

		executeReCaptcha(userId, { tier }, "isChangingTier");
	};

	const handleReCaptchaVerify = (token) => (userId, userData, loadingState) => {
		const formData = new FormData();

		for (const key in userData) {
			if (typeof userData[key] === "boolean") {
				formData.append(key, userData[key] ? 1 : 0);
			} else {
				formData.append(key, userData[key]);
			}
		}

		formData.append("recaptchaToken", token);

		updateShopMutation.mutate(
			{ userId, userData: formData },
			{
				onSettled: () => updateLoadingState(userId, loadingState, false),
			},
		);
	};

	const handleDelete = (userId) => {
		if (window.confirm("Are you sure you want to delete this coupon?")) {
			updateLoadingState(userId, "isDeleting", true);
			deleteMutation.mutate(userId, {
				onSettled: () => updateLoadingState(userId, "isDeleting", false),
			});
		}
	};

	const additionalFilters = [];

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		throw error;
	}

	return (
		<div className="p-4">
			<DataTable
				columns={columns(
					handleToggleApproval,
					handleDelete,
					handleChangeTier,
					mutationLoadingStates,
				)}
				data={shops}
				filename="manager_coupons.csv"
				additionalFilters={additionalFilters}
			/>
			<ReCaptchaV3 onVerify={handleReCaptchaVerify} />
		</div>
	);
};

export default ManagerUserTable;
