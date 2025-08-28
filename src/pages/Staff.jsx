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
  FiRefreshCw
} from "react-icons/fi";

export default function Staff() {
  const initialStaff = [
    { id: "EMP001", name: "Amit Kumar", role: "Admin", mobile: "9876543210", email: "amit@example.com", status: "Present", jobs: ["JOB102"], avgJobTime: "2.5 hrs", qualityScore: "98%", reimageJobs: 12 },
    { id: "EMP002", name: "Ravi Teja", role: "Worker", mobile: "9988776655", email: "ravi@example.com", status: "Available", jobs: ["JOB105", "JOB108"], avgJobTime: "3.2 hrs", qualityScore: "92%", reimageJobs: 8 },
    { id: "EMP003", name: "Priya Sharma", role: "Supervisor", mobile: "8899776655", email: "priya@example.com", status: "Busy", jobs: ["JOB107"], avgJobTime: "2.8 hrs", qualityScore: "95%", reimageJobs: 5 },
    { id: "EMP004", name: "John Carter", role: "Worker", mobile: "7788996655", email: "john@example.com", status: "On Leave", jobs: [], avgJobTime: "3.5 hrs", qualityScore: "90%", reimageJobs: 10 },
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

  const filteredStaff = staff.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Staff Management</h1>
        <button style={styles.addButton}>
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
                    <div style={styles.avatar}>
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <div style={styles.name}>{s.name}</div>
                      <div style={styles.id}>ID: {s.id}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.role}>{s.role}</div>
                </td>
                <td style={styles.td}>
                  <div style={styles.contact}>
                    <div>{s.mobile}</div>
                    <div style={styles.email}>{s.email}</div>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.statusContainer}>
                    <FiCircle color={getStatusColor(s.status)} size={14} />
                    <span style={{...styles.status, color: getStatusColor(s.status)}}>
                      {s.status}
                    </span>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.jobsContainer}>
                    {s.jobs.length > 0 ? (
                      s.jobs.map(jobId => {
                        const job = availableJobs.find(j => j.id === jobId);
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
    </div>
  );
}

const styles = {
  container: { 
    fontFamily: "'Inter', 'Segoe UI', sans-serif", 
    padding: "24px", 
    background: "#fff", 
    minHeight: "100vh",
    boxSizing: "border-box"
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    flexWrap: "wrap", 
    marginBottom: "24px" 
  },
  title: { 
    color: "#007BFF", 
    fontSize: "28px", 
    fontWeight: 700, 
    margin: 0 
  },
  addButton: { 
    background: "#007BFF", 
    color: "#fff", 
    border: "none", 
    padding: "12px 20px", 
    borderRadius: "8px", 
    fontWeight: 600, 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center", 
    boxShadow: "0 2px 4px rgba(0, 123, 255, 0.3)",
    transition: "all 0.2s ease",
    fontSize: "14px"
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px"
  },
  searchContainer: {
    position: "relative",
    flex: "1",
    minWidth: "250px",
    maxWidth: "400px"
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b"
  },
  searchInput: {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    boxSizing: "border-box"
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
    fontSize: "14px"
  },
  tableContainer: { 
    overflowX: "auto", 
    background: "white", 
    borderRadius: "12px", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #f1f5f9"
  },
  table: { 
    width: "100%", 
    borderCollapse: "collapse", 
    minWidth: "800px"
  },
  tableHeader: { 
    background: "#f8fafc" 
  },
  th: { 
    color: "#64748b", 
    textAlign: "left", 
    padding: "16px", 
    fontSize: "14px", 
    fontWeight: 600,
    borderBottom: "2px solid #e2e8f0"
  },
  tr: { 
    borderBottom: "1px solid #f1f5f9",
    transition: "background 0.2s ease",
  },
  td: { 
    padding: "16px", 
    fontSize: "14px", 
    color: "#334155",
    verticalAlign: "top"
  },
  employeeInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#007BFF",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "16px"
  },
  name: {
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "4px"
  },
  id: {
    fontSize: "12px",
    color: "#64748b"
  },
  role: {
    background: "#f1f5f9",
    padding: "6px 12px",
    borderRadius: "20px",
    display: "inline-block",
    fontWeight: 500
  },
  contact: {
    lineHeight: "1.4"
  },
  email: {
    color: "#64748b",
    fontSize: "13px"
  },
  statusContainer: { 
    display: "flex", 
    alignItems: "center", 
    gap: "6px" 
  },
  status: {
    fontWeight: 500
  },
  jobsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  jobTag: { 
    background: "#e0f2fe", 
    color: "#0369a1",
    padding: "6px 10px", 
    borderRadius: "6px", 
    fontSize: "12px", 
    fontWeight: 500,
    display: "inline-block",
    width: "fit-content"
  },
  noJobs: {
    color: "#94a3b8",
    fontStyle: "italic",
    fontSize: "13px"
  },
  performance: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "8px" 
  },
  metric: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "#475569"
  },
  actionButtons: { 
    display: "flex", 
    gap: "8px" 
  },
  editButton: { 
    background: "#e0f2fe", 
    color: "#0369a1", 
    border: "none", 
    padding: "8px", 
    borderRadius: "6px", 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center" 
  },
  deleteButton: { 
    background: "#fee2e2", 
    color: "#dc2626", 
    border: "none", 
    padding: "8px", 
    borderRadius: "6px", 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center" 
  },
  moreButton: { 
    background: "#f1f5f9", 
    color: "#64748b", 
    border: "none", 
    padding: "8px", 
    borderRadius: "6px", 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center" 
  }
};