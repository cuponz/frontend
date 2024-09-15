import { useState } from "react";

const PopupThankYou = ({ isOpen, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-[#8475CA] text-white p-6  w-full max-w-md relative min-h-[60vh] flex flex-colborder  border-white border-4">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-white hover:text-gray-300"
          aria-label="Close"
        >
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
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-4 mt-8">
            Thank You for Adding your Product to CuponZ
          </h2>
          <p className="mb-4">
            You will not see your product right away after uploading.
          </p>
          <p className="mb-6">
            Thank you for being patiently waiting for our admin to approve your
            product.
          </p>
          <label className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={() => setDontShowAgain(!dontShowAgain)}
              className="mr-2"
            />
            Do not show this again
          </label>
        </div>
        <div className="absolute bottom-0 right-0 m-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
          <div className="w-24 h-24 bg-pink-300 rounded-full -mt-12 -ml-12"></div>
        </div>
      </div>
    </div>
  );
};

export default PopupThankYou;
