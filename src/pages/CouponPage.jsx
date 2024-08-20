import { useState, useEffect } from "react";
import CouponCard from "../components/CouponCard";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FilterBoard from "../components/FilterBoard";
import Pagination from "../components/Pagination";
import coupons from "../data/couponData.json";

const itemsPerPage = 8; // Number of coupons per page

const CouponPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCoupons, setFilteredCoupons] = useState(coupons);
  const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    selectedCategories: [],
    selectedBrands: [],
    selectedShopNames: [],
    startDate: "",
    endDate: "",
  });

  // Extract unique values for categories, brands, and shop names
  const uniqueCategories = [
    ...new Set(coupons.map((coupon) => coupon.category)),
  ];
  const uniqueBrands = [...new Set(coupons.map((coupon) => coupon.brand))];
  const uniqueShopNames = [
    ...new Set(coupons.map((coupon) => coupon.shopName)),
  ];

  useEffect(() => {
    applyFilters();
  }, [appliedFilters, searchTerm]); // Depend on filters and searchTerm

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applyFilters = () => {
    let filtered = [...coupons]; // Create a copy of the original coupons array

    const {
      selectedCategories,
      selectedBrands,
      selectedShopNames,
      startDate,
      endDate,
    } = appliedFilters;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((coupon) =>
        selectedCategories.includes(coupon.category)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((coupon) =>
        selectedBrands.includes(coupon.brand)
      );
    }

    if (selectedShopNames.length > 0) {
      filtered = filtered.filter((coupon) =>
        selectedShopNames.includes(coupon.shopName)
      );
    }

    if (startDate) {
      filtered = filtered.filter((coupon) => coupon.startDate >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((coupon) => coupon.endDate <= endDate);
    }

    if (searchTerm) {
      filtered = filtered.filter((coupon) =>
        coupon.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCoupons(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilterBoard = () => {
    setIsFilterBoardVisible(!isFilterBoardVisible);
    document.body.style.overflow = isFilterBoardVisible ? "auto" : "hidden";
  };

  const currentCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14">
        <Banner message="Discover the Best Deals Today!" />
        <div className="flex items-center justify-between mb-4">
          <div>
            <button
              onClick={toggleFilterBoard}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Toggle Filters
            </button>
          </div>
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-64 px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {isFilterBoardVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleFilterBoard}
          ></div>
        )}

        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${
            isFilterBoardVisible ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: "70%", maxWidth: "300px" }} // Reduced width here
        >
          {isFilterBoardVisible && (
            <FilterBoard
              onFilterChange={handleFilterChange}
              applyFilters={applyFilters}
              categories={uniqueCategories}
              brands={uniqueBrands}
              shopNames={uniqueShopNames}
              closeFilterBoard={toggleFilterBoard} // Pass close function
            />
          )}
        </div>

        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="text-lg font-medium">
            {`${filteredCoupons.length} / ${coupons.length} Coupons found`}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {currentCoupons.map((coupon, index) => (
            <CouponCard
              key={index}
              logo={coupon.logo}
              title={coupon.title}
              keywords={coupon.keywords}
              startDate={coupon.startDate}
              endDate={coupon.endDate}
              description={coupon.description}
              shopName={coupon.shopName}
            />
          ))}
        </div>
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCoupons.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
