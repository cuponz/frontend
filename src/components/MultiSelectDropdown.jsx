import { useState } from "react";

const MultiSelectDropdown = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  onChange,
  width = "w-full",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    onChange(); // Call the onChange function to notify the parent component of changes
  };

  const renderSelectedOptions = () => {
    if (selectedOptions.length === 0) return `Select ${label}`;
    return selectedOptions.join(", ");
  };

  return (
    <div className={`relative inline-block ${width} text-gray-700`}>
      <label className="text-gray-700 font-medium">{label}</label>
      <button
        onClick={toggleDropdown}
        className={`w-full px-4 py-2 md:w-48  border-2 border-yellow-600 rounded-md shadow-md flex items-center justify-between focus:outline-none focus:border-blue-500`}
      >
        <span className="truncate">{renderSelectedOptions()}</span>
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
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 ${width}`}
        >
          <ul className="py-2">
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="mr-2 text-yellow-600 focus:ring-yellow-500 h-4 w-4 border-gray-300 rounded"
                />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
