import React, { useState } from "react";
import Coupon from "./Coupon";
import { couponData } from "../data/couponData";
import FilterBoard from "./FilterBoard";

function CouponsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedShopNames: [],
    startDate: "",
    endDate: "",
  });
  const itemsPerPage = 10;

  // Filter coupons based on applied filters
  const filteredCoupons = couponData.filter((coupon) => {
    return (
      (filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(coupon.category)) &&
      (filters.selectedShopNames.length === 0 ||
        filters.selectedShopNames.includes(coupon.shopName)) &&
      (filters.startDate === "" ||
        new Date(coupon.startDate) >= new Date(filters.startDate)) &&
      (filters.endDate === "" ||
        new Date(coupon.endDate) <= new Date(filters.endDate))
    );
  });

  const currentCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page after filter
  };

  const toggleFilterBoard = () => {
    setIsFilterBoardVisible(!isFilterBoardVisible);
  };

  // Extract unique categories and shop names from the data
  const uniqueCategories = [
    ...new Set(couponData.map((coupon) => coupon.category)),
  ];
  const uniqueShopNames = [
    ...new Set(couponData.map((coupon) => coupon.shopName)),
  ];

  return (
    <div className="flex">
      {isFilterBoardVisible && (
        <FilterBoard
          onFilterChange={handleFilterChange}
          initialFilters={filters}
          categories={uniqueCategories}
          shopNames={uniqueShopNames}
          closeFilterBoard={toggleFilterBoard}
          className="w-64 fixed inset-y-0 left-0 bg-white shadow-xl z-40"
        />
      )}
      <div className="flex-1 min-h-screen">
        <div className="px-4 py-2 flex justify-start">
          {" "}
          {/* Adjusted for left alignment */}
          <button
            onClick={toggleFilterBoard}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Filters
          </button>
        </div>
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCoupons.map((coupon, index) => (
                <Coupon
                  key={index}
                  logo={coupon.logo}
                  title={coupon.title}
                  description={coupon.description}
                  keywords={coupon.keywords}
                  startDate={coupon.startDate}
                  endDate={coupon.endDate}
                  couponCount={coupon.couponCount}
                  shopName={coupon.shopName}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              {Array.from(
                { length: Math.ceil(filteredCoupons.length / itemsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 px-3 py-1 border rounded ${
                      index + 1 === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponsList;
