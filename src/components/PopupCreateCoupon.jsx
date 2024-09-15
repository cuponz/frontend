import { useState } from "react";
import PopupThankYou from "../components/PopupThankYou";

const PopupCreateCoupon = ({ isOpen, onClose, onSubmit }) => {
  const [category, setCategory] = useState("");
  const [couponName, setCouponName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [userInfoRequired, setUserInfoRequired] = useState("phone");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      category,
      couponName,
      startDate,
      endDate,
      images,
      description,
      userInfoRequired,
    });
    setShowThankYou(true);
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    onClose();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  if (!isOpen) return null;

  if (showThankYou) {
    return <PopupThankYou isOpen={true} onClose={handleCloseThankYou} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Coupon</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Coupon Name
              </label>
              <input
                type="text"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-1 flex items-center">
              <button
                type="button"
                onClick={() => document.getElementById("image-upload").click()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
              >
                Upload Images
              </button>
              <input
                id="image-upload"
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
              <span className="ml-3 text-sm text-gray-600">
                {images.length} {images.length === 1 ? "image" : "images"}{" "}
                selected
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
              placeholder="Write your message.."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              User Information Required
            </label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="phone"
                  checked={userInfoRequired === "phone"}
                  onChange={() => setUserInfoRequired("phone")}
                  className="form-radio"
                />
                <span className="ml-2">Phone number</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={userInfoRequired === "email"}
                  onChange={() => setUserInfoRequired("email")}
                  className="form-radio"
                />
                <span className="ml-2">Email</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Create Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupCreateCoupon;
