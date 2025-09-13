// Layout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#ffffff",
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
    position: "relative",
    overflowX: "hidden",
  };

  const mainContainerStyle = {
    display: "flex",
    flex: 1,
    width: "100%",
    position: "relative",
    minHeight: 0,
    marginTop: "72px", // Push content below navbar
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
    display: sidebarOpen ? "block" : "none",
  };

  return (
    <div style={layoutStyle}>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div style={overlayStyle} onClick={() => setSidebarOpen(false)} />

      <div style={mainContainerStyle}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          style={{
            flex: 1,
            margin: 0,
            padding: "1.5rem",
            width: "100%",
            maxWidth: "100%",
            backgroundColor: "#ffffff",
            transition: "all 0.3s ease",
            minHeight: 0,
            overflow: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
