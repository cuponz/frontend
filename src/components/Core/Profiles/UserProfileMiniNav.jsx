import { useState } from "react";

import { useUserStore } from "@/store/user";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";

import UserCoupon from "./UserCoupon";
import { CouponCatalogueType, ProfileTab, UserType } from "@/constants";

import ShopCouponTable from "./Shop/ShopCouponTable";
import ManagerCouponTable from "./Manager/MangagerCouponTable";
import ManagerUserTable from "./Manager/MangagerUserTable";
import Settings from "@/components/Settings";
import { useTranslations } from "@/store/languages";
import CategoryTable from "./Manager/CategoryTable";
import GroupTable from "./Manager/GroupTable";

const UserContent = ({ activeTab }) => {
	switch (activeTab) {
		case ProfileTab.Settings:
			return <Settings />;
		default:
			return null;
	}
};

const ShopContent = ({ activeTab }) => {
	switch (activeTab) {
		case ProfileTab.Coupons:
			return <UserCoupon type={CouponCatalogueType.ShopManage} />;
		case ProfileTab.CouponManagement:
			return <ShopCouponTable />;
		case ProfileTab.Settings:
			return <Settings />;
		default:
			return null;
	}
};

const ManagerContent = ({ activeTab }) => {
	switch (activeTab) {
		case ProfileTab.Coupons:
			return <UserCoupon type={CouponCatalogueType.ManagerManage} />;
		case ProfileTab.CouponManagement:
			return <ManagerCouponTable />;
		case ProfileTab.UserManagement:
			return <ManagerUserTable />;
		case ProfileTab.Settings:
			return <Settings />;
		case ProfileTab.CategoryManagement:
			return <CategoryTable />;
		case ProfileTab.GroupManagement:
			return <GroupTable />;
		default:
			return null;
	}
};

/**
 * UserProfileMiniNav component renders a mini navigation bar for user profiles.
 * It displays different tabs based on the user type and allows switching between them.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Usage example:
 * <UserProfileMiniNav />
 *
 * @remarks
 * This component uses the `useTranslations` hook for localization and the `useUserStore` hook to access the user state.
 * It conditionally renders different sets of tabs and content based on the user's type.
 *
 * @function
 * @name UserProfileMiniNav
 */
const UserProfileMiniNav = () => {
	const { t } = useTranslations();
	const user = useUserStore((state) => state.user);

	if (!user) {
		return <LoadingSpinner />;
	}

	const tabs =
		user.type === UserType["Shop"]
			? [
					{ id: ProfileTab.Coupons, label: t(["miniNav", "coupon"]) },
					{
						id: ProfileTab.CouponManagement,
						label: t(["miniNav", "couponManagement"]),
					},
					{ id: ProfileTab.Settings, label: t(["miniNav", "setting"]) },
				]
			: user.type === UserType.User
				? [{ id: ProfileTab.Settings, label: t(["miniNav", "coupon"]) }]
				: [
						{ id: ProfileTab.Coupons, label: t(["miniNav", "coupon"]) },
						{
							id: ProfileTab.CouponManagement,
							label: t(["miniNav", "couponManagement"]),
						},
						{
							id: ProfileTab.UserManagement,
							label: t(["miniNav", "userManagement"]),
						},
						{
							id: ProfileTab.CategoryManagement,
							// label: t(["miniNav", "userManagement"]),
							label: "Category Management",
						},
						{
							id: ProfileTab.GroupManagement,
							// label: t(["miniNav", "userManagement"]),
							label: "Group Management",
						},
						{ id: ProfileTab.Settings, label: t(["miniNav", "setting"]) },
					];

	const [activeTab, setActiveTab] = useState(tabs[0].id);

	return (
		<div className="container mx-auto">
			<hr className="h-0.5 mx-auto bg-indigo-900 border-0 rounded dark:bg-gray-700" />
			<div className="grid grid-cols-2 md:flex justify-between max-w-xl">
				{tabs.map((tab) => (
					<button
						key={tab.id * (user.type + 1)}
						className={`w-full md:w-1/${
							tabs.length
						} px-4 py-2 font-medium text-sm ${
							activeTab === tab.id
								? "bg-indigo-900 text-white"
								: "text-gray-700"
						}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="mt-4">
				{user.type === UserType.Shop ? (
					<ShopContent activeTab={activeTab} />
				) : user.type === UserType.User ? (
					<UserContent activeTab={activeTab} />
				) : (
					<ManagerContent activeTab={activeTab} />
				)}
			</div>
		</div>
	);
};

export default UserProfileMiniNav;
