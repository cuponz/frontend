import { CouponCatalogueType, UserType } from "../constants";
import UserCoupon from "../components/Core/Profiles/UserCoupon";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

/**
 * ShoppingCart component that displays the user's coupons.
 *
 * This component checks the user's type and redirects to the home page if the user is not of type `UserType.User`.
 * It uses the `useUserStore` hook to get the current user and the `useNavigate` hook for navigation.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const ShoppingCart = () => {
	const user = useUserStore((state) => state.user);
	const navigate = useNavigate();

	if (user && user.type !== UserType.User) {
		navigate("/");
	}

	return (
		<>
			<div className="min-h-screen">
				<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-10">
					<UserCoupon type={CouponCatalogueType.User} />
				</div>
			</div>
		</>
	);
};

export default ShoppingCart;
