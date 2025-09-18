
import React, { useState } from "react";
import {
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiCircle,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiClock,
  FiStar,
  FiRefreshCw,
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiLock,
  FiBriefcase,
  FiCreditCard,
  FiDollarSign,
  FiEye,
  FiEyeOff
} from "react-icons/fi";

export default function Staff() {
  const initialStaff = [
    { 
      id: "EMP001", 
      name: "Amit Kumar", 
      role: "Admin", 
      mobile: "9876543210", 
      email: "amit@example.com", 
      status: "Present", 
      jobs: ["JOB102"], 
      avgJobTime: "2.5 hrs", 
      qualityScore: "98%", 
      reimageJobs: 12, 
      wageType: "Monthly", 
      wageRate: 50000,
      firstName: "Amit",
      lastName: "Kumar"
    },
    { 
      id: "EMP002", 
      name: "Ravi Teja", 
      role: "Worker", 
      mobile: "9988776655", 
      email: "ravi@example.com", 
      status: "Available", 
      jobs: ["JOB105", "JOB108"], 
      avgJobTime: "3.2 hrs", 
      qualityScore: "92%", 
      reimageJobs: 8, 
      wageType: "Hourly", 
      wageRate: 250,
      firstName: "Ravi",
      lastName: "Teja"
    },
  ];

  const availableJobs = [
    { id: "JOB101", title: "Office Renovation", status: "Available" },
    { id: "JOB102", title: "Server Installation", status: "Assigned" },
    { id: "JOB103", title: "Network Setup", status: "Available" },
    { id: "JOB104", title: "Furniture Assembly", status: "Available" },
    { id: "JOB105", title: "Electrical Work", status: "Assigned" },
    { id: "JOB106", title: "Painting", status: "Available" },
    { id: "JOB107", title: "Plumbing", status: "Assigned" },
    { id: "JOB108", title: "Carpentry", status: "Assigned" },
  ];

  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    mobile: "",
    email: "",
    sin: "",
    wageType: "Monthly",
    wageRate: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
      case "Available":
        return "#10b981"; 
      case "Busy":
        return "#f59e0b"; 
      case "On Leave":
        return "#ef4444"; 
      default:
        return "#6b7280"; 
    }
  };

  const filteredStaff = staff.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    const newEmployee = {
      id: "EMP" + (staff.length + 1).toString().padStart(3, "0"),
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      mobile: formData.mobile,
      email: formData.email,
      sin: formData.sin,
      wageType: formData.wageType,
      wageRate: formData.wageRate,
      status: "Available",
      jobs: [],
      avgJobTime: "-",
      qualityScore: "-",
      reimageJobs: 0
    };
    setStaff([...staff, newEmployee]);
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
      mobile: "",
      email: "",
      sin: "",
      wageType: "Monthly",
      wageRate: "",
      password: "",
      confirmPassword: ""
    });
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Staff Management</h1>
        <button style={styles.addButton} onClick={() => setShowForm(true)}>
          <FiUserPlus size={18} style={{ marginRight: "8px" }} />
          Add Staff
        </button>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search staff..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={styles.filterButton}>
          <FiFilter size={16} style={{ marginRight: "8px" }} />
          Filters
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Wage Type</th>
              <th style={styles.th}>Wage Rate</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Assigned Jobs</th>
              <th style={styles.th}>Performance</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s) => (
              <tr key={s.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.employeeInfo}>
                    <div style={styles.avatar}>{s.name.charAt(0)}</div>
                    <div>
                      <div style={styles.name}>{s.name}</div>
                      <div style={styles.id}>ID: {s.id}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>{s.role}</td>
                <td style={styles.td}>
                  <div style={styles.contact}>
                    <div>{s.mobile}</div>
                    <div style={styles.email}>{s.email}</div>
                  </div>
                </td>
                <td style={styles.td}>{s.wageType}</td>
                <td style={styles.td}>
                  {s.wageType === "Hourly"
                    ? `₹${s.wageRate}/hr`
                    : `₹${s.wageRate}/month`}
                </td>
                <td style={styles.td}>
                  <div style={styles.statusContainer}>
                    <FiCircle color={getStatusColor(s.status)} size={14} />
                    <span
                      style={{
                        ...styles.status,
                        color: getStatusColor(s.status),
                      }}
                    >
                      {s.status}
                    </span>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.jobsContainer}>
                    {s.jobs.length > 0 ? (
                      s.jobs.map((jobId) => {
                        const job = availableJobs.find((j) => j.id === jobId);
                        return job ? (
                          <div key={jobId} style={styles.jobTag}>
                            {job.title}
                          </div>
                        ) : null;
                      })
                    ) : (
                      <span style={styles.noJobs}>No assigned jobs</span>
                    )}
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.performance}>
                    <div style={styles.metric}>
                      <FiClock size={14} style={{ marginRight: "4px" }} />
                      {s.avgJobTime}
                    </div>
                    <div style={styles.metric}>
                      <FiStar size={14} style={{ marginRight: "4px" }} />
                      {s.qualityScore}
                    </div>
                    <div style={styles.metric}>
                      <FiRefreshCw size={14} style={{ marginRight: "4px" }} />
                      {s.reimageJobs} reimages
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button style={styles.editButton}>
                      <FiEdit size={16} />
                    </button>
                    <button style={styles.deleteButton}>
                      <FiTrash2 size={16} />
                    </button>
                    <button style={styles.moreButton}>
                      <FiMoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0, color: "#2563eb" }}>Employee Onboarding</h2>
              <button style={styles.closeBtn} onClick={() => setShowForm(false)}>
                <FiX size={18} />
              </button>
            </div>
            
            <form style={styles.form} onSubmit={handleFormSubmit}>
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiUser style={styles.inputIcon} />
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      style={styles.input}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiUser style={styles.inputIcon} />
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      style={styles.input}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiBriefcase style={styles.inputIcon} />
                      Role/Position
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      style={styles.input}
                      placeholder="e.g. Admin, Worker"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiCreditCard style={styles.inputIcon} />
                      SIN Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sin}
                      onChange={(e) =>
                        setFormData({ ...formData, sin: e.target.value })
                      }
                      style={styles.input}
                      placeholder="123-456-789"
                    />
                  </div>
                </div>
              </div>
              
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiPhone style={styles.inputIcon} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      style={styles.input}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiMail style={styles.inputIcon} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      style={styles.input}
                      placeholder="employee@company.com"
                    />
                  </div>
                </div>
              </div>
              
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Account Credentials</h3>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiLock style={styles.inputIcon} />
                      Password
                    </label>
                    <div style={styles.passwordContainer}>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        style={{...styles.input, border: 'none', padding: 0}}
                        placeholder="Create a password"
                      />
                      <button 
                        type="button" 
                        style={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiLock style={styles.inputIcon} />
                      Confirm Password
                    </label>
                    <div style={styles.passwordContainer}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        style={{...styles.input, border: 'none', padding: 0}}
                        placeholder="Confirm your password"
                      />
                      <button 
                        type="button" 
                        style={styles.passwordToggle}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Compensation</h3>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiDollarSign style={styles.inputIcon} />
                      Wage Type
                    </label>
                    <select
                      value={formData.wageType}
                      onChange={(e) =>
                        setFormData({ ...formData, wageType: e.target.value })
                      }
                      style={styles.input}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Hourly">Hourly</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <FiDollarSign style={styles.inputIcon} />
                      Wage Rate
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.wageRate}
                      onChange={(e) =>
                        setFormData({ ...formData, wageRate: e.target.value })
                      }
                      style={styles.input}
                      placeholder={formData.wageType === "Hourly" ? "Hourly rate" : "Monthly salary"}
                    />
                  </div>
                </div>
              </div>
              
              <button type="submit" style={styles.submitBtn}>
                Create Employee Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "24px",
    background: "#ffffff",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  title: {
    color: "#00aaff",
    fontSize: "28px",
    fontWeight: 700,
    margin: 0,
  },
  addButton: {
    background: "linear-gradient(135deg, #00aaff 0%, #00aaff 100%)",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
    transition: "all 0.2s ease",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  searchContainer: {
    position: "relative",
    flex: "1",
    minWidth: "250px",
    maxWidth: "400px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
  },
  searchInput: {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#f8fafc",
  },
  filterButton: {
    background: "transparent",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    fontSize: "14px",
  },
  tableContainer: {
    overflowX: "auto",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #f1f5f9",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1000px",
  },
  tableHeader: { background: "#f8fafc" },
  th: {
    color: "#64748b",
    textAlign: "left",
    padding: "16px",
    fontSize: "14px",
    fontWeight: 600,
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
    transition: "background 0.2s ease",
  },
  td: {
    padding: "16px",
    fontSize: "14px",
    color: "#334155",
    verticalAlign: "top",
  },
  employeeInfo: { display: "flex", alignItems: "center", gap: "12px" },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#00aaff",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "16px",
  },
  name: { fontWeight: 600, color: "#1e293b", marginBottom: "4px" },
  id: { fontSize: "12px", color: "#64748b" },
  contact: { lineHeight: "1.4" },
  email: { color: "#64748b", fontSize: "13px" },
  statusContainer: { display: "flex", alignItems: "center", gap: "6px" },
  status: { fontWeight: 500 },
  jobsContainer: { display: "flex", flexDirection: "column", gap: "8px" },
  jobTag: {
    background: "#e0f2fe",
    color: "#00aaff",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 500,
    display: "inline-block",
    width: "fit-content",
  },
  noJobs: { color: "#94a3b8", fontStyle: "italic", fontSize: "13px" },
  performance: { display: "flex", flexDirection: "column", gap: "8px" },
  metric: { display: "flex", alignItems: "center", fontSize: "13px", color: "#475569" },
  actionButtons: { display: "flex", gap: "8px" },
  editButton: {
    background: "#e0f2fe",
    color: "#00aaff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  moreButton: {
    background: "#f1f5f9",
    color: "#64748b",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "16px",
    boxSizing: "border-box",
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "0",
    width: "100%",
    maxWidth: "700px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 24px 16px",
    borderBottom: "1px solid #e2e8f0",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#64748b",
    padding: "4px",
    borderRadius: "4px",
  },
  form: {
    padding: "24px",
  },
  formSection: {
    marginBottom: "24px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    color: "#00aaff",
    fontSize: "18px",
    fontWeight: 600,
    margin: "0 0 16px 0",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px",
  },
  inputGroup: {
    flex: "1",
    minWidth: "250px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "8px",
  },
  inputIcon: {
    marginRight: "8px",
    color: "#64748b",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#fff",
    transition: "all 0.2s ease",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#fff",
  },
  passwordToggle: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #00aaff 0%, #00aaff 100%)",
    color: "#fff",
    padding: "14px 24px",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
    transition: "all 0.2s ease",
  }
};