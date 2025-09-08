// Staff.jsx
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
  FiDollarSign,
  FiCalendar,
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
      attendanceHours: 0,
      deductions: 0
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
      attendanceHours: 160,
      deductions: 0
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
  const [showPayrollModal, setShowPayrollModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payrollData, setPayrollData] = useState({
    attendanceHours: 0,
    deductions: 0
  });
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    wageType: "Monthly",
    wageRate: "",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
      case "Available":
        return "#10b981"; // green
      case "Busy":
        return "#f59e0b"; // amber
      case "On Leave":
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  };

  const calculateSalary = (employee) => {
    if (employee.wageType === "Hourly") {
      return employee.wageRate * (employee.attendanceHours || 0);
    } else {
      return employee.wageRate - (employee.deductions || 0);
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
    const newEmployee = {
      id: "EMP" + (staff.length + 1).toString().padStart(3, "0"),
      ...formData,
      status: "Available",
      jobs: [],
      avgJobTime: "-",
      qualityScore: "-",
      reimageJobs: 0,
      attendanceHours: 0,
      deductions: 0
    };
    setStaff([...staff, newEmployee]);
    setFormData({
      name: "",
      role: "",
      mobile: "",
      email: "",
      wageType: "Monthly",
      wageRate: "",
    });
    setShowForm(false);
  };

  const handlePayrollSubmit = (e) => {
    e.preventDefault();
    const updatedStaff = staff.map(emp => {
      if (emp.id === selectedEmployee.id) {
        return {
          ...emp,
          attendanceHours: payrollData.attendanceHours,
          deductions: payrollData.deductions
        };
      }
      return emp;
    });
    setStaff(updatedStaff);
    setShowPayrollModal(false);
    setPayrollData({ attendanceHours: 0, deductions: 0 });
  };

  const openPayrollModal = (employee) => {
    setSelectedEmployee(employee);
    setPayrollData({
      attendanceHours: employee.attendanceHours || 0,
      deductions: employee.deductions || 0
    });
    setShowPayrollModal(true);
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

      {/* Search + Filters */}
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

      {/* Staff Table */}
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
              <th style={styles.th}>Salary</th>
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
                  <div style={styles.salaryContainer}>
                    <div style={styles.salaryAmount}>
                      ₹{calculateSalary(s).toLocaleString('en-IN')}
                    </div>
                    <button 
                      style={styles.payrollButton}
                      onClick={() => openPayrollModal(s)}
                    >
                      <FiDollarSign size={14} />
                    </button>
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

      {/* Onboarding Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Employee Onboarding</h2>
              <button style={styles.closeBtn} onClick={() => setShowForm(false)}>
                <FiX size={18} />
              </button>
            </div>
            <form style={styles.form} onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Role"
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Mobile"
                required
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={styles.input}
              />
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
              <input
                type="number"
                placeholder="Wage Rate (₹)"
                required
                value={formData.wageRate}
                onChange={(e) =>
                  setFormData({ ...formData, wageRate: e.target.value })
                }
                style={styles.input}
              />
              <button type="submit" style={styles.submitBtn}>
                Save Employee
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payroll Modal */}
      {showPayrollModal && selectedEmployee && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Payroll Calculation</h2>
              <button style={styles.closeBtn} onClick={() => setShowPayrollModal(false)}>
                <FiX size={18} />
              </button>
            </div>
            <div style={styles.employeePayrollHeader}>
              <div style={styles.avatar}>{selectedEmployee.name.charAt(0)}</div>
              <div>
                <div style={styles.name}>{selectedEmployee.name}</div>
                <div style={styles.id}>ID: {selectedEmployee.id}</div>
              </div>
            </div>
            
            <div style={styles.payrollDetails}>
              <div style={styles.payrollRow}>
                <span style={styles.payrollLabel}>Wage Type:</span>
                <span style={styles.payrollValue}>{selectedEmployee.wageType}</span>
              </div>
              <div style={styles.payrollRow}>
                <span style={styles.payrollLabel}>Wage Rate:</span>
                <span style={styles.payrollValue}>
                  {selectedEmployee.wageType === "Hourly" 
                    ? `₹${selectedEmployee.wageRate}/hr` 
                    : `₹${selectedEmployee.wageRate}/month`
                  }
                </span>
              </div>
            </div>
            
            <form style={styles.form} onSubmit={handlePayrollSubmit}>
              {selectedEmployee.wageType === "Hourly" ? (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <FiClock style={{ marginRight: "8px" }} />
                    Attendance Hours (Confirmed)
                  </label>
                  <input
                    type="number"
                    required
                    value={payrollData.attendanceHours}
                    onChange={(e) => setPayrollData({
                      ...payrollData, 
                      attendanceHours: parseInt(e.target.value) || 0
                    })}
                    style={styles.input}
                    min="0"
                  />
                </div>
              ) : (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <FiCalendar style={{ marginRight: "8px" }} />
                    Deductions (Unpaid Leaves, etc.)
                  </label>
                  <input
                    type="number"
                    required
                    value={payrollData.deductions}
                    onChange={(e) => setPayrollData({
                      ...payrollData, 
                      deductions: parseInt(e.target.value) || 0
                    })}
                    style={styles.input}
                    min="0"
                    max={selectedEmployee.wageRate}
                  />
                </div>
              )}
              
              <div style={styles.salaryPreview}>
                <div style={styles.payrollRow}>
                  <span style={styles.payrollLabel}>Calculated Salary:</span>
                  <span style={styles.salaryAmountPreview}>
                    ₹{selectedEmployee.wageType === "Hourly" 
                      ? (selectedEmployee.wageRate * payrollData.attendanceHours).toLocaleString('en-IN')
                      : (selectedEmployee.wageRate - payrollData.deductions).toLocaleString('en-IN')
                    }
                  </span>
                </div>
              </div>
              
              <button type="submit" style={styles.submitBtn}>
                <FiDollarSign size={18} style={{ marginRight: "8px" }} />
                Update Payroll
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
    color: "#0f172a",
    fontSize: "28px",
    fontWeight: 700,
    margin: 0,
  },
  addButton: {
    background: "#2563eb",
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
    background: "#2563eb",
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
    color: "#0369a1",
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
  salaryContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  salaryAmount: {
    fontWeight: 600,
    color: "#059669",
    fontSize: "14px",
  },
  payrollButton: {
    background: "#e0f2fe",
    color: "#0369a1",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtons: { display: "flex", gap: "8px" },
  editButton: {
    background: "#e0f2fe",
    color: "#0369a1",
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
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#64748b",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
  },
  submitBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  employeePayrollHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "8px",
  },
  payrollDetails: {
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  payrollRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  payrollLabel: {
    fontWeight: 500,
    color: "#475569",
  },
  payrollValue: {
    fontWeight: 600,
    color: "#1e293b",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
    display: "flex",
    alignItems: "center",
  },
  salaryPreview: {
    padding: "16px",
    background: "#ecfdf5",
    borderRadius: "8px",
    border: "1px solid #d1fae5",
  },
  salaryAmountPreview: {
    fontWeight: 700,
    color: "#065f46",
    fontSize: "16px",
  },
};