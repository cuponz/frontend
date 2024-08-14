import { useState } from "react";
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (
    selectedCategories,
    selectedBrands,
    startDate,
    endDate
  ) => {
    let filtered = [...coupons]; // Create a copy of the original coupons array

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((coupon) =>
        selectedCategories.includes(coupon.category)
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((coupon) =>
        selectedBrands.includes(coupon.brand)
      );
    }

    // Apply start date filter
    if (startDate) {
      filtered = filtered.filter((coupon) => coupon.startDate >= startDate);
    }

    // Apply end date filter
    if (endDate) {
      filtered = filtered.filter((coupon) => coupon.endDate <= endDate);
    }

    setFilteredCoupons(filtered);
    setCurrentPage(1); // Reset to first page after filtering
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
        <FilterBoard onFilterChange={handleFilterChange} />
        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="text-lg font-medium">
            {`${currentCoupons.length} / ${filteredCoupons.length} Coupons found`}
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
