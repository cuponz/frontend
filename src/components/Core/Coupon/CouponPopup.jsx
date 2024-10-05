import { useState } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FiCopy } from "react-icons/fi";

const CouponPopup = ({ coupon, onClose }) => {
  const redemptionLink = `${window.location.origin}/redeem/${coupon.redemption_id}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(coupon.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };

  const formattedDate = new Date(coupon.end_date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <IoIosClose className="text-3xl" />
        </button>

        <div className="flex justify-center mb-6">
          <img
            src={coupon.logo_url}
            alt={coupon.title}
            className="w-32 h-32 object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {coupon.title}
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
            <input
              type="text"
              value={coupon.code}
              readOnly
              className="bg-transparent border-none outline-none text-blue-700 text-xl font-mono flex-grow"
            />
            <button
              onClick={handleCopy}
              className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Copy Coupon Code"
            >
              {copied ? "Copied!" : <FiCopy />}
            </button>
          </div>
        </div>

        {!coupon.url && (
          <>
            <div className="text-center text-gray-500 font-medium mb-4">OR</div>
            <div className="flex justify-center mb-6">
              <QRCode value={redemptionLink} size={200} />
            </div>
          </>
        )}

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Offer Details:
            </h3>
            <p className="text-gray-600">{coupon.desc}</p>
          </div>

          <div>
            <span className="font-semibold text-gray-700">
              Expiration Date:{" "}
            </span>
            <span className="text-gray-600">{formattedDate}</span>
          </div>

          {coupon.url ? (
            <p>
              Please visit the shop website at:{" "}
              <Link to={coupon.url} className="text-blue-500 hover:underline">
                {coupon.url}
              </Link>
            </p>
          ) : (
            <p>
              Scan the QR code or visit:{" "}
              <a
                href={redemptionLink}
                className="text-blue-500 hover:underline"
              >
                {redemptionLink}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponPopup;
