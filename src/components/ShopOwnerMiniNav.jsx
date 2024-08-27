import { useState } from "react";

const ShopOwnerMiniNav = () => {
  const [activeTab, setActiveTab] = useState("Coupons");

  const renderContent = () => {
    switch (activeTab) {
      case "Coupons":
        return <div>Coupons Content</div>;
      case "Management":
        return <div>Management Content</div>;
      case "Customer Info":
        return <div>Customer Info Content</div>;
      case "Setting":
        return <div>Setting Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto ">
      <hr className="h-0.5 mx-auto bg-indigo-900 border-0 rounded  dark:bg-gray-700" />
      <div className="grid grid-cols-2 md:flex justify-between max-w-xl">
        <button
          className={`w-full md:w-1/4 px-4 py-2 font-medium text-sm ${
            activeTab === "Coupons"
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Coupons")}
        >
          Coupons
        </button>
        <button
          className={`w-full md:w-1/4 px-4 py-2 font-medium text-sm ${
            activeTab === "Management"
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Management")}
        >
          Management
        </button>
        <button
          className={`w-full md:w-1/4 px-4 py-2 font-medium text-sm ${
            activeTab === "Customer Info"
              ? "bg-indigo-900 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Customer Info")}
        >
          Customer Info
        </button>
        <button
          className={`w-full md:w-1/4 px-4 py-2 font-medium text-sm ${
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
