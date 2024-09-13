import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import CouponCard from "../components/CouponCard";
import Banner from "../components/banner";
import FilterBoard from "../components/FilterBoard";
import Pagination from "../components/Pagination";
import Layout from "../layout/layout";
import InstructionPopup from "../components/InstructionPopup";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the new component

const itemsPerPage = 8;

const CouponPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    selectedCategories: [],
    selectedShopNames: [],
    startDate: "",
    endDate: "",
  });
  const [showPopup, setShowPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const location = useLocation();

  const fuseOptions = {
    keys: ["title", "description", "keywords", "shopName"], // Added "shopName" to the keys
    threshold: 0.3,
  };

  const fuse = new Fuse(coupons, fuseOptions);

  useEffect(() => {
    fetch("https://walts03.github.io/testdatacoupon/couponData.json")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data);

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
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error fetching coupon data:", error);
        setIsLoading(false);
      });
  }, [location.search]);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // useCallback to memoize the applyFilters function
  const applyFilters = useCallback(
    (filters = appliedFilters, couponsData = coupons) => {
      let filtered = [...couponsData];

      const { selectedCategories, selectedShopNames, startDate, endDate } =
        filters;

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((coupon) =>
          selectedCategories.includes(coupon.category)
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
        const searchResults = fuse.search(searchTerm);
        filtered = searchResults.map((result) => result.item);
      }

      setFilteredCoupons(filtered);
      setCurrentPage(1);
    },
    [appliedFilters, searchTerm, coupons] // Dependencies for useCallback
  );

  const uniqueCategories = [
    ...new Set(coupons.map((coupon) => coupon.category)),
  ];
  const uniqueShopNames = [
    ...new Set(coupons.map((coupon) => coupon.shopName)),
  ];

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  useEffect(() => {
    applyFilters();
  }, [appliedFilters, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = useCallback(
    debounce((e) => {
      setSearchTerm(e.target.value);
    }, 300),
    []
  );

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
      <Layout className="bg-gray-100">
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
                      shopNames={uniqueShopNames}
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
                      couponCount={coupon.availableCoupons}
                    />
                  ))}
                </div>

                <div className="mt-8 mb-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(
                      filteredCoupons.length / itemsPerPage
                    )}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CouponPage;
