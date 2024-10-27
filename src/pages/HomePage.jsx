import Carousel from "../components/Utils/Carousel";
import Banner from "../components/Banner";
import HomeCouponList from "../components/Core/Home/CouponList";

import image1 from "@/assets/image1";
import image2 from "@/assets/image2";
import image3 from "@/assets/image3";
import image4 from "@/assets/image4";
import image5 from "@/assets/image5";

/**
 * HomePage component renders the main content of the home page.
 * It includes a carousel with images, a banner, and a list of home coupons.
 *
 * @component
 * @example
 * return (
 *   <HomePage />
 * )
 */
const HomePage = () => {
	const carouselImages = [image3, image4, image5];
	const rightImages = [image2, image1];

	return (
		<div className="pt-16 p-6">
			<Carousel images={carouselImages} rightImages={rightImages} />
			<Banner />
			<HomeCouponList />
		</div>
	);
};

export default HomePage;
