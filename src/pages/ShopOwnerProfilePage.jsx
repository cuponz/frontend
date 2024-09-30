import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ShopOwnerProfile from "../components/ShopOwnerProfile";
import ShopCouponList from "../components/ShopCouponList";

function ShopOwnerProfilePage() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto py-8">
        {/* <h1 className="text-2xl font-bold mb-4">Customer Profile</h1> */}
        <ShopOwnerProfile />
        <ShopCouponList />
      </div>
      <Footer />
    </>
  );
}

export default ShopOwnerProfilePage;
