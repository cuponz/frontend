import React, { useState, useEffect } from "react";
import customerData from "../../dist/demo_cust_prof"; // Importing the JSON data
import CouponsList from "../components/couponList"; // Assuming path correctness
import Settings from "../components/Settings"; // You need to create this component

function CustomerProfile() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    profileImageUrl: "",
  });
  const [activeTab, setActiveTab] = useState("coupons"); // New state to track the active tab

  useEffect(() => {
    // Simulate fetching data
    setCustomer(customerData);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="customer-profile">
      <div className="customer-info">
        <div
          className="profile-picture"
          style={{ backgroundImage: `url(${customer.profileImageUrl})` }}
        ></div>
        <div className="info">
          <h1>{customer.name}</h1>
          <p>{customer.email}</p>
        </div>
        <div className="tabs">
          <div
            className={`tab ${activeTab === "coupons" ? "active" : ""}`}
            onClick={() => handleTabChange("coupons")}
          >
            Coupons
          </div>
          <div
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => handleTabChange("settings")}
          >
            Settings
          </div>
        </div>
      </div>
      {activeTab === "coupons" ? <CouponsList /> : <Settings />}
    </div>
  );
}

export default CustomerProfile;
