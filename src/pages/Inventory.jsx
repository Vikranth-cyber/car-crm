import React, { useState, useEffect } from "react";

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [items, setItems] = useState([
    { id: 1, sku: "SKU001", name: "Engine Oil", stock: 50, reorder: 20, location: "Hyderabad", usage: 15, vendor: "OilCo" },
    { id: 2, sku: "SKU002", name: "Car Shampoo", stock: 10, reorder: 15, location: "Hyderabad", usage: 8, vendor: "CleanAuto" },
    { id: 3, sku: "SKU003", name: "Air Filter", stock: 5, reorder: 10, location: "Bangalore", usage: 12, vendor: "FilterPro" },
    { id: 4, sku: "SKU004", name: "Brake Pads", stock: 25, reorder: 15, location: "Chennai", usage: 9, vendor: "BrakeMasters" },
  ]);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [searchTerm, setSearchTerm] = useState("");

  // Derived
  const filteredItems = items.filter(item => 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const lowStock = items.filter(i => i.stock <= i.reorder);

  // Responsiveness: update width
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width <= 760;

  // ---------- Inline styles ----------
  const pageStyle = {
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    minHeight: "100vh",
    padding: isMobile ? "18px 12px" : "36px 48px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
  };

  const wrapperStyle = {
    width: "100%",
    maxWidth: 1200,
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    flexWrap: "wrap"
  };

  const titleStyle = {
    margin: 0,
    fontSize: isMobile ? 24 : 30,
    fontWeight: 800,
    letterSpacing: "-0.2px",
    color: "#0b63ff" // 🔵 Blue Title
  };

  const controlsStyle = {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap"
  };

  const searchInputStyle = {
    padding: isMobile ? "10px 12px" : "12px 14px",
    borderRadius: 10,
    border: "1px solid #e6eef8",
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(11,37,69,0.04)",
    fontSize: isMobile ? 14 : 15,
    outline: "none",
    minWidth: isMobile ? "140px" : "240px"
  };

  const tabsRow = {
    display: "flex",
    gap: 10,
    marginBottom: 18,
    flexWrap: "wrap"
  };

  const tabBtn = (active) => ({
    padding: "12px 18px",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 15,
    border: active ? "none" : "1px solid #e6eef8",
    background: active ? "linear-gradient(90deg,#0b63ff,#0066d6)" : "#ffffff",
    color: active ? "#ffffff" : "#0b2545",
    boxShadow: active ? "0 8px 20px rgba(11,99,255,0.16)" : "0 4px 12px rgba(11,37,69,0.03)",
    cursor: "pointer",
  });

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 14,
    padding: isMobile ? 16 : 22,
    boxShadow: "0 10px 30px rgba(11,37,69,0.06)",
    marginBottom: 18,
    border: "1px solid #f0f6fb"
  };

  const alertStyle = {
    padding: "14px 16px",
    borderRadius: 10,
    background: "#fff4e6",
    border: "1px solid #ffe7c7",
    color: "#8a5a0a",
    marginBottom: 16,
    fontSize: 15
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 16
  };

  const thStyle = {
    textAlign: "left",
    padding: isMobile ? "12px 10px" : "14px 16px",
    fontWeight: 700,
    fontSize: 15,
    color: "#334155",
    borderBottom: "1px solid #eef3fb"
  };

  const tdStyle = {
    padding: isMobile ? "12px 10px" : "14px 16px",
    borderBottom: "1px solid #f3f7fb",
    color: "#0f172a",
    fontSize: 15
  };

  // ---------- Render helpers ----------
  const renderInventoryTable = () => (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>SKU</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Reorder</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(i => (
            <tr key={i.id}>
              <td style={tdStyle}>{i.sku}</td>
              <td style={tdStyle}>{i.name}</td>
              <td style={{
                ...tdStyle,
                color: i.stock <= i.reorder ? "#c92a2a" : "#0f172a",
                fontWeight: i.stock <= i.reorder ? 800 : 600
              }}>{i.stock}</td>
              <td style={tdStyle}>{i.reorder}</td>
              <td style={tdStyle}>{i.location}</td>
              <td style={tdStyle}>{i.vendor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderUsageTable = () => (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>SKU</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Usage (Last Month)</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(i => (
            <tr key={i.id}>
              <td style={tdStyle}>{i.sku}</td>
              <td style={tdStyle}>{i.name}</td>
              <td style={tdStyle}>{i.location}</td>
              <td style={tdStyle}>{i.stock}</td>
              <td style={tdStyle}>{i.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={pageStyle}>
      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Inventory · Usage</h1>

          <div style={controlsStyle}>
            <input
              type="text"
              placeholder="Search SKU, name, vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />
          </div>
        </div>

        <div style={tabsRow}>
          <button onClick={() => setActiveTab("inventory")} style={tabBtn(activeTab === "inventory")}>Inventory</button>
          <button onClick={() => setActiveTab("usage")} style={tabBtn(activeTab === "usage")}>Usage Tracking</button>
        </div>

        {lowStock.length > 0 && (
          <div style={alertStyle}>
            Low stock: {lowStock.map(i => i.name).join(", ")}. Consider raising a request.
          </div>
        )}

        {activeTab === "inventory" && (
          <div style={cardStyle}>
            <h2 style={{ margin: "0 0 14px 0", fontSize: 18, color: "#0b63ff" }}>Inventory</h2>
            {renderInventoryTable()}
          </div>
        )}

        {activeTab === "usage" && (
          <div style={cardStyle}>
            <h2 style={{ margin: "0 0 14px 0", fontSize: 18, color: "#0b63ff" }}>Usage Tracking</h2>
            {renderUsageTable()}
          </div>
        )}
      </div>
    </div>
  );
}
