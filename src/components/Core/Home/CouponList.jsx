import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "../../../api/coupon";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { CiTimer } from "react-icons/ci";

/**
 * HomeCouponList component fetches and displays a list of the latest coupons.
 * It uses the `useQuery` hook to fetch coupon data from the server.
 *
 * @component
 * @returns {JSX.Element} A React component that renders a list of coupons.
 *
 * @example
 * return (
 *   <HomeCouponList />
 * )
 *
 * @remarks
 * - Displays a loading spinner while fetching data.
 * - Shows up to 3 coupons with their logo, title, and description.
 * - Provides a link to view all coupons.
 */
const HomeCouponList = () => {
	const { isPending, data: coupons = [] } = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});

	if (isPending) {
		return <LoadingSpinner />;
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
							<img src={coupon.logo_url} className="h-20 w-20 rounded-full" />
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
					{/* svg delete */}
					<CiTimer className="text-3xl ml-2" />
				</Link>
			</div>
		</div>
	);
};

export default HomeCouponList;
