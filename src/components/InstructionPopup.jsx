import { useState, useEffect } from "react";

const InstructionPopup = ({ onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit") !== "false";
    if (!isFirstVisit) {
      onClose();
    } else {
      // Set a timeout to delay the appearance of the popup
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Delay in milliseconds (0.5 seconds)

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [onClose]);

  const handlePopupClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("isFirstVisit", "false");
    }
    setIsVisible(false);
    setTimeout(onClose, 300); // Allow transition to finish before closing
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          at nulla vitae urna faucibus auctor.
        </p>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={() => setDontShowAgain(!dontShowAgain)}
              className="mr-2"
            />
            <span className="text-sm">Don&apos;t show this again</span>
          </label>
          <button
            onClick={handlePopupClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            I understood
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPopup;
