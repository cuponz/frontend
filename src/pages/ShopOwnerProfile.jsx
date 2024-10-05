import ShopOwnerInfo from "../components/ShopOwnerInfo";
import ShopCoupon from "../components/ShopProfileCoupon";

function ShopOwnerProfile() {
	return (
		<div>
			<div className="sm:px-6 container">
				<ShopOwnerInfo />
				<ShopCoupon />
			</div>
		</div>
	);
}

export default ShopOwnerProfile;
