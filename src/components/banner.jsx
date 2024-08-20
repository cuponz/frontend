import xiaomiLogo from "../assets/xiaomi.png";
import hpLogo from "../assets/hp.png";
import dellLogo from "../assets/dell.png";
import microsoftLogo from "../assets/windows.png";

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
            <a href="/shops" className="text-white flex items-center">
              <svg
                className="h-8 w-8 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM12 22C6.486 22 2 17.514 2 12 2 6.486 6.486 2 12 2c5.514 0 10 4.486 10 10C22 17.514 17.514 22 12 22zM16 11h-4V7h-2v6h6V11z" />
              </svg>
              view all shops
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
