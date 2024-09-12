import { useEffect, useState } from "react";
import couponData from "../data/couponData.json";

// Import images
import dellLogo from "../assets/dell.png";
import hpLogo from "../assets/hp.png";

const logoMap = {
  "dell.png": dellLogo,
  "hp.png": hpLogo,
};

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // Example filter the coupons to include only those with id 3, 4, and 9
    const filteredCoupons = couponData.filter((coupon) =>
      [3, 4, 9].includes(coupon.id)
    );
    setCoupons(filteredCoupons);
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl text-center text-yellow-400 mb-6">
        Today Top Coupons
      </h2>
      <div className="space-y-6">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="flex bg-blue-200 rounded-lg p-6 items-center"
          >
            <div className="flex-shrink-0">
              <img
                src={logoMap[coupon.logo]}
                alt={`${coupon.brand} Logo`}
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-2">
                {coupon.title}
              </h3>
              <p className="text-gray-700">{coupon.description}</p>
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-indigo-900 rounded">
                Redeem Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <a
          href="/coupon"
          className="text-indigo-900 text-lg font-semibold flex items-center"
        >
          View All Coupons
          <svg className="ml-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM12 22C6.486 22 2 17.514 2 12 2 6.486 6.486 2 12 2c5.514 0 10 4.486 10 10C22 17.514 17.514 22 12 22zM16 11h-4V7h-2v6h6V11z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CouponList;
