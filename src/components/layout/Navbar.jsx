import React from "react";

export default function Navbar({ onMenuClick }) {
  const navbarStyle = {
    height: "72px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1.5rem",
    boxSizing: "border-box",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    position: "sticky",
    top: 0,
    zIndex: 997,
    width: "100%"
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e293b",
    background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0
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
    "@media (min-width: 1024px)": {
      display: "none"
    }
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center"
  };

  const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  };

  const adminStyle = {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "500"
  };

  const avatarStyle = {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#fff",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  };

  return (
    <header style={navbarStyle}>
      <div style={leftSectionStyle}>
        <button 
          style={menuButtonStyle} 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18H21" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 style={titleStyle}>Admin Dashboard</h1>
      </div>
      
      <div style={rightSectionStyle}>
        <span style={adminStyle}>Administrator</span>
        <div style={avatarStyle}>
          AD
        </div>
      </div>
    </header>
  );
}