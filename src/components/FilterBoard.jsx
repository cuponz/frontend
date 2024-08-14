import { useState, useEffect } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

const FilterBoard = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const categories = ["Desktop", "Laptop", "Phone", "Tablet", "Accessory"];
  const brands = ["Apple", "Samsung", "Dell", "HP", "Microsoft", "Asus"];

  useEffect(() => {
    // Call onFilterChange whenever any of the filter states change
    onFilterChange(selectedCategories, selectedBrands, startDate, endDate);
  }, [selectedCategories, selectedBrands, startDate, endDate, onFilterChange]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="flex flex-wrap items-center justify-between mt-6 mb-6 rounded-md space-y-4 md:space-y-0">
      <div className="flex flex-wrap space-y-4 md:space-y-0 md:flex-nowrap w-full text-gray-700">
        <div className="flex flex-col w-full md:w-auto md:flex-1 md:mr-4">
          <MultiSelectDropdown
            label="Categories"
            options={categories}
            selectedOptions={selectedCategories}
            setSelectedOptions={setSelectedCategories}
            width="w-full md:w-48"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto md:flex-1 md:mr-4">
          <MultiSelectDropdown
            label="Brand"
            options={brands}
            selectedOptions={selectedBrands}
            setSelectedOptions={setSelectedBrands}
            width="w-full md:w-48"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto md:flex-1 md:mr-4">
          <label htmlFor="start-date" className="text-gray-700 font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto md:flex-1 md:mr-4">
          <label htmlFor="end-date" className="text-gray-700 font-medium">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto md:flex-1 md:mr-4 justify-end">
          <button
            onClick={resetFilters}
            className="mt-6 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBoard;
