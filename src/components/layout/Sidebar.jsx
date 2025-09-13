import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid, FiUsers, FiTool, FiCalendar, FiBox,
  FiCheckSquare, FiUserCheck, FiTrendingUp,
  FiCreditCard, FiBarChart2, FiStar, FiFileText,
  FiSettings, FiX, FiBell, FiMessageSquare,
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
    { name: "Notifications", path: "/notifications", icon: <FiBell /> },
    { name: "Messages", path: "/messages", icon: <FiMessageSquare /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  const sidebarStyle = {
    width: "260px",
    height: "100vh",
    background: "#ffffff",
    padding: "1.5rem 0",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1001,
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    boxShadow: isOpen ? "4px 0 20px rgba(0,0,0,0.15)" : "none",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
    zIndex: 1000,
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    color: "#0ea5e9",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const linkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "0.875rem 1rem",
    color: isActive ? "#0ea5e9" : "#334155",
    textDecoration: "none",
    borderRadius: "0.5rem",
    backgroundColor: isActive ? "rgba(14,165,233,0.1)" : "transparent",
    fontWeight: isActive ? "600" : "500",
  });

  const iconStyle = {
    marginRight: "0.75rem",
    fontSize: "1.125rem",
    minWidth: "24px",
  };

  return (
    <>
      {/* Dark background */}
      <div style={overlayStyle} onClick={onClose}></div>

      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          <FiX />
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#0ea5e9" }}>Admin Panel</h2>

        <nav style={{ flex: 1, overflowY: "auto" }}>
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={linkStyle(location.pathname === item.path)}
              onClick={onClose}   
            >
              <span style={iconStyle}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "1rem", textAlign: "center", fontSize: "0.8rem", color: "#64748b" }}>
          © 2025 Admin Dashboard
        </div>
      </aside>
    </>
  );
}
