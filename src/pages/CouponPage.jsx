import CouponCatalogue from "../components/Core/Coupon/CouponCatalogue";
import Banner from "../components/Banner";
import { CouponCatalogueType } from "../constants";

/**
 * CouponPage component renders the main page for displaying coupons.
 * It includes a banner with a message and a catalogue of all available coupons.
 *
 * @component
 * @example
 * return (
 *   <CouponPage />
 * )
 */
const CouponPage = () => {
	return (
		<>
			<div className="min-h-screen">
				<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-10">
					<Banner message="Discover the Best Deals Today!" />

					<CouponCatalogue type={CouponCatalogueType.All} />
				</div>
			</div>
		</>
	);
};

export default CouponPage;
