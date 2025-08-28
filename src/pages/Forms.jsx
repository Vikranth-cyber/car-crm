// Forms.jsx — Ultra Premium Responsive Redesign
// Ensure you installed: npm i react-icons

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaCalendarAlt,
  FaUserPlus,
  FaBoxes,
  FaClock,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

export default function Forms() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  // Shared styles
  const formContainer = {
    maxWidth: "850px",
    margin: "20px auto",
    background: "white",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.1)",
  };

  const formHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  };

  const backBtn = {
    background: "none",
    border: "1px solid #ddd",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  };

  const styledForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  // ✅ Responsive form rows
  const formRow = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  const responsiveFormRow = {
    ...formRow,
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  };

  const inputGroup = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: "#2c3e50",
  };

  const inputStyle = {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    transition: "all 0.3s ease",
  };

  const submitBtn = {
    background: "#00aaff",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    marginTop: "10px",
    justifyContent: "center",
  };

  // ---------- Forms ----------
  const JobForm = () => (
    <div style={formContainer}>
      <div style={formHeader}>
        <h2 style={{ color: "#00aaff" }}>Add New Job</h2>
        <button style={backBtn} onClick={() => navigate("/forms")}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <form style={styledForm}>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Customer Name</label>
            <input type="text" placeholder="Enter customer name" required style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Mobile Number</label>
            <input type="text" placeholder="Enter mobile number" required style={inputStyle} />
          </div>
        </div>

        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Plate Number</label>
            <input type="text" placeholder="Enter vehicle plate number" required style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Job Code</label>
            <input type="text" placeholder="Enter job code" required style={inputStyle} />
          </div>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Special Instructions</label>
          <textarea placeholder="Any special instructions" style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}></textarea>
        </div>

        <button type="submit" style={submitBtn}>
          <FaSave /> Save Job
        </button>
      </form>
    </div>
  );

  const BookingForm = () => (
    <div style={formContainer}>
      <div style={formHeader}>
        <h2 style={{ color: "#00aaff" }}>New Booking</h2>
        <button style={backBtn} onClick={() => navigate("/forms")}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <form style={styledForm}>
        <div style={inputGroup}>
          <label style={labelStyle}>Customer Name</label>
          <input type="text" placeholder="Enter customer name" required style={inputStyle} />
        </div>

        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Date</label>
            <input type="date" required style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Time</label>
            <input type="time" required style={inputStyle} />
          </div>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Service Type</label>
          <select style={inputStyle}>
            <option>Basic Wash</option>
            <option>Premium Wash</option>
            <option>Interior Cleaning</option>
            <option>Full Service</option>
          </select>
        </div>

        <button type="submit" style={submitBtn}>
          <FaSave /> Save Booking
        </button>
      </form>
    </div>
  );

  const EmployeeForm = () => (
    <div style={formContainer}>
      <div style={formHeader}>
        <h2 style={{ color: "#00aaff" }}>Add Employee</h2>
        <button style={backBtn} onClick={() => navigate("/forms")}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <form style={styledForm}>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" placeholder="Enter full name" required style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="Enter email" required style={inputStyle} />
          </div>
        </div>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Phone</label>
            <input type="text" placeholder="Enter phone number" required style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Role</label>
            <input type="text" placeholder="Enter role" required style={inputStyle} />
          </div>
        </div>

        <button type="submit" style={submitBtn}>
          <FaSave /> Save Employee
        </button>
      </form>
    </div>
  );

  const InventoryForm = () => (
    <div style={formContainer}>
      <div style={formHeader}>
        <h2 style={{ color: "#00aaff" }}>Inventory Request</h2>
        <button style={backBtn} onClick={() => navigate("/forms")}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <form style={styledForm}>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Item Name</label>
            <input type="text" placeholder="Enter item name" required style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Quantity</label>
            <input type="number" placeholder="Enter quantity" required style={inputStyle} />
          </div>
        </div>

        <button type="submit" style={submitBtn}>
          <FaSave /> Save Request
        </button>
      </form>
    </div>
  );

  const DelayForm = () => (
    <div style={formContainer}>
      <div style={formHeader}>
        <h2 style={{ color: "#00aaff" }}>Delay Reporting</h2>
        <button style={backBtn} onClick={() => navigate("/forms")}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <form style={styledForm}>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Job Code</label>
            <input type="text" placeholder="Enter job code" required style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Expected Delay (mins)</label>
            <input type="number" placeholder="Enter delay" required style={inputStyle} />
          </div>
        </div>
        <div style={inputGroup}>
          <label style={labelStyle}>Reason</label>
          <textarea placeholder="Enter reason for delay" style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}></textarea>
        </div>

        <button type="submit" style={submitBtn}>
          <FaSave /> Report Delay
        </button>
      </form>
    </div>
  );

  // --------- Default screen ---------
  if (!type) {
    const container = {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "24px",
    };

    const grid = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "24px",
    };

    const optionCard = {
      background: "white",
      borderRadius: "14px",
      padding: "28px 20px",
      textAlign: "center",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "all 0.3s ease",
    };

    return (
      <div style={container}>
        <h2 style={{ marginBottom: "28px", color: "#00aaff", textAlign: "center" }}>Select a Form</h2>
        <div style={grid}>
          <div style={optionCard} onClick={() => navigate("/forms?type=job")}>
            <FaClipboardList size={36} style={{ marginBottom: "12px", color: "#00aaff" }} />
            <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#2c3e50" }}>Add Job</h3>
            <p style={{ fontSize: "14px", color: "#7f8c8d" }}>Create a new job entry</p>
          </div>

          <div style={optionCard} onClick={() => navigate("/forms?type=booking")}>
            <FaCalendarAlt size={36} style={{ marginBottom: "12px", color: "#00aaff" }} />
            <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#2c3e50" }}>New Booking</h3>
            <p style={{ fontSize: "14px", color: "#7f8c8d" }}>Schedule a new appointment</p>
          </div>

          <div style={optionCard} onClick={() => navigate("/forms?type=employee")}>
            <FaUserPlus size={36} style={{ marginBottom: "12px", color: "#00aaff" }} />
            <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#2c3e50" }}>Add Employee</h3>
            <p style={{ fontSize: "14px", color: "#7f8c8d" }}>Register a new team member</p>
          </div>

          <div style={optionCard} onClick={() => navigate("/forms?type=inventory")}>
            <FaBoxes size={36} style={{ marginBottom: "12px", color: "#00aaff" }} />
            <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#2c3e50" }}>Inventory Request</h3>
            <p style={{ fontSize: "14px", color: "#7f8c8d" }}>Request supplies or materials</p>
          </div>

          <div style={optionCard} onClick={() => navigate("/forms?type=delay")}>
            <FaClock size={36} style={{ marginBottom: "12px", color: "#00aaff" }} />
            <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#2c3e50" }}>Delay Reporting</h3>
            <p style={{ fontSize: "14px", color: "#7f8c8d" }}>Report job delays</p>
          </div>
        </div>
      </div>
    );
  }

  // --------- Routes ----------
  if (type === "job") return <JobForm />;
  if (type === "booking") return <BookingForm />;
  if (type === "employee") return <EmployeeForm />;
  if (type === "inventory") return <InventoryForm />;
  if (type === "delay") return <DelayForm />;

  return <div>Form not found</div>;
}
