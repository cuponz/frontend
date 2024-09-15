// show coupon details and qr code

const CouponDetails = ({ coupon, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-grow"></div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <img
          src={coupon.logo}
          alt={coupon.brand}
          className="h-16 w-auto object-contain"
        />
      </div>

      <h2 className="text-xl font-semibold mb-2 text-center">{coupon.title}</h2>
      <div className="bg-blue-100 border border-dashed border-indigo-900 border-4 text-blue-800 px-4 py-2 rounded-lg mb-4 text-center ">
        <span className="font-mono text-lg font-bold">{coupon.redeemCode}</span>
      </div>
      <div className="flex justify-center mb-4">
        <img
          src="/api/placeholder/200/200"
          alt="QR Code"
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <h3 className="font-semibold mb-1">Offer Details:</h3>
        <p>{coupon.description}</p>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-semibold">Expiration Date:</span> {coupon.endDate}
      </p>
      <a
        href="#"
        className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          // Add logic to go to the website
        }}
      >
        Go to the {coupon.brand} website
      </a>
    </div>
  );
};

export default CouponDetails;
