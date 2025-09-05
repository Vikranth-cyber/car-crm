// Layout.jsx - clean, Navbar handles bell itself
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import FloatingChat from "../shared/FloatingChat";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#fff",
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
    position: "relative",
    overflowX: "hidden",
  };

  const mainContainerStyle = {
    display: "flex",
    flex: 1,
    width: "100%",
    position: "relative",
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
      <div style={overlayStyle} onClick={() => setSidebarOpen(false)} />

      {/* Navbar has bell icon inside */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div style={mainContainerStyle}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
            width: "100%",
            maxWidth: "100%",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
          }}
        >
          {children}
        </main>
      </div>

      <FloatingChat />
    </div>
  );
}
