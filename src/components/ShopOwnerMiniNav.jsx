import { useState } from "react";
import ShopCoupon from "../components/ShopCoupon";
import ShopCouponTable from "../components/shopCouponTable";
import UserTable from "../components/UserTable"; // Assuming you have a UserTable component

const ShopOwnerMiniNav = () => {
  const [activeTab, setActiveTab] = useState("Coupons");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleShowDetails = (couponId) => {
    setSelectedCoupon(couponId);
    setActiveTab("Details");
  };

  const handleBackToCoupons = () => {
    setSelectedCoupon(null);
    setActiveTab("Coupons");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Coupons":
        return (
          <div>
            <ShopCoupon onShowDetails={handleShowDetails} />
          </div>
        );
      case "Management":
        return (
          <div>
            <ShopCouponTable />
          </div>
        );
      case "Details":
        return (
          <div>
            <UserTable couponId={selectedCoupon} onBack={handleBackToCoupons} />
          </div>
        );
      case "Setting":
        return <div>Setting Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <hr className="h-0.5 mx-auto bg-indigo-900 border-0 rounded dark:bg-gray-700" />
      <div className="grid grid-cols-2 md:flex justify-between max-w-xl">
        <button
          className={`w-full md:w-1/3 px-4 py-2 font-medium text-sm ${
            activeTab === "Coupons"
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Coupons")}
        >
          Coupons
        </button>
        <button
          className={`w-full md:w-1/3 px-4 py-2 font-medium text-sm ${
            activeTab === "Management"
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Management")}
        >
          Management
        </button>
        <button
          className={`w-full md:w-1/3 px-4 py-2 font-medium text-sm ${
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
