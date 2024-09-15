import couponData from "../data/couponData.json";

const PopupFail = ({ errorType, couponId }) => {
  const coupon = couponData.find((coupon) => coupon.id === couponId);

  const getErrorMessage = () => {
    switch (errorType) {
      case "already-redeemed":
        return "The code has already been redeemed";
      case "expired":
        return "The code has expired";
      case "not-started":
        return coupon
          ? `The coupon is not available until ${coupon.startDate}`
          : "The coupon is not yet available";
      case "location":
        return "This coupon is not available at this location";
      default:
        return "An error occurred while redeeming the coupon";
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-500 rounded-full p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Redemption Failed
        </h2>
        <p className="text-center text-gray-700">{getErrorMessage()}</p>
      </div>
    </div>
  );
};

export default PopupFail;
