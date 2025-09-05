import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlusSquare, FiCalendar, FiBarChart2 } from "react-icons/fi";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: "Create Job", path: "/forms?type=job", icon: <FiPlusSquare /> },
    { label: "Create Booking", path: "/forms?type=booking", icon: <FiCalendar /> },
    { label: "View Reports", path: "/reports", icon: <FiBarChart2 /> },
  ];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Quick Actions</h3>
      </div>

      <div style={styles.grid}>
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={() => navigate(a.path)}
            style={styles.btn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00aaff";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#00aaff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#00aaff";
              e.currentTarget.style.borderColor = "#00aaff";
            }}
          >
            <span style={styles.icon}>{a.icon}</span>
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 24,
    borderRadius: "14px",
    border: "1px solid #e0e0e0",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1e293b",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
  },
  btn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    borderRadius: 12,
    border: "2px solid #00aaff",
    background: "#fff",
    color: "#00aaff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
    minHeight: 100,
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
};
