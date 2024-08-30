import React from "react";
import Coupon from "./Coupon";
import { couponData } from "../data/couponData";

function ShopCouponList() {
  // Select only the first 4 coupons from the data array
  const topFourCoupons = couponData.slice(0, 4);

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {" "}
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
  );
}

export default ShopCouponList;

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
