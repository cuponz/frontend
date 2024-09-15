import { useState } from "react";
import UserCoupon from "../components/UserCoupon";
import Setting from "../components/Setting";

const ShopOwnerMiniNav = () => {
  const [activeTab, setActiveTab] = useState("Coupons");

  const renderContent = () => {
    switch (activeTab) {
      case "Coupons":
        return (
          <div>
            <UserCoupon />
          </div>
        );
      case "Setting":
        return (
          <div>
            <Setting />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto ">
      <hr className="h-0.5 mx-auto bg-indigo-900 border-0 rounded  dark:bg-gray-700" />
      <div className="grid grid-cols-2 md:flex justify-between max-w-sm">
        <button
          className={`w-full md:w-1/2 px-4 py-2 font-medium text-sm ${
            activeTab === "Coupons"
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Coupons")}
        >
          Coupons
        </button>

        <button
          className={`w-full md:w-1/2 px-4 py-2 font-medium text-sm ${
            activeTab === "Setting"
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Setting")}
        >
          Setting
        </button>
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default ShopOwnerMiniNav;
