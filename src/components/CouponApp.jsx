import { useState } from "react";
import ShopCoupon from "../components/ShopCoupon";
import UserTable from "../components/UserTable";

const CouponApp = () => {
	const [selectedCouponId, setSelectedCouponId] = useState(null);

	const handleShowDetails = (couponId) => {
		setSelectedCouponId(couponId);
	};

	const handleBack = () => {
		setSelectedCouponId(null);
	};

	return (
		<div>
			{selectedCouponId ? (
				<UserTable onBack={handleBack} couponId={selectedCouponId} />
			) : (
				<ShopCoupon onShowDetails={handleShowDetails} />
			)}
		</div>
	);
};

export default CouponApp;
