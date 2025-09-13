import React, { useState } from "react";
import { FiSearch, FiUser, FiPhone, FiMail, FiChevronRight, FiX, FiTag } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      mobile: "9876543210",
      email: "rahul@example.com",
      behaviour: "Loyal",
      vehicles: [{ plate: "MH12AB1234", model: "Honda City", year: "2020" }],
      jobs: [
        { id: "J101", datetime: "2025-09-01 14:30", vehicle: "MH12AB1234", model: "Honda City 2020" },
        { id: "J088", datetime: "2025-08-20 10:15", vehicle: "MH12AB1234", model: "Honda City 2020" },
      ],
    },
    {
      id: 2,
      name: "Priya Verma",
      mobile: "9988776655",
      email: "priya@example.com",
      behaviour: "Occasional",
      vehicles: [{ plate: "TS09XY5678", model: "Hyundai i20", year: "2019" }],
      jobs: [{ id: "J099", datetime: "2025-08-29 11:00", vehicle: "TS09XY5678", model: "Hyundai i20 2019" }],
    },
    {
      id: 3,
      name: "Amit Patel",
      mobile: "8899667744",
      email: "amit@example.com",
      behaviour: "Frequent",
      vehicles: [
        { plate: "KA03MN7890", model: "Toyota Innova", year: "2021" },
        { plate: "DL10PQ4567", model: "Maruti Swift", year: "2018" },
      ],
      jobs: [
        { id: "J095", datetime: "2025-08-25 16:45", vehicle: "KA03MN7890", model: "Toyota Innova 2021" },
        { id: "J091", datetime: "2025-08-15 09:00", vehicle: "DL10PQ4567", model: "Maruti Swift 2018" },
      ],
    },
  ];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      c.vehicles.some((v) => v.plate.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="customers-container">
      <div className="header">
        <h1>Customers</h1>
        <p>Manage and view customer information</p>
      </div>

      {/* Search */}
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name, phone, or vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-btn" onClick={() => setSearch("")}>
            <FiX />
          </button>
        )}
      </div>

      {/* Customer List */}
      <div className="customer-list">
        <div className="list-header">
          <h2>Customer List</h2>
          <span>{filteredCustomers.length} customers</span>
        </div>

        {filteredCustomers.length > 0 ? (
          <div className="cards">
            {filteredCustomers.map((c) => (
              <div
                key={c.id}
                className={`card ${selectedCustomer?.id === c.id ? "active" : ""}`}
                onClick={() => setSelectedCustomer(c)}
              >
                <div className="avatar">{c.name.charAt(0)}</div>
                <div className="info">
                  <h3>{c.name}</h3>
                  <p><FiPhone /> {c.mobile}</p>
                  <p><FiMail /> {c.email}</p>
                  <p className="vehicles"><FaCar /> {c.vehicles.length} vehicle(s)</p>
                </div>
                <FiChevronRight className="chevron" />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <FiUser size={48} />
            <h3>No customers found</h3>
            <p>Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Customer Details */}
      <div className="details">
        {!selectedCustomer ? (
          <div className="placeholder">
            <FiUser size={64} />
            <h3>Select a customer</h3>
            <p>Details will appear here</p>
          </div>
        ) : (
          <>
            <div className="details-header">
              <h2>Customer Details</h2>
              <button className="close" onClick={() => setSelectedCustomer(null)}>
                <FiX />
              </button>
            </div>

            <div className="profile">
              <div className="avatar-lg">{selectedCustomer.name.charAt(0)}</div>
              <div>
                <h2>{selectedCustomer.name}</h2>
                <p><FiPhone /> {selectedCustomer.mobile}</p>
                <p><FiMail /> {selectedCustomer.email}</p>
                <p className="behaviour"><FiTag /> Behaviour: {selectedCustomer.behaviour}</p>
              </div>
            </div>

            <div className="section">
              <h3>Vehicles</h3>
              <div className="vehicles">
                {selectedCustomer.vehicles.map((v, i) => (
                  <div key={i} className="vehicle-card">
                    <FaCar />
                    <div>
                      <h4>{v.model} ({v.year})</h4>
                      <p>{v.plate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h3>Job History</h3>
              <div className="jobs">
                <div className="job-header">
                  <span>Date & Time</span>
                  <span>Vehicle</span>
                  <span>Job ID</span>
                </div>
                {selectedCustomer.jobs.map((j) => (
                  <div key={j.id} className="job-row">
                    <span>{j.datetime}</span>
                    <span>{j.vehicle} • {j.model}</span>
                    <span className="job-link">
                      <Link to={`/jobs/${j.id}`}>{j.id}</Link>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .customers-container {
          background: #fff;
          color: #1e293b;
          padding: 24px;
          font-family: 'Inter', sans-serif;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: #00aaff; /* sky blue */
        }
        .header p {
          color: #64748b;
          margin: 4px 0 20px;
        }
        .search-box {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin-bottom: 24px;
        }
        .search-box input {
          width: 100%;
          padding: 12px 40px 12px 40px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 15px;
          box-sizing: border-box;
        }
        .search-box input:focus {
          outline: none;
          border-color: #0284c7;
          box-shadow: 0 0 0 2px rgba(2,132,199,0.2);
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .clear-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }
        .customer-list {
          margin-bottom: 28px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .list-header h2 {
          color: #00aaff;
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        .cards {
          display: flex;
          flex-direction: column;
        }
        .card {
          display: flex;
          gap: 16px;
          padding: 16px;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: background 0.2s;
        }
        .card:hover {
          background: #f9fafb;
        }
        .card.active {
          background: #f0f9ff;
          border-left: 4px solid #00aaff;
        }
        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #00aaff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
        }
        .info h3 {
          margin: 0 0 4px;
          font-size: 16px;
          color: #00aaff;
        }
        .info p {
          margin: 2px 0;
          font-size: 14px;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .vehicles {
          color: #00aaff;
          font-size: 14px;
        }
        .chevron {
          margin-left: auto;
          color: #94a3b8;
        }
        .empty {
          padding: 40px;
          text-align: center;
          color: #94a3b8;
        }
        .details {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .placeholder {
          text-align: center;
          color: #94a3b8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .details-header h2 {
          color: #00aaff;
        }
        .details-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .close {
          background: none;
          border: none;
          font-size: 20px;
          color: #64748b;
          cursor: pointer;
        }
        .profile {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 16px;
        }
        .profile h2 {
          color: #00aaff;
        }
        .behaviour {
          color: #00aaff;
          font-weight: 500;
        }
        .avatar-lg {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #00aaff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 22px;
        }
        .section h3 {
          margin: 12px 0;
          font-size: 16px;
          font-weight: 600;
          color: #00aaff;
        }
        .vehicle-card {
          display: flex;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 8px;
          background: #f9fafb;
        }
        .jobs {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        .job-header, .job-row {
          display: grid;
          grid-template-columns: 1fr 1fr 0.5fr;
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
        }
        .job-header {
          background: #f1f5f9;
          font-weight: 600;
          color: #00aaff;
        }
        .job-link a {
          color: #00aaff;
          text-decoration: none;
          font-weight: 500;
        }
        .job-link a:hover {
          text-decoration: underline;
        }
        /* Responsive */
        @media (max-width: 768px) {
          .customers-container {
            padding: 16px;
          }
          .search-box {
            width: 100%;
          }
          .job-header, .job-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }
          .profile {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
