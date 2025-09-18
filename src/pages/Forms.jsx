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

  const sectionTitle = {
    fontSize: "16px",
    fontWeight: 700,
    marginTop: "20px",
    color: "#00aaff",
  };

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

  const JobForm = () => (
    <div style={formContainer}>
      <div style={formHeader}>
        <h2 style={{ color: "#00aaff" }}>Add New Job</h2>
        <button style={backBtn} onClick={() => navigate("/forms")}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <form style={styledForm}>
        <h3 style={sectionTitle}>Customer</h3>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Mobile (used for lookup)</label>
            <input type="text" placeholder="Enter mobile number" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Customer Name</label>
            <input type="text" placeholder="Enter customer name" style={inputStyle} />
          </div>
        </div>

        <h3 style={sectionTitle}>Vehicle</h3>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Vehicle</label>
            <input type="text" placeholder="Vehicle (reg - model)" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Bay</label>
            <input type="text" placeholder="Enter bay number" style={inputStyle} />
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#7f8c8d" }}>
          If this is an existing vehicle, pick from customer vehicles above; otherwise enter new vehicle details.
        </p>

        <h3 style={sectionTitle}>Job Details</h3>
        <div style={inputGroup}>
          <label style={labelStyle}>Search Service</label>
          <input type="text" placeholder="Search service by name or ID..." style={inputStyle} />
        </div>
        <button type="button" style={{ ...submitBtn, width: "180px" }}>Add Service</button>
        <p style={{ fontSize: "13px", color: "#7f8c8d" }}>Available: 1 • Occupied: 4</p>
        <p style={{ fontSize: "14px", fontStyle: "italic", color: "#888" }}>No services selected yet.</p>

        <h3 style={sectionTitle}>Pre-inspection</h3>
        <div style={inputGroup}>
          <label style={labelStyle}>Pre-inspection Notes</label>
          <textarea placeholder="Notes visible to assigned staff"
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}></textarea>
        </div>
        <div style={inputGroup}>
          <label style={labelStyle}>Upload Images & Videos</label>
          <input type="file" multiple style={inputStyle} />
        </div>
        <p style={{ fontSize: "14px", color: "#888" }}>No media uploaded yet.</p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          <button type="button" style={{ ...backBtn, flex: 1 }}>Cancel</button>
          <button type="submit" style={{ ...submitBtn, flex: 1 }}>Create Job</button>
        </div>
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
        <h3 style={sectionTitle}>Personal Information</h3>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>First Name</label>
            <input type="text" placeholder="Enter first name" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Last Name</label>
            <input type="text" placeholder="Enter last name" style={inputStyle} />
          </div>
        </div>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Role/Position</label>
            <input type="text" placeholder="e.g. Admin, Worker" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>SIN Number</label>
            <input type="text" placeholder="123-456-789" style={inputStyle} />
          </div>
        </div>

        <h3 style={sectionTitle}>Contact Information</h3>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Phone Number</label>
            <input type="text" placeholder="+1 234 567 8900" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Email Address</label>
            <input type="email" placeholder="employee@company.com" style={inputStyle} />
          </div>
        </div>

        <h3 style={sectionTitle}>Account Credentials</h3>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Password</label>
            <input type="password" placeholder="Create a password" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" style={inputStyle} />
          </div>
        </div>

        <h3 style={sectionTitle}>Compensation</h3>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Wage Type</label>
            <select style={inputStyle}>
              <option>Monthly</option>
              <option>Hourly</option>
            </select>
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Wage Rate</label>
            <input type="text" placeholder="Monthly salary" style={inputStyle} />
          </div>
        </div>

        <button type="submit" style={submitBtn}>
          <FaSave /> Create Employee Account
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
          <input type="text" placeholder="Enter customer name" style={inputStyle} />
        </div>
        <div style={responsiveFormRow}>
          <div style={inputGroup}>
            <label style={labelStyle}>Date</label>
            <input type="date" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Time</label>
            <input type="time" style={inputStyle} />
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
            <input type="text" placeholder="Enter item name" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Quantity</label>
            <input type="number" placeholder="Enter quantity" style={inputStyle} />
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
            <input type="text" placeholder="Enter job code" style={inputStyle} />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Expected Delay (mins)</label>
            <input type="number" placeholder="Enter delay" style={inputStyle} />
          </div>
        </div>
        <div style={inputGroup}>
          <label style={labelStyle}>Reason</label>
          <textarea placeholder="Enter reason for delay"
            style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}></textarea>
        </div>
        <button type="submit" style={submitBtn}>
          <FaSave /> Report Delay
        </button>
      </form>
    </div>
  );

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

  if (type === "job") return <JobForm />;
  if (type === "booking") return <BookingForm />;
  if (type === "employee") return <EmployeeForm />;
  if (type === "inventory") return <InventoryForm />;
  if (type === "delay") return <DelayForm />;

  return <div>Form not found</div>;
}
