import { Link } from "react-router-dom";
import { RiGalleryView2 } from "react-icons/ri";
import xiaomiLogo from "@/assets/xiaomi";
import hpLogo from "@/assets/hp";
import dellLogo from "@/assets/dell";
import microsoftLogo from "@/assets/windows";

/**
 * Banner component displays a promotional section with a heading, brand logos, and a link to view all shops.
 *
 * @component
 * @example
 * return (
 *   <Banner />
 * )
 *
 * @returns {JSX.Element} The rendered Banner component.
 */
const Banner = () => {
	return (
		<div className="bg-indigo-900 text-white py-8 sm:py-12 md:py-16 mt-5">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8">
					Explore thousands of <span className="text-yellow-400">COUPONS</span>{" "}
					from Several Brands
				</h2>
				<div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-8">
					<img
						src={xiaomiLogo}
						alt="Mi"
						className="h-12 sm:h-16 w-auto object-contain"
					/>
					<img
						src={hpLogo}
						alt="HP"
						className="h-12 sm:h-16 w-auto object-contain"
					/>
					<img
						src={dellLogo}
						alt="Dell"
						className="h-12 sm:h-16 w-auto object-contain"
					/>
					<img
						src={microsoftLogo}
						alt="Microsoft"
						className="h-12 sm:h-16 w-auto object-contain"
					/>
				</div>
				<div className="text-center">
					<Link
						to="/coupon"
						className="inline-flex items-center text-white bg-indigo-700 hover:bg-indigo-600 transition-colors duration-300 py-2 px-4 rounded-full text-sm sm:text-base"
					>
						<RiGalleryView2 className="h-5 w-5 mr-2" />
						View all shops
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Banner;
