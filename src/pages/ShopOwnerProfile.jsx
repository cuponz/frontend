import CouponCatalogue from "@/components/Core/Coupon/CouponCatalogue";
import { CouponCatalogueType } from "@/constants";
import { useSearchParams } from "react-router-dom";

/**
 * ShopOwnerProfile component displays the profile of a shop owner.
 * It retrieves the shop owner's name from the URL search parameters and displays it.
 * It also includes a CouponCatalogue component to list the shop's coupons.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const ShopOwnerProfile = () => {
	const [searchParams] = useSearchParams();
	const name = searchParams.get("name");

	return (
		<>
			<div className="min-h-screen">
				<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-10">
					<h1 className="mt-4 text-4xl">{name} (Shop)</h1>

					<CouponCatalogue type={CouponCatalogueType.ShopList} />
				</div>
			</div>
		</>
	);
};

export default ShopOwnerProfile;
