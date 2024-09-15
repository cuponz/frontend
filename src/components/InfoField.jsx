// user enter the information require to appear coupons
import { useState } from "react";
import CouponDetails from "../components/CouponDetails";

const InfoField = ({ isOpen, onClose, coupon }) => {
  const [input, setInput] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Redeeming with:", input);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {!showDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Please enter your email or phone number to redeem the code
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Email or Phone Number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
              >
                Redeem code
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <CouponDetails coupon={coupon} onClose={handleClose} />
      )}
    </div>
  );
};

export default InfoField;
