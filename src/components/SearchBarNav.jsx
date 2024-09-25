import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShop } from "react-icons/fa6";
import couponData from "../data/couponData.json";

const SearchBarNav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredCoupons([]);
    } else {
      const results = couponData
        .filter((coupon) =>
          coupon.shopName.toLowerCase().includes(value.toLowerCase())
        )
        .reduce((unique, coupon) => {
          if (!unique.some((item) => item.shopName === coupon.shopName)) {
            unique.push(coupon);
          }
          return unique;
        }, []);
      setFilteredCoupons(results);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          id="search-input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border rounded-full shadow-md"
        />
        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* Dropdown for displaying filtered results */}
      {filteredCoupons.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
          {filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <FaShop
                className="h-8 w-8 rounded-full mr-3"
                style={{ color: generateRandomColor() }}
              />
              <span>{coupon.shopName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarNav;
