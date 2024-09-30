import ShopOwnerInfo from "../components/ShopOwnerInfo";
import ShopCoupon from "../components/ShopProfileCoupon";

function ShopOwnerProfile() {
  return (
    <div>
     <div className="pt-16 sm:px-6 container">
        <ShopOwnerInfo />
        <ShopCoupon />
      </div>
    </div>
  );
}

export default ShopOwnerProfile;