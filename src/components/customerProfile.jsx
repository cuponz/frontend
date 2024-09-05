import { useState, useEffect } from "react";
// import CouponsList from "./couponList";
import customerData from "../../dist/demo_cust_prof"; // Importing the JSON data
// import "./CustomerProfile.css";

function CustomerProfile() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    // Simulate fetching data
    setCustomer(customerData);
  }, []);

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
          <div className="tab active">Coupons</div>
          <div className="tab">Settings</div>
        </div>
      </div>
      {/* <CouponsList /> */}
    </div>
  );
}

export default CustomerProfile;
