// src/pages/Customers.jsx
import React, { useState, useEffect } from "react";
import { FiSearch, FiUser, FiPhone, FiMail, FiChevronRight, FiX, FiTag, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    behaviour: "",
    vehicles: [],
  });

  const API_URL = "http://localhost:5000/api/customers";

  // Fetch all customers
  const fetchCustomers = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error("Error fetching customers:", err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      (c.vehicles || []).some(v => v.plate.toLowerCase().includes(search.toLowerCase()))
  );

  // Handle form change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add or Update customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await fetch(`${API_URL}/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setShowForm(false);
      setFormData({ name: "", mobile: "", email: "", behaviour: "", vehicles: [] });
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setSelectedCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit customer
  const handleEdit = (c) => {
    setFormData(c);
    setShowForm(true);
  };

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
        {search && <button className="clear-btn" onClick={() => setSearch("")}><FiX /></button>}
        <button className="add-btn" onClick={() => { setShowForm(true); setFormData({ name: "", mobile: "", email: "", behaviour: "", vehicles: [] }); }}>
          <FiPlus /> Add Customer
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="behaviour" placeholder="Behaviour" value={formData.behaviour} onChange={handleChange} />
          <button type="submit">{formData.id ? "Update" : "Add"} Customer</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}

      {/* Customer List */}
      <div className="customer-list">
        <div className="list-header">
          <h2>Customer List</h2>
          <span>{filteredCustomers.length} customers</span>
        </div>

        {filteredCustomers.length > 0 ? (
          <div className="cards">
            {filteredCustomers.map((c) => (
              <div key={c.id} className={`card ${selectedCustomer?.id === c.id ? "active" : ""}`} onClick={() => setSelectedCustomer(c)}>
                <div className="avatar">{c.name.charAt(0)}</div>
                <div className="info">
                  <h3>{c.name}</h3>
                  <p><FiPhone /> {c.mobile}</p>
                  <p><FiMail /> {c.email}</p>
                  <p className="vehicles"><FaCar /> {(c.vehicles || []).length} vehicle(s)</p>
                </div>
                <div className="actions">
                  <FiEdit className="edit-btn" onClick={() => handleEdit(c)} />
                  <FiTrash2 className="delete-btn" onClick={() => handleDelete(c.id)} />
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
              <button className="close" onClick={() => setSelectedCustomer(null)}><FiX /></button>
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
                {(selectedCustomer.vehicles || []).map((v, i) => (
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
                {(selectedCustomer.jobs || []).map((j) => (
                  <div key={j.id} className="job-row">
                    <span>{j.datetime}</span>
                    <span>{j.vehicle} • {j.model}</span>
                    <span className="job-link"><Link to={`/jobs/${j.id}`}>{j.id}</Link></span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .customers-container { background: #fff; color: #1e293b; padding: 24px; font-family: 'Inter', sans-serif; }
        .header h1 { font-size: 28px; font-weight: 700; margin: 0; color: #00aaff; }
        .header p { color: #64748b; margin: 4px 0 20px; }
        .search-box { position: relative; width: 100%; margin-bottom: 24px; display: flex; gap: 12px; align-items: center; }
        .search-box input { flex: 1; padding: 12px 40px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 15px; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .clear-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .add-btn { display: flex; align-items: center; gap: 4px; padding: 8px 12px; background: #00aaff; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
        .customer-form { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .customer-form input { padding: 8px; border-radius: 8px; border: 1px solid #ccc; }
        .customer-form button { padding: 8px; border-radius: 8px; border: none; cursor: pointer; }
        .customer-list { margin-bottom: 28px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .list-header { display: flex; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #e2e8f0; color: #00aaff; font-weight: 600; }
        .cards { display: flex; flex-direction: column; }
        .card { display: flex; gap: 16px; padding: 16px; align-items: center; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s; position: relative; }
        .card:hover { background: #f9fafb; }
        .card.active { background: #f0f9ff; border-left: 4px solid #00aaff; }
        .avatar { width: 44px; height: 44px; border-radius: 50%; background: #00aaff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 18px; }
        .info h3 { margin: 0 0 4px; font-size: 16px; color: #00aaff; }
        .info p { margin: 2px 0; font-size: 14px; color: #475569; display: flex; align-items: center; gap: 6px; }
        .vehicles { color: #00aaff; font-size: 14px; }
        .actions { margin-left: auto; display: flex; gap: 8px; }
        .edit-btn, .delete-btn { cursor: pointer; color: #64748b; }
        .details { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); min-height: 300px; display: flex; flex-direction: column; justify-content: center; }
        .placeholder { text-align: center; color: #64748b; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
        .placeholder h3 { color: #00aaff; margin: 16px 0 8px; font-size: 18px; }
        .placeholder p { color: #64748b; margin: 0; font-size: 14px; }
        .details-header { display: flex; justify-content: space-between; margin-bottom: 20px; color: #00aaff; font-weight: 600; }
        .close { background: none; border: none; font-size: 20px; color: #64748b; cursor: pointer; }
        .profile { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; }
        .profile h2 { color: #00aaff; }
        .behaviour { color: #00aaff; font-weight: 500; }
        .avatar-lg { width: 60px; height: 60px; border-radius: 50%; background: #00aaff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 22px; }
        .section h3 { margin: 12px 0; font-size: 16px; font-weight: 600; color: #00aaff; }
        .vehicle-card { display: flex; gap: 12px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 8px; background: #f9fafb; }
        .jobs { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
        .job-header, .job-row { display: grid; grid-template-columns: 1fr 1fr 0.5fr; padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .job-header { background: #f1f5f9; font-weight: 600; color: #00aaff; }
        .job-link a { color: #00aaff; text-decoration: none; font-weight: 500; }
        .job-link a:hover { text-decoration: underline; }
        .empty { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          padding: 48px 20px; 
          text-align: center; 
          color: #64748b; 
        }
        .empty h3 { 
          color: #00aaff; 
          margin: 16px 0 8px; 
          font-size: 18px; 
        }
        .empty p { 
          color: #64748b; 
          margin: 0; 
          font-size: 14px; 
        }
        @media (max-width: 768px) {
          .customers-container { padding: 16px; }
          .job-header, .job-row { grid-template-columns: 1fr; gap: 6px; }
          .profile { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
}