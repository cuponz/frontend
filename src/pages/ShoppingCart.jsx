import { CouponCatalougeType, UserType } from "../constants";
import UserCoupon from "../components/Core/Profiles/UserCoupon";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
	const user = useUserStore(state => state.user);
	const navigate = useNavigate();

	if (user && user.type !== UserType.User) {
		navigate("/");
	}

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-10">
					<UserCoupon type={CouponCatalougeType.User} />
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;