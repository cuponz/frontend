import React, { useState } from 'react';

const AdminDashboard = () => {
  const [coupons, setCoupons] = useState([
    { id: 7676, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7677, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Pending' },
    { id: 7678, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7679, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7680, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Rejected' },
    // More dummy data can be added here for testing
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 5;

  const handleAction = (id, action) => {
    setCoupons(
      coupons.map(coupon =>
        coupon.id === id
          ? { ...coupon, status: action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : coupon.status }
          : coupon
      )
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredCoupons = coupons
    .filter(coupon => coupon.id.toString().includes(searchTerm))
    .filter(coupon => (filterStatus ? coupon.status === filterStatus : true));

  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = filteredCoupons.slice(indexOfFirstCoupon, indexOfLastCoupon);
  const totalPages = Math.ceil(filteredCoupons.length / couponsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-purple-200 text-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
          <div>
            <h3 className="text-lg font-semibold">Admin Arman</h3>
            <p className="text-sm">armanhossain@gmail.com</p>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">All Coupons</li>
            <li className="hover:underline cursor-pointer">Categories</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">About Us</li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-4">
        <div className="flex flex-col md:flex-row items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 md:mb-0 md:mr-4">Management</h2>
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search order ID"
              value={searchTerm}
              onChange={handleSearch}
              className="mb-2 md:mb-0 md:mr-2 p-2 border rounded"
            />
            <select
              value={filterStatus}
              onChange={handleFilterChange}
              className="mb-2 md:mb-0 md:mr-2 p-2 border rounded"
            >
              <option value="">Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button className="p-2 bg-blue-500 text-white rounded">Filter</button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border"></th>
                <th className="px-4 py-2 border text-gray-700">ID</th>
                <th className="px-4 py-2 border text-gray-700">Start Date</th>
                <th className="px-4 py-2 border text-gray-700">End Date</th>
                <th className="px-4 py-2 border text-gray-700">Status</th>
                <th className="px-4 py-2 border text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCoupons.map(coupon => (
                <tr key={coupon.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 border text-center text-gray-700">{coupon.id}</td>
                  <td className="px-4 py-2 border text-center text-gray-700">{coupon.startDate}</td>
                  <td className="px-4 py-2 border text-center text-gray-700">{coupon.endDate}</td>
                  <td className={`px-4 py-2 border text-center ${coupon.status === 'Approved' ? 'text-green-500' : coupon.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {coupon.status}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button onClick={() => handleAction(coupon.id, 'Approve')} disabled={coupon.status === 'Approved'} className={`px-2 py-1 rounded ${coupon.status === 'Approved' ? 'bg-gray-400' : 'bg-green-500 text-white'}`}>
                      Approve
                    </button>
                    <button onClick={() => handleAction(coupon.id, 'Reject')} disabled={coupon.status === 'Rejected'} className={`px-2 py-1 rounded ${coupon.status === 'Rejected' ? 'bg-gray-400' : 'bg-red-500 text-white'}`}>
                      Reject
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
        <footer className="bg-[#4C4188] text-white text-center p-4">
    <div className="flex justify-center space-x-6 mb-2">
      <a href="#" className="text-white hover:underline">Home</a>
      <a href="#" className="text-white hover:underline">Hot Deals</a>
      <a href="#" className="text-white hover:underline">Contact Us</a>
      <a href="#" className="text-white hover:underline">About Us</a>
    </div>
    <p className="text-sm">© 2024 i71 Cuponz All rights reserved </p>
    <div className="flex justify-center space-x-4 mt-2">
      <a href="#" className="text-white hover:underline">Terms</a>
      <a href="#" className="text-white hover:underline">Privacy</a>
      <a href="#" className="text-white hover:underline">Cookies</a>
    </div>
  </footer>

    </div>
  );
};

export default AdminDashboard;
