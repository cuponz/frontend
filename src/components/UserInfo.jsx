import React, { useState } from "react";
import "./userInfo.css"; // Assuming CSS is appropriately linked
import CouponsList from "./couponList"; // Import the CouponsList component
import Settings from "./Settings"; // Import or define the Settings component

function UserInfo() {
  // Static data for demonstration
  const clientInfo = {
    name: "My Name",
    email: "myemailorphone@gmail.com",
  };

  const [activeTab, setActiveTab] = useState("coupons"); // State to track the active tab

  // Function to switch tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full">
        <div className="profile-section">
          <div className="profile-header">
            <div className="avatar"></div>
            <div className="profile-details">
              <h1>{clientInfo.name}</h1>
              <p>{clientInfo.email}</p>
            </div>
          </div>
          <div className="profile-tabs">
            <button
              className={`tab ${activeTab === "coupons" ? "active" : ""}`}
              onClick={() => handleTabChange("coupons")}
            >
              Coupons
            </button>
            <button
              className={`tab ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => handleTabChange("settings")}
            >
              Settings
            </button>
          </div>
          {activeTab === "coupons" ? <CouponsList /> : <Settings />}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
