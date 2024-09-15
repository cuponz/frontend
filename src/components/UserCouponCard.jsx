import { useState } from "react";
import InfoField from "../components/InfoField";

const UserCouponCard = ({
  id,
  logo,
  title,
  couponCount,
  description,
  keywords,
  startDate,
  endDate,
  shopName,
  brand,
  name,
  redeemCode,
  button,
}) => {
  const [isInfoFieldOpen, setIsInfoFieldOpen] = useState(false);

  const handleUseClick = () => {
    setIsInfoFieldOpen(true);
  };

  const handleCloseInfoField = () => {
    setIsInfoFieldOpen(false);
  };

  const couponData = {
    id,
    logo,
    title,
    description,
    startDate,
    endDate,
    shopName,
    brand,
    name,
    redeemCode,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full relative">
      <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
        {couponCount} coupons left!
      </div>

      <div className="flex flex-col items-center text-center mb-4 flex-grow">
        <div className="mb-4">
          <img src={logo} alt={title} className="h-16 w-16 object-contain" />
        </div>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-gray-700 text-sm mb-2">{shopName}</p>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <p className="mt-2 text-gray-600 text-sm">
          <strong>Time:</strong> {startDate} to {endDate}
        </p>

        {keywords && keywords.length > 0 && (
          <p className="mt-2 text-gray-500">
            <strong>Keywords:</strong> {keywords.join(", ")}
          </p>
        )}
      </div>
      <div className="mt-auto">
        <button
          className="bg-[#46467A] text-white px-4 py-2 rounded-md w-full"
          onClick={handleUseClick}
        >
          {button}
        </button>
      </div>

      {isInfoFieldOpen && (
        <InfoField
          isOpen={isInfoFieldOpen}
          onClose={handleCloseInfoField}
          coupon={couponData}
        />
      )}
    </div>
  );
};

export default UserCouponCard;
