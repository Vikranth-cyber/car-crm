
import React, { useState } from "react";
import { FiSettings, FiBell, FiImage } from "react-icons/fi";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("notifications");

  const container = {
    padding: "clamp(16px, 4vw, 32px)",
    minHeight: "100vh",
    background: "#ffffff",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const card = {
    background: "#fff",
    padding: "clamp(20px, 4vw, 32px)",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    marginBottom: "24px",
    border: "1px solid #e5e7eb",
  };

  const heading = {
    fontSize: "clamp(24px, 5vw, 32px)",
    fontWeight: "800",
    color: "#0ea5e9", 
    marginBottom: "24px",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const tabBar = {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "28px",
  };

  const tabBtn = (isActive) => ({
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    background: isActive ? "#0ea5e9" : "#f3f4f6",
    color: isActive ? "#fff" : "#334155",
    transition: "all 0.2s ease",
    boxShadow: isActive ? "0 4px 12px rgba(14, 165, 233, 0.3)" : "0 2px 6px rgba(0, 0, 0, 0.05)",
  });

  const input = {
    padding: "14px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    width: "100%",
    marginBottom: "16px",
    fontSize: "16px",
    background: "#fafafa",
    boxSizing: "border-box",
  };

  const btn = {
    background: "#0ea5e9",
    color: "white",
    padding: "14px 24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <div style={card}>
            <h3 style={{ ...heading, fontSize: "20px" }}><FiBell /> Notification Templates</h3>
            <textarea placeholder="Type Your Notification Here..." style={{ ...input, height: "120px", resize: "vertical" }} />
            <button style={btn}>Send Notifiication</button>
          </div>
        );

      case "media":
        return (
          <div style={card}>
            <h3 style={{ ...heading, fontSize: "20px" }}><FiImage /> Media Retention Rules</h3>
            <select style={input}>
              <option>30 Days</option>
              <option>90 Days</option>
              <option>1 Year</option>
            </select>
            <button style={btn}>Save Rules</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={container}>
      <h1 style={heading}><FiSettings /> System Settings</h1>

      <div style={tabBar}>
        <button style={tabBtn(activeTab === "notifications")} onClick={() => setActiveTab("notifications")}>Notifications</button>
        <button style={tabBtn(activeTab === "media")} onClick={() => setActiveTab("media")}>Media</button>
      </div>

      {renderContent()}
    </div>
  );
}
