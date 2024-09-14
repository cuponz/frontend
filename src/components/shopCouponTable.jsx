import { useState } from "react";
import shopCouponData from "../data/shopCouponData.json";
import Pagination from "./Utils/Pagination";

const itemsPerPage = 5;

const ShopCouponTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [sortField, setSortField] = useState("id");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDateFilter(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDateFilter(e.target.value);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
    setSortField("id");
  };

  const filteredData = shopCouponData
    .filter((coupon) => {
      if (searchTerm && !coupon.coupon_id.toString().includes(searchTerm)) {
        return false;
      }
      if (statusFilter && coupon.status !== statusFilter) {
        return false;
      }
      if (startDateFilter && coupon.startDate < startDateFilter) {
        return false;
      }
      if (endDateFilter && coupon.endDate > endDateFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortField === "id") {
        return a.coupon_id - b.coupon_id;
      } else if (sortField === "startDate") {
        return new Date(a.startDate) - new Date(b.startDate);
      } else if (sortField === "endDate") {
        return new Date(a.endDate) - new Date(b.endDate);
      }
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          placeholder="Search coupon ID"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-auto flex-grow px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="w-full sm:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Status</option>
          <option value="Approve">Approve</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          placeholder="Start Date"
          value={startDateFilter}
          onChange={handleStartDateChange}
          className="w-full sm:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDateFilter}
          onChange={handleEndDateChange}
          className="w-full sm:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={sortField}
          onChange={handleSortFieldChange}
          className="w-full sm:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="id">Sort by ID</option>
          <option value="startDate">Sort by Start Date</option>
          <option value="endDate">Sort by End Date</option>
        </select>
        <button
          onClick={handleResetFilters}
          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600"
        >
          Reset Filters
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600">
          Create Coupon
        </button>
      </div>

      {/* Coupon Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b"></th>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Start Date</th>
              <th className="px-4 py-2 border-b">End Date</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((coupon) => (
              <tr key={coupon.coupon_id} className="text-center">
                <td className="px-4 py-2 border-b">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2 border-b">#{coupon.coupon_id}</td>
                <td className="px-4 py-2 border-b">{coupon.startDate}</td>
                <td className="px-4 py-2 border-b">{coupon.endDate}</td>
                <td
                  className={`px-4 py-2 border-b ${
                    coupon.status === "Approve"
                      ? "text-green-500"
                      : coupon.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {coupon.status}
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex justify-center space-x-2">
                    <button className="w-20 px-2 py-1 text-white bg-yellow-500 rounded">
                      Edit
                    </button>
                    <button className="w-20 px-2 py-1 text-white bg-blue-500 rounded">
                      Pause
                    </button>
                    <button className="w-20 px-2 py-1 text-white bg-red-500 rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShopCouponTable;
