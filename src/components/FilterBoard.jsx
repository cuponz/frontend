import { useState, useEffect } from "react";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

const FilterBoard = ({
  onFilterChange,
  categories,
  shopNames,
  closeFilterBoard,
  initialFilters,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters.selectedCategories
  );
  const [selectedShopNames, setSelectedShopNames] = useState(
    initialFilters.selectedShopNames
  );
  const [startDate, setStartDate] = useState(initialFilters.startDate);
  const [endDate, setEndDate] = useState(initialFilters.endDate);

  useEffect(() => {
    onFilterChange({
      selectedCategories,
      selectedShopNames,
      startDate,
      endDate,
    });
  }, [selectedCategories, selectedShopNames, startDate, endDate]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedShopNames([]);
    setStartDate("");
    setEndDate("");
  };

  const appliedFilterCount =
    selectedCategories.length +
    selectedShopNames.length +
    (startDate ? 1 : 0) +
    (endDate ? 1 : 0);

  return (
    <div className="p-4 h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-lg font-medium">Filters ({appliedFilterCount})</h2>
        <button onClick={closeFilterBoard} className="text-2xl font-bold">
          &times;
        </button>
      </div>

      <div className="flex flex-col space-y-3">
        <MultiSelectDropdown
          label="Categories"
          options={categories}
          selectedOptions={selectedCategories}
          setSelectedOptions={setSelectedCategories}
        />
        <MultiSelectDropdown
          label="Shop Name"
          options={shopNames}
          selectedOptions={selectedShopNames}
          setSelectedOptions={setSelectedShopNames}
        />
        <div className="flex flex-col">
          <label htmlFor="start-date" className="text-gray-700 font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="text-gray-700 font-medium">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-auto flex space-x-4">
        <button
          onClick={resetFilters}
          className="w-full bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
        >
          Reset
        </button>
        <button
          onClick={closeFilterBoard} // Close the filter board when applying filters
          className="w-full bg-green-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterBoard;
