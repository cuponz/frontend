import React, { useState } from 'react';
import './Admin.css'; //css style in Admin.css

const AdminDashboard = () => {
  const [coupons, setCoupons] = useState([
    { id: 7676, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7677, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Pending' },
    { id: 7678, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7679, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7680, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Rejected' },
  ]);

  const handleAction = (id, action) => {
    setCoupons(
      coupons.map(coupon =>
        coupon.id === id
          ? { ...coupon, status: action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : coupon.status }
          : coupon
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
          <div>
            <h3 className="text-lg font-semibold">Arman Admin</h3>
            <p className="text-sm">arman@gmail.com</p>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>Home</li>
            <li>All Coupons</li>
            <li>Categories</li>
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-4">
        <div className="flex flex-col md:flex-row items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 md:mb-0 md:mr-4">Management</h2>
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <input type="text" placeholder="Search order ID" className="mb-2 md:mb-0 md:mr-2 p-2 border rounded" />
            <select className="mb-2 md:mb-0 md:mr-2 p-2 border rounded">
              <option>Sales</option>
            </select>
            <select className="mb-2 md:mb-0 md:mr-2 p-2 border rounded">
              <option>Status</option>
            </select>
            <button className="p-2 bg-blue-600 text-white rounded">Filter</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 border"></th>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon.id}>
                  <td className="px-4 py-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 border text-center">{coupon.id}</td>
                  <td className="px-4 py-2 border text-center">{coupon.startDate}</td>
                  <td className="px-4 py-2 border text-center">{coupon.endDate}</td>
                  <td className={`px-4 py-2 border text-center ${coupon.status === 'Approved' ? 'text-green-600' : coupon.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {coupon.status}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button onClick={() => handleAction(coupon.id, 'Approve')} disabled={coupon.status === 'Approved'} className={`px-2 py-1 rounded ${coupon.status === 'Approved' ? 'bg-gray-400' : 'bg-green-600 text-white'}`}>
                      Approve
                    </button>
                    <button onClick={() => handleAction(coupon.id, 'Reject')} disabled={coupon.status === 'Rejected'} className={`px-2 py-1 rounded ${coupon.status === 'Rejected' ? 'bg-gray-400' : 'bg-red-600 text-white'}`}>
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
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">...</button>
          <button className="px-3 py-1 border rounded">9</button>
          <button className="px-3 py-1 border rounded">10</button>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>© 2024 i71 Couponz All rights reserved </p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>Terms</li>
          <li>Privacy</li>
          <li>Cookies</li>
        </ul>
      </footer>
    </div>
  );
};

export default AdminDashboard;
