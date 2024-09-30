const CategoriesMenu = ({ isElectronicsOpen, toggleElectronics }) => {
  return (
    <div className="absolute left-0 mt-2 flex w-screen bg-[#e5e1f7] border-t border-gray-200 shadow-lg">
      <ul className="w-1/4 bg-[#E9E7F9] p-4 border-r border-gray-200">
        <li
          className="hover:bg-purple-100 px-4 py-2 cursor-pointer flex justify-between"
          onClick={toggleElectronics}
        >
          Electronics
          <span
            className={`ml-2 transform ${isElectronicsOpen ? "rotate-90" : ""}`}
          >
            {">"}
          </span>
        </li>
        <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
          Clothing & Accessories
        </li>
        <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
          Health and Beauty
        </li>
        <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">Offers</li>
      </ul>
      {isElectronicsOpen && (
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="px-4 py-2 font-bold">Type</div>
              <ul>
                <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
                  Desktop
                </li>
                <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
                  Laptop
                </li>
                <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
                  Mobile
                </li>
              </ul>
            </div>
            <div>
              <div className="px-4 py-2 font-bold">Brand</div>
              <ul>
                <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
                  Dell
                </li>
                <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
                  Xiaomi
                </li>
                <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
                  Huawei
                </li>
                <li className="hover:bg-purple-100 px-4 py-2 cursor-pointer">
                  Microsoft
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesMenu;
