import CouponCatalogue from "../Coupon/CouponCatalogue";

/**
 * UserCoupon component renders a CouponCatalogue component wrapped in a div with a minimum height of the screen.
 *
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of coupons to display in the catalogue.
 * @returns {JSX.Element} The rendered UserCoupon component.
 */
const UserCoupon = ({ type }) => {
	return (
		<div className="min-h-screen">
			<CouponCatalogue type={type} />
		</div>
	);
};

export default UserCoupon;
