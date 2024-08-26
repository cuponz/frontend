import React, { useState } from 'react';
import './AdminDashboard.css'; //css style in Admin.css

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
    <div className="admin-dashboard">
      <header>
        <div className="admin-info">
          <div className="avatar"></div>
          <div>
            <h3>Arman Admin</h3>
            <p>arman@gmail.com</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>Home</li>
            <li>All Coupons</li>
            <li>Categories</li>
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="management-section">
          <h2>Management</h2>
          <input type="text" placeholder="Search order ID" />
          <select>
            <option>Sales</option>
          </select>
          <select>
            <option>Status</option>
          </select>
          <button>Filter</button>
        </div>
        <table className="coupon-table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon.id}>
                <td><input type="checkbox" /></td>
                <td>{coupon.id}</td>
                <td>{coupon.startDate}</td>
                <td>{coupon.endDate}</td>
                <td className={`status ${coupon.status.toLowerCase()}`}>{coupon.status}</td>
                <td>
                  <button onClick={() => handleAction(coupon.id, 'Approve')} disabled={coupon.status === 'Approved'}>Approve</button>
                  <button onClick={() => handleAction(coupon.id, 'Reject')} disabled={coupon.status === 'Rejected'}>Reject</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button>1</button>
          <button>2</button>
          <button>...</button>
          <button>9</button>
          <button>10</button>
        </div>
      </main>
      <footer>
        <p>© 2024 i71. All rights reserved.</p>
        <ul>
          <li>Terms</li>
          <li>Privacy</li>
          <li>Cookies</li>
        </ul>
      </footer>
    </div>
  );
};

export default AdminDashboard;
