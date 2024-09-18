import CouponCatalogue from "../components/Core/Coupon/CouponCatalogue";
import Banner from "../components/Banner";
import { CouponCatalougeType } from "../constants";

const CouponPage = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-10">
          <Banner message="Discover the Best Deals Today!" />
          <title>Discover Local Deals</title>

          <CouponCatalogue type={CouponCatalougeType["All"]} />
        </div>
      </div>
    </>
  );
};

export default CouponPage;