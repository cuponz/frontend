import ShopOwnerProfile from "../components/ShopOwnerProfile";
import ShopCouponList from "../components/ShopCouponList";

function ShopOwnerProfilePage() {
  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-2xl font-bold mb-4">Customer Profile</h1> */}
      <ShopOwnerProfile />
      <ShopCouponList />
    </div>
  );
}

export default ShopOwnerProfilePage;
