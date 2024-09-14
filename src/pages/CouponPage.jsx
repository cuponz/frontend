import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import CouponCatalogue from "../components/Core/Coupon/CouponCatalogue";
import Banner from "../components/Banner";
import FilterBoard from "../components/Core/Coupon/FilterBoard";
import InstructionPopup from "../components/InstructionPopup";

import { debounce } from "../utils";

const CouponPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    selectedCategories: [],
    selectedShopNames: [],
    startDate: "",
    endDate: "",
  });
  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const uniqueCategories = [
    // ...new Set(coupons.map((coupon) => coupon.category)),
  ];

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = useCallback(
    debounce((e) => {
      setSearchTerm(e.target.value);
    }, 300),
    []);

  const toggleFilterBoard = () => {
    setIsFilterBoardVisible(!isFilterBoardVisible);
    document.body.style.overflow = isFilterBoardVisible ? "auto" : "hidden";
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-10">
          <Banner message="Discover the Best Deals Today!" />
          <title>Discover Local Deals</title>
          <div className="flex items-center justify-between mb-4 mt-5">
            <div>
              <button
                onClick={toggleFilterBoard}
                className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md shadow-lg hover:bg-yellow-600 focus:outline-none flex items-center"
              >
                Filter
                <i className="pl-2 fa-solid fa-caret-down"></i>
              </button>
            </div>
            <div className="ml-4">
              <input
                type="text"
                placeholder="Search coupons..."
                onChange={handleSearchChange}
                className="w-64 px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {showPopup && <InstructionPopup onClose={handlePopupClose} />}

          {isFilterBoardVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleFilterBoard}
            ></div>
          )}

          <div
            className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${isFilterBoardVisible ? "translate-x-0" : "-translate-x-full"
              }`}
            style={{ width: "70%", maxWidth: "300px" }}
          >
            {isFilterBoardVisible && (
              <FilterBoard
                onFilterChange={handleFilterChange}
                initialFilters={appliedFilters}
                categories={uniqueCategories}
                closeFilterBoard={toggleFilterBoard}
              />
            )}
          </div>

          <CouponCatalogue searchTerm={searchTerm} appliedFilters={appliedFilters} />

        </div>
      </div>
    </>
  );
};

export default CouponPage;