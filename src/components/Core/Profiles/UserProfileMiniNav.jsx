import { useState } from "react";

import { useUserStore } from "../../../store/user";
import LoadingSpinner from "../../Utils/LoadingSpinner";

import UserCoupon from "./UserCoupon";
import UserSetting from "../../Setting";
import { CouponCatalougeType, ProfileTab, UserType } from "../../../constants";

import ShopCouponTable from "../../shopCouponTable";
import ShopOwnerSetting from "../../Setting";

const UserContent = ({ activeTab }) => {
  switch (activeTab) {
    case ProfileTab.Coupons:
      return <UserCoupon type={CouponCatalougeType["User"]} />
    case ProfileTab.Settings:
      return <UserSetting />;
    default:
      return null;
  }
};

const ShopContent = ({ activeTab }) => {
  switch (activeTab) {
    case ProfileTab.Coupons:
      return <UserCoupon type={CouponCatalougeType.ShopManage} />
    case ProfileTab.Management:
      return <ShopCouponTable />;
    case ProfileTab.Settings:
      return <ShopOwnerSetting />;
    default:
      return null;
  }
};

const UserProfileMiniNav = () => {
  const user = useUserStore(state => state.user);
  const [activeTab, setActiveTab] = useState(ProfileTab["Coupons"]);

  if (!user) {
    return <LoadingSpinner />
  }

  const tabs =
    user.type === UserType["Shop"]
      ? [
        { id: ProfileTab.Coupons, label: 'Coupons' },
        { id: ProfileTab.Management, label: 'Management' },
        { id: ProfileTab.Setting, label: 'Setting' },
      ] : user.type === UserType.User ? [
        { id: ProfileTab.Coupons, label: 'Coupons' },
        { id: ProfileTab.Setting, label: 'Setting' },
      ] : [
        { id: ProfileTab.Management, label: 'Management' },
        { id: ProfileTab.Setting, label: 'Setting' },
      ];

  return (
    <div className="container mx-auto">
      <hr className="h-0.5 mx-auto bg-indigo-900 border-0 rounded dark:bg-gray-700" />
      <div className="grid grid-cols-2 md:flex justify-between max-w-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id * (user.type + 1)}

            className={`w-full md:w-1/${tabs.length} px-4 py-2 font-medium text-sm ${activeTab === tab.id
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{
        (user.type === UserType["Shop"]) ? (
          <ShopContent activeTab={activeTab} />
        ) : (user.type === UserType["User"]) ? (
          <UserContent activeTab={activeTab} />
        ) : (
          <></>
        )
      }</div>
    </div>
  );
};

export default UserProfileMiniNav;