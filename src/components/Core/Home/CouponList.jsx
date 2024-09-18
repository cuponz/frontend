import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "../../../api/coupon";
import LoadingSpinner from "../../Utils/LoadingSpinner";

const HomeCouponList = () => {
	const { isPending, data: coupons = [] } = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});

  if (isPending) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl text-center text-yellow-400 mb-6">
        Latest Coupons
      </h2>
      <div className="space-y-6">
        {coupons.slice(0, 3).map((coupon, index) => (
          <div
            key={index}
            className="flex bg-blue-200 rounded-lg p-6 items-center"
          >
            <div className="flex-shrink-0">
              <img
                src={coupon.logo_url}
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-2">
                {coupon.title}
              </h3>
              <p className="text-gray-700">{coupon.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Link
          to="/coupon"
          className="text-indigo-900 text-lg font-semibold flex items-center"
        >
          View All Coupons
          <svg className="ml-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM12 22C6.486 22 2 17.514 2 12 2 6.486 6.486 2 12 2c5.514 0 10 4.486 10 10C22 17.514 17.514 22 12 22zM16 11h-4V7h-2v6h6V11z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default HomeCouponList;