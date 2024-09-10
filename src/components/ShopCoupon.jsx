import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ShopCouponCard from "../components/ShopCouponCard";
import FilterBoard from "../components/FilterBoard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import couponData from "../data/couponData.json";

const itemsPerPage = 8;

const ShopCoupon = ({
  onShowDetails = (id) => console.log("Coupon ID:", id),
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    selectedCategories: [],
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Filter for "GadgetHub" coupons and set initial state
    const data = couponData.filter((coupon) => coupon.shopName === "GadgetHub");
    setCoupons(data);
    setFilteredCoupons(data);

    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      const newFilters = {
        ...appliedFilters,
        selectedCategories: [category],
      };
      setAppliedFilters(newFilters);
      applyFilters(newFilters, data);
    } else {
      setFilteredCoupons(data);
    }

    // Set loading state to false after data is ready
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [location.search]);

  useEffect(() => {
    applyFilters(appliedFilters, coupons);
  }, [appliedFilters, coupons]);

  const applyFilters = useCallback(
    (filters = appliedFilters, couponsData = coupons) => {
      let filtered = [...couponsData];

      const { selectedCategories, startDate, endDate } = filters;

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((coupon) =>
          selectedCategories.includes(coupon.category)
        );
      }

      if (startDate) {
        filtered = filtered.filter((coupon) => coupon.startDate >= startDate);
      }

      if (endDate) {
        filtered = filtered.filter((coupon) => coupon.endDate <= endDate);
      }

      setFilteredCoupons(filtered);
      setCurrentPage(1);
    },
    [appliedFilters, coupons]
  );

  const uniqueCategories = [
    ...new Set(coupons.map((coupon) => coupon.category)),
  ];

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    <div>
      <div className="min-h-screen">
        <div className="flex items-center justify-between mb-4 ">
          <div>
            <button
              onClick={toggleFilterBoard}
              className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md shadow-lg hover:bg-yellow-600 focus:outline-none flex items-center"
            >
              Filter
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
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

            <div className="flex justify-between items-center mt-4 mb-4">
              <div className="text-lg font-medium">
                {`${filteredCoupons.length} / ${coupons.length} Coupons found`}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {currentCoupons.map((coupon) => (
                <ShopCouponCard
                  key={coupon.id}
                  logo={coupon.logo}
                  title={coupon.title}
                  keywords={coupon.keywords}
                  startDate={coupon.startDate}
                  endDate={coupon.endDate}
                  description={coupon.description}
                  shopName={coupon.shopName}
                  couponCount={coupon.availableCoupons}
                  numUsers={coupon.numUsers || 0}
                  onShowDetails={() => onShowDetails(coupon.id)} // Use onShowDetails prop
                />
              ))}
            </div>

            <div className="mt-8 mb-8">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredCoupons.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopCoupon;
