import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlusSquare, FiCalendar, FiBarChart2, FiArrowRight } from "react-icons/fi";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: "Create Job", path: "/forms?type=job", icon: <FiPlusSquare />, desc: "Add a new job to the queue" },
    { label: "Create Booking", path: "/forms?type=booking", icon: <FiCalendar />, desc: "Schedule a new appointment" },
    { label: "View Reports", path: "/reports", icon: <FiBarChart2 />, desc: "Analyze performance metrics" },
  ];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Quick Actions</h3>
        <span style={styles.subtitle}>Frequently used actions</span>
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
              e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 170, 255, 0.4)";
              e.currentTarget.querySelector('.action-icon').style.transform = "scale(1.1)";
              e.currentTarget.querySelector('.action-arrow').style.opacity = "1";
              e.currentTarget.querySelector('.action-arrow').style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#00aaff";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              e.currentTarget.querySelector('.action-icon').style.transform = "scale(1)";
              e.currentTarget.querySelector('.action-arrow').style.opacity = "0";
              e.currentTarget.querySelector('.action-arrow').style.transform = "translateX(0)";
            }}
          >
            <span style={styles.icon} className="action-icon">{a.icon}</span>
            <div style={styles.btnContent}>
              <span style={styles.btnLabel}>{a.label}</span>
              <span style={styles.btnDesc}>{a.desc}</span>
            </div>
            <FiArrowRight style={styles.arrow} className="action-arrow" />
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
    borderRadius: "var(--radius)",
    border: "1px solid #f1f5f9",
    boxShadow: "var(--shadow)",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#00aaff",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#64748b",
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderRadius: 14,
    border: "2px solid #00aaff",
    background: "#fff",
    color: "#00aaff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.3s ease",
    minHeight: 100,
    textAlign: "left",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  icon: {
    fontSize: 28,
    marginRight: 16,
    transition: "transform 0.3s ease",
    flexShrink: 0,
  },
  btnContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  btnLabel: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 4,
  },
  btnDesc: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 1.3,
  },
  arrow: {
    opacity: 0,
    transition: "all 0.3s ease",
    marginLeft: 8,
  },
};