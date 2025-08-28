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
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#2563eb";
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
    padding: 20,
    borderRadius: "var(--radius, 12px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    margin: 0,
    fontSize: "1.1rem",
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
    borderRadius: 10,
    border: "2px solid #2563eb", // ✅ blue border
    background: "#fff", // ✅ white background
    color: "#2563eb", // ✅ blue text
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
    minHeight: 100, // ✅ consistent size
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
};
