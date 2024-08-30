import React from "react";
import "./userInfo.css"; // Assuming you have specific CSS for CustomerInfo

function UserInfo() {
  // Static data for demonstration
  const clientInfo = {
    name: "My Name",
    email: "myemailorphone@gmail.com",
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
            <button className="tab">Coupons</button>
            <button className="tab">Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
