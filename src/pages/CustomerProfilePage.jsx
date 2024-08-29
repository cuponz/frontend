import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CouponsList from "../components/couponList";

function CustomerProfilePage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        {/* <h1 className="text-2xl font-bold mb-4">Customer Profile</h1> */}
        <CouponsList />
      </div>
      <Footer />
    </>
  );
}

export default CustomerProfilePage;
