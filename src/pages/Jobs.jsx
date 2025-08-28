import React, { useState } from "react";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");

  const [jobs] = useState([
    {
      id: "JOB001",
      customer: "Rahul Sharma",
      vehicle: "MH12AB1234 - Honda City",
      service: "Full Car Cleaning",
      status: "In Progress",
      bay: "Bay 2",
      eta: "30 mins",
    },
    {
      id: "JOB002",
      customer: "Priya Verma",
      vehicle: "TS09XY5678 - Hyundai i20",
      service: "Oil Change",
      status: "Waiting",
      bay: "-",
      eta: "Pending",
    },
    {
      id: "JOB003",
      customer: "Amit Patel",
      vehicle: "GJ05RT9876 - Toyota Innova",
      service: "Brake Service",
      status: "Inspection",
      bay: "Bay 3",
      eta: "45 mins",
    },
  ]);

  const filteredJobs = jobs.filter(
    (j) =>
      j.id.toLowerCase().includes(search.toLowerCase()) ||
      j.customer.toLowerCase().includes(search.toLowerCase()) ||
      j.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "#ff9800";
      case "In Progress":
        return "#4caf50";
      case "Inspection":
        return "#9c27b0";
      case "Ready":
        return "#607d8b";
      case "Delayed":
        return "#f44336";
      default:
        return "#1976d2";
    }
  };

  // 🔹 Responsive status label for mobile
  const getResponsiveStatus = (status) => {
    if (window.innerWidth <= 480 && status === "In Progress") {
      return "Progress"; // shorter label for small screens
    }
    return status;
  };

  const kanbanColumns = {
    Waiting: jobs.filter((job) => job.status === "Waiting"),
    "In Progress": jobs.filter((job) => job.status === "In Progress"),
    Inspection: jobs.filter((job) => job.status === "Inspection"),
    Ready: jobs.filter((job) => job.status === "Ready"),
    Delayed: jobs.filter((job) => job.status === "Delayed"),
  };

  // Styles
  const containerStyle = {
    padding: "16px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
  };

  const headerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "12px",
  };

  const searchInputStyle = {
    padding: "10px 14px",
    width: "100%",
    maxWidth: "360px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  };

  const viewToggleStyle = {
    display: "flex",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const toggleButtonStyle = (isActive) => ({
    padding: "8px 14px",
    backgroundColor: isActive ? "#1976d2" : "transparent",
    color: isActive ? "white" : "#333",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  });

  const tableWrapperStyle = {
    overflowX: "auto",
    width: "100%",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const thtdStyle = {
    border: "1px solid #e0e0e0",
    padding: "10px",
    textAlign: "left",
    fontSize: "14px",
  };

  const tableHeaderStyle = {
    backgroundColor: "#1976d2",
    color: "white",
  };

  const statusBadgeStyle = (status) => ({
    display: "inline-block",
    minWidth: "70px",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
    backgroundColor: getStatusColor(status),
  });

  const kanbanContainerStyle = {
    display: "flex",
    overflowX: "auto",
    gap: "12px",
    padding: "10px 0",
  };

  const kanbanColumnStyle = {
    minWidth: "250px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "12px",
  };

  const kanbanCardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "12px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ color: "#1976d2", margin: 0 }}>Jobs Management</h2>
        <input
          type="text"
          placeholder="Search by Job ID, customer, or vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />
        <div style={viewToggleStyle}>
          <button
            style={toggleButtonStyle(viewMode === "table")}
            onClick={() => setViewMode("table")}
          >
            Table
          </button>
          <button
            style={toggleButtonStyle(viewMode === "kanban")}
            onClick={() => setViewMode("kanban")}
          >
            Kanban
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={thtdStyle}>Job ID</th>
                <th style={thtdStyle}>Customer</th>
                <th style={thtdStyle}>Vehicle</th>
                <th style={thtdStyle}>Service</th>
                <th style={thtdStyle}>Status</th>
                <th style={thtdStyle}>Bay</th>
                <th style={thtdStyle}>ETA</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((j) => (
                <tr key={j.id}>
                  <td style={thtdStyle}>{j.id}</td>
                  <td style={thtdStyle}>{j.customer}</td>
                  <td style={thtdStyle}>{j.vehicle}</td>
                  <td style={thtdStyle}>{j.service}</td>
                  <td style={thtdStyle}>
                    <span style={statusBadgeStyle(j.status)}>
                      {getResponsiveStatus(j.status)}
                    </span>
                  </td>
                  <td style={thtdStyle}>{j.bay}</td>
                  <td style={thtdStyle}>{j.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={kanbanContainerStyle}>
          {Object.entries(kanbanColumns).map(([status, jobs]) => (
            <div key={status} style={kanbanColumnStyle}>
              <h3
                style={{
                  marginBottom: "10px",
                  color: getStatusColor(status),
                  fontSize: "15px",
                }}
              >
                {status} ({jobs.length})
              </h3>
              {jobs.map((job) => (
                <div key={job.id} style={kanbanCardStyle}>
                  <div style={{ fontWeight: "bold" }}>{job.id}</div>
                  <div>{job.customer}</div>
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    {job.vehicle}
                  </div>
                  <div style={{ marginTop: "6px" }}>{job.service}</div>
                  <div
                    style={{
                      marginTop: "6px",
                      ...statusBadgeStyle(job.status),
                      display: "inline-block",
                    }}
                  >
                    {getResponsiveStatus(job.status)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
