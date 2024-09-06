import React, { useState, useEffect } from 'react';
import './Admin.css';

const AdminDashboard = () => {
  const [coupons, setCoupons] = useState([
    { id: 7676, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7677, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Pending' },
    { id: 7678, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7679, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Approved' },
    { id: 7680, startDate: '06/30/2022', endDate: '06/30/2022', status: 'Rejected' },
  ]);

  const [filters, setFilters] = useState({
    searchOrderId: '',
    endDate: '',
    startDate: '',
    status: '',
    sortId: ''
  });

  const [filteredCoupons, setFilteredCoupons] = useState(coupons);

  useEffect(() => {
    filterCoupons();
  }, [filters, coupons]);

  const filterCoupons = () => {
    let filtered = [...coupons];

    // Filter by Order ID
    if (filters.searchOrderId) {
      filtered = filtered.filter(coupon =>
        coupon.id.toString().includes(filters.searchOrderId)
      );
    }

    // Filter by Start Date
    if (filters.startDate === 'latest') {
      filtered = filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (filters.startDate === 'oldest') {
      filtered = filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    // Filter by End Date
    if (filters.endDate === 'latest') {
      filtered = filtered.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    } else if (filters.endDate === 'oldest') {
      filtered = filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }

    // Filter by Status
    if (filters.status) {
      filtered = filtered.filter(coupon => coupon.status === filters.status);
    }

    // Sort by ID (ascending or descending)
    if (filters.sortId === 'asc') {
      filtered = filtered.sort((a, b) => a.id - b.id);
    } else if (filters.sortId === 'desc') {
      filtered = filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredCoupons(filtered);
  };

  const handleAction = (id, action) => {
    setCoupons(
      coupons.map(coupon =>
        coupon.id === id
          ? { ...coupon, status: action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : coupon.status }
          : coupon
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header>
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

      {/* Admin Info Section */}
      <div className="admin-info">
        <div className="avatar"></div>
        <div>
          <h3>Admin Arman</h3>
          <p>armanadmin@gmail.com</p>
        </div>
      </div>

      {/* Main Section */}
      <main>
        <div className="filters">
          <input
            type="text"
            className="filter-select search-input"
            id="searchOrderId"
            placeholder="Search Order ID"
            value={filters.searchOrderId}
            onChange={handleFilterChange}
          />

          <select className="filter-select" id="endDate" value={filters.endDate} onChange={handleFilterChange}>
            <option value="" disabled>End date</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>

          <select className="filter-select" id="startDate" value={filters.startDate} onChange={handleFilterChange}>
            <option value="" disabled>Start date</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>

          <select className="filter-select" id="status" value={filters.status} onChange={handleFilterChange}>
            <option value="" disabled>Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select className="filter-select" id="sortId" value={filters.sortId} onChange={handleFilterChange}>
            <option value="" disabled>Sort by ID</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Coupon Table */}
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
            {filteredCoupons.map(coupon => (
              <tr key={coupon.id}>
                <td><input type="checkbox" /></td>
                <td>{coupon.id}</td>
                <td>{coupon.startDate}</td>
                <td>{coupon.endDate}</td>
                <td className={`status ${coupon.status.toLowerCase()}`}>{coupon.status}</td>
                <td>
                  <button
                    onClick={() => handleAction(coupon.id, 'Approve')}
                    disabled={coupon.status === 'Approved'}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(coupon.id, 'Reject')}
                    disabled={coupon.status === 'Rejected'}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">...</button>
          <button className="page-btn">9</button>
          <button className="page-btn">10</button>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>© 2024 i71 Cuponz All rights reserved.</p>
          <ul>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
