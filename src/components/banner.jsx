import xiaomiLogo from "../assets/xiaomi.png";
import hpLogo from "../assets/hp.png";
import dellLogo from "../assets/dell.png";
import microsoftLogo from "../assets/windows.png";
import { RiGalleryView2 } from "react-icons/ri";
const Banner = () => {
  return (
    <div className="bg-indigo-900 text-white py-10 mt-5">
      <div className="container mx-auto flex flex-col items-center space-y-8">
        <p className="text-2xl text-center">
          Explore thousands of <span className="text-yellow-400">COUPONS</span>{" "}
          from Several Brands
        </p>
        <div className="container mx-auto flex flex-col items-center space-y-8 md:space-y-6 lg:space-y-4">
          <div className="flex justify-center space-x-20 items-center flex-wrap">
            <img src={xiaomiLogo} alt="Mi" className="h-16" />
            <img src={hpLogo} alt="HP" className="h-16" />
            <img src={dellLogo} alt="Dell" className="h-16" />
            <img src={microsoftLogo} alt="Microsoft" className="h-16" />
            <a href="/coupon" className="text-white flex items-center">
              <RiGalleryView2
                className="h-8 w-8 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              />
              view all shops
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
