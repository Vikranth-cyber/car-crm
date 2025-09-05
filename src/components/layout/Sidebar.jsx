import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiTool,
  FiCalendar,
  FiBox,
  FiCheckSquare,
  FiUserCheck,
  FiTrendingUp,
  FiCreditCard,
  FiBarChart2,
  FiStar,
  FiFileText,
  FiSettings,
  FiX,
  FiBell,
} from "react-icons/fi";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const items = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FiGrid /> },
    { name: "Customers", path: "/customers", icon: <FiUsers /> },
    { name: "Jobs", path: "/jobs", icon: <FiTool /> },
    { name: "Schedule", path: "/schedule", icon: <FiCalendar /> },
    { name: "Inventory", path: "/inventory", icon: <FiBox /> },
    { name: "Attendance", path: "/attendance", icon: <FiCheckSquare /> },
    { name: "Staff", path: "/staff", icon: <FiUserCheck /> },
    { name: "Performance", path: "/performance", icon: <FiTrendingUp /> },
    { name: "Billing", path: "/billing", icon: <FiCreditCard /> },
    { name: "Reports", path: "/reports", icon: <FiBarChart2 /> },
    { name: "Store Rating", path: "/store-rating", icon: <FiStar /> },
    { name: "Forms", path: "/forms", icon: <FiFileText /> },
    { name: "Notifications", path: "/notifications", icon: <FiBell /> }, // ✅ Added
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  const sidebarStyle = {
    width: "240px",
    height: "100vh",
    background: "#ffffff",
    color: "#1e293b",
    padding: "1.5rem 0",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease",
    boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "block",
  };

  const headerStyle = {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    fontWeight: "700",
    textAlign: "center",
    color: "#0f172a",
    padding: "0 1rem",
  };

  const navStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0 0.75rem",
    overflowY: "auto",
  };

  const linkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "0.875rem 1rem",
    color: isActive ? "#0ea5e9" : "#334155",
    textDecoration: "none",
    borderRadius: "0.5rem",
    transition: "all 0.2s ease",
    backgroundColor: isActive ? "rgba(14, 165, 233, 0.1)" : "transparent",
    fontWeight: isActive ? "600" : "500",
  });

  const iconStyle = {
    marginRight: "0.75rem",
    fontSize: "1.125rem",
    display: "grid",
    placeItems: "center",
  };

  return (
    <aside style={sidebarStyle}>
      <button style={closeButtonStyle} onClick={onClose} aria-label="Close sidebar">
        <FiX />
      </button>

      <h2 style={headerStyle}>Admin Panel</h2>

      <nav style={navStyle}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              style={linkStyle(isActive)}
              onClick={onClose}
            >
              <span style={iconStyle}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          padding: "1rem",
          borderTop: "1px solid #e2e8f0",
          color: "#64748b",
          fontSize: "0.75rem",
          textAlign: "center",
        }}
      >
        v2.1.0 • Car CRM System
      </div>
    </aside>
  );
}
