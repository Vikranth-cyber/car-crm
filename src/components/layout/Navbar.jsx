import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const navbarStyle = {
    height: "72px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1.5rem",
    boxSizing: "border-box",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    width: "100%",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0ea5e9",
    margin: 0,
  };

  const menuButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "transparent",
    cursor: "pointer",
    marginRight: "1rem",
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
  };

  const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    position: "relative",
  };

  const avatarStyle = {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#0ea5e9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  };

  const avatarContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const bellIconStyle = {
    position: "relative",
    color: "#0ea5e9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  };

  const notificationBadgeStyle = {
    position: "absolute",
    top: "-6px",
    right: "-8px",
    background: "#ef4444",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 6px",
    borderRadius: "999px",
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: "0",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    minWidth: "200px",
    zIndex: 1001,
    display: dropdownOpen ? "block" : "none",
  };

  const dropdownItemStyle = {
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    color: "#0ea5e9",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
    border: "none",
    background: "none",
    width: "100%",
    textAlign: "left",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  const dropdownDividerStyle = {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "0.25rem 0",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear session or token here if needed
    navigate("/login");
  };

  return (
    <header style={navbarStyle}>
      <div style={leftSectionStyle}>
        <button
          style={menuButtonStyle}
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12H21"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 style={titleStyle}>Admin Dashboard</h1>
      </div>

      <div style={rightSectionStyle} ref={dropdownRef}>
        <Link to="/notifications" style={bellIconStyle}>
          <FiBell size={22} />
          <span style={notificationBadgeStyle}>8</span>
        </Link>

        <div
          style={avatarContainerStyle}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div style={avatarStyle}>AD</div>
          <FiChevronDown size={16} color="#0ea5e9" />
        </div>

        {/* Dropdown */}
        <div style={dropdownMenuStyle}>
          <Link to="/profile" style={dropdownItemStyle} onClick={() => setDropdownOpen(false)}>
            Profile
          </Link>
          <Link
            to="/change-password"
            style={dropdownItemStyle}
            onClick={() => setDropdownOpen(false)}
          >
            Change Password
          </Link>
          <div style={dropdownDividerStyle}></div>
          <button
            style={{ ...dropdownItemStyle, color: "#ef4444" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
