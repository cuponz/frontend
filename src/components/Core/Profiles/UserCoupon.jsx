import CouponCatalogue from "../Coupon/CouponCatalogue";

const UserCoupon = ({ type }) => {
  return (
    <div className="min-h-screen">
      <CouponCatalogue type={type} />
    </div>
  )
};

export default UserCoupon;