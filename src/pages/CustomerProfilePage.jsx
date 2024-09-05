import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
// import CouponsList from "../components/couponList";
import UserInfo from "../components/UserInfo";

function CustomerProfilePage() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto py-8">
        {/* <h1 className="text-2xl font-bold mb-4">Customer Profile</h1> */}
        <UserInfo />
        {/* <CouponsList /> */}
      </div>
      <Footer />
    </>
  );
}

export default CustomerProfilePage;
