// import React, { useState } from "react";
// import Coupon from "./Coupon";
// import { couponData } from "../data/couponData";
// import FilterBoard from "./FilterBoard"; // Assuming this component handles the filters

// function ShopCouponList() {
//   const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
//   const [filters, setFilters] = useState({
//     selectedCategories: [],
//     selectedShopNames: [],
//     startDate: "",
//     endDate: "",
//   });

//   // Apply filters to the coupons
//   const filteredCoupons = couponData
//     .filter((coupon) => {
//       return (
//         (filters.selectedCategories.length === 0 ||
//           filters.selectedCategories.includes(coupon.category)) &&
//         (filters.selectedShopNames.length === 0 ||
//           filters.selectedShopNames.includes(coupon.shopName)) &&
//         (filters.startDate === "" ||
//           new Date(coupon.startDate) >= new Date(filters.startDate)) &&
//         (filters.endDate === "" ||
//           new Date(coupon.endDate) <= new Date(filters.endDate))
//       );
//     })
//     .slice(0, 4); // Limit to top 4 filtered coupons

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   const toggleFilterBoard = () => {
//     setIsFilterBoardVisible(!isFilterBoardVisible);
//   };

//   // Extract unique categories and shop names from the data
//   const uniqueCategories = [
//     ...new Set(couponData.map((coupon) => coupon.category)),
//   ];
//   const uniqueShopNames = [
//     ...new Set(couponData.map((coupon) => coupon.shopName)),
//   ];

//   return (
//     <div className="flex flex-1 min-h-screen">
//       {isFilterBoardVisible && (
//         <div className="w-64 bg-white shadow-xl z-40 p-4 fixed inset-y-0 left-0">
//           <FilterBoard
//             onFilterChange={handleFilterChange}
//             initialFilters={filters}
//             categories={uniqueCategories}
//             shopNames={uniqueShopNames}
//             className="h-full"
//           />
//         </div>
//       )}
//       <div className="flex-1 flex justify-center">
//         <button
//           onClick={toggleFilterBoard}
//           className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           style={{ zIndex: 50 }} // Ensure button is clickable if sidebar overlaps
//         >
//           Toggle Filters
//         </button>
//         <div className="max-w-4xl w-full">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {filteredCoupons.map((coupon, index) => (
//               <Coupon
//                 key={index}
//                 logo={coupon.logo}
//                 title={coupon.title}
//                 description={coupon.description}
//                 keywords={coupon.keywords}
//                 startDate={coupon.startDate}
//                 endDate={coupon.endDate}
//                 couponCount={coupon.couponCount}
//                 shopName={coupon.shopName}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShopCouponList;

// use teh below one for  deployement for all coupons

// import React, { useState } from "react";
// import Coupon from "./Coupon";
// import { couponData } from "../data/couponData";

// function ShopCouponList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4; // Change to display only 4 items per page

//   // Calculate the index range for the current page
//   const indexOfLastCoupon = currentPage * itemsPerPage;
//   const indexOfFirstCoupon = indexOfLastCoupon - itemsPerPage;
//   const currentCoupons = couponData.slice(
//     indexOfFirstCoupon,
//     indexOfLastCoupon
//   );

//   // Determine the total number of pages
//   const totalPages = Math.ceil(couponData.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="max-w-4xl w-full">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//           {" "}
//           {/* // Adjusted grid for 2 columns on larger screens */}
//           {currentCoupons.map((coupon, index) => (
//             <Coupon
//               key={index}
//               logo={coupon.logo}
//               title={coupon.title}
//               description={coupon.description}
//               keywords={coupon.keywords}
//               startDate={coupon.startDate}
//               endDate={coupon.endDate}
//               couponCount={coupon.couponCount}
//               shopName={coupon.shopName}
//             />
//           ))}
//         </div>

//         <div className="mt-4 flex justify-center">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={`mx-1 px-3 py-1 border rounded ${
//                 index + 1 === currentPage
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300 text-black"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShopCouponList;

// import React, { useState } from "react";
// import Coupon from "./Coupon";
// import { couponData } from "../data/couponData";
// import FilterBoard from "./FilterBoard"; // Ensure this component handles the filters appropriately

// function ShopCouponList() {
//   const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
//   const [filters, setFilters] = useState({
//     selectedCategories: [],
//     selectedShopNames: [],
//     startDate: "",
//     endDate: "",
//   });

//   // Apply filters to the coupons
//   const filteredCoupons = couponData
//     .filter((coupon) => {
//       return (
//         (filters.selectedCategories.length === 0 ||
//           filters.selectedCategories.includes(coupon.category)) &&
//         (filters.selectedShopNames.length === 0 ||
//           filters.selectedShopNames.includes(coupon.shopName)) &&
//         (filters.startDate === "" ||
//           new Date(coupon.startDate) >= new Date(filters.startDate)) &&
//         (filters.endDate === "" ||
//           new Date(coupon.endDate) <= new Date(filters.endDate))
//       );
//     })
//     .slice(0, 4); // Limit to top 4 filtered coupons

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   const toggleFilterBoard = () => {
//     setIsFilterBoardVisible(!isFilterBoardVisible);
//   };

//   // Extract unique categories and shop names from the data
//   const uniqueCategories = [
//     ...new Set(couponData.map((coupon) => coupon.category)),
//   ];
//   const uniqueShopNames = [
//     ...new Set(couponData.map((coupon) => coupon.shopName)),
//   ];

//   return (
//     <div className="flex min-h-screen">
//       {isFilterBoardVisible && (
//         <div className="w-64 bg-white shadow-xl z-40 p-4 fixed inset-y-0 left-0">
//           <FilterBoard
//             onFilterChange={handleFilterChange}
//             initialFilters={filters}
//             categories={uniqueCategories}
//             shopNames={uniqueShopNames}
//             className="h-full"
//           />
//         </div>
//       )}
//       <div className="flex-1 flex flex-col">
//         <div className="px-4 py-2 flex justify-between items-center">
//           <h2 className="text-lg text-gray-700">Top Coupons</h2>
//           <button
//             onClick={toggleFilterBoard}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             style={{ zIndex: 50 }} // Ensure button is clickable and visible
//           >
//             Toggle Filters
//           </button>
//         </div>
//         <div className="flex justify-center">
//           <div className="max-w-4xl w-full">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {filteredCoupons.map((coupon, index) => (
//                 <Coupon
//                   key={index}
//                   logo={coupon.logo}
//                   title={coupon.title}
//                   description={coupon.description}
//                   keywords={coupon.keywords}
//                   startDate={coupon.startDate}
//                   endDate={coupon.endDate}
//                   couponCount={coupon.couponCount}
//                   shopName={coupon.shopName}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShopCouponList;
import React, { useState } from "react";
import Coupon from "./Coupon";
import { couponData } from "../data/couponData";
import FilterBoard from "./FilterBoard";

function ShopCouponList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedShopNames: [],
    startDate: "",
    endDate: "",
  });

  // Only slice the first 4 coupons for display
  const topFourCoupons = couponData.slice(0, 4).filter((coupon) => {
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilterBoard = () => {
    setIsFilterBoardVisible(!isFilterBoardVisible);
  };

  return (
    <div className="flex">
      {isFilterBoardVisible && (
        <FilterBoard
          onFilterChange={handleFilterChange}
          initialFilters={filters}
          categories={filters.selectedCategories}
          shopNames={filters.selectedShopNames}
          closeFilterBoard={toggleFilterBoard}
          className="w-64 fixed inset-y-0 left-0 bg-white shadow-xl z-40"
        />
      )}
      <div className="flex-1 min-h-screen">
        <div className="flex justify-center items-start">
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg text-gray-700">Top Coupons</h2>
            </div>
            <button
              onClick={toggleFilterBoard}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Filters
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topFourCoupons.map((coupon, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCouponList;
