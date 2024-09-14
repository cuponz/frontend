import { useState } from "react";
import shopCusData from "../data/shopCusData.json";
import Pagination from "./Utils/Pagination"; // Assuming you have a Pagination component

const itemsPerPage = 5;

const UserTable = ({ couponId, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter the user data by the coupon ID and search term
  const filteredData = shopCusData
    .filter((user) => user.coupon_id === couponId)
    .filter(
      (user) =>
        user.user_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phoneNumber.includes(searchTerm)
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600"
          onClick={onBack}
        >
          Back
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center text-gray-500">No records found</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b"></th>
                  <th className="px-4 py-2 border-b">Username</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.user_id} className="text-center">
                    <td className="px-4 py-2 border-b">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-2 border-b">{user.user_name}</td>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">{user.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default UserTable;
