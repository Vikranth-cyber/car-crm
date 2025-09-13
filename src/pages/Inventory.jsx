import React, { useState, useEffect } from "react";
import { FiPlus, FiCheck } from "react-icons/fi";

export default function Inventory() {
  const [items, setItems] = useState([
    {
      id: 1,
      sku: "SKU001",
      name: "Engine Oil",
      stock: 50,
      reorder: 20,
      location: "Hyderabad",
      vendor: "OilCo",
      ordered: 0,
    },
    {
      id: 2,
      sku: "SKU002",
      name: "Car Shampoo",
      stock: 10,
      reorder: 15,
      location: "Hyderabad",
      vendor: "CleanAuto",
      ordered: 5,
    },
    {
      id: 3,
      sku: "SKU003",
      name: "Air Filter",
      stock: 5,
      reorder: 10,
      location: "Bangalore",
      vendor: "FilterPro",
      ordered: 0,
    },
    {
      id: 4,
      sku: "SKU004",
      name: "Brake Pads",
      stock: 25,
      reorder: 15,
      location: "Chennai",
      vendor: "BrakeMasters",
      ordered: 10,
    },
  ]);

  const [newItem, setNewItem] = useState({
    sku: "",
    name: "",
    stock: 0,
    reorder: 0,
    ordered: 0,
    location: "",
    vendor: "",
  });

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Derived
  const filteredItems = items.filter(
    (item) =>
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStock = items.filter((i) => i.stock <= i.reorder);

  // Responsiveness
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width <= 760;

  // ---------- Functions ----------
  const handleAddItem = () => {
    if (!newItem.sku || !newItem.name) return;
    setItems([...items, { id: Date.now(), ...newItem }]);
    setNewItem({
      sku: "",
      name: "",
      stock: 0,
      reorder: 0,
      ordered: 0,
      location: "",
      vendor: "",
    });
  };

  const handleUpdateOrdered = (id, value) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, ordered: parseInt(value) || 0 } : i
      )
    );
  };

  const handleReceiveOrder = (id) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, stock: i.stock + i.ordered, ordered: 0 } : i
      )
    );
  };

  // ---------- Inline styles ----------
  const pageStyle = {
    fontFamily:
      "'Inter','Segoe UI',system-ui,-apple-system,Roboto,'Helvetica Neue',Arial",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    minHeight: "100vh",
    padding: isMobile ? "18px 12px" : "36px 48px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
  };

  const wrapperStyle = { width: "100%", maxWidth: 1280 };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    flexWrap: "wrap",
  };

  const titleStyle = {
    margin: 0,
    fontSize: isMobile ? 24 : 30,
    fontWeight: 800,
    letterSpacing: "-0.2px",
    color: "#00aaff",
  };

  const controlsStyle = {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  };

  const searchInputStyle = {
    padding: isMobile ? "10px 12px" : "12px 14px",
    borderRadius: 10,
    border: "1px solid #e6eef8",
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(11,37,69,0.04)",
    fontSize: isMobile ? 14 : 15,
    outline: "none",
    minWidth: isMobile ? "140px" : "240px",
  };

  const addBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "linear-gradient(90deg,#0b63ff,#0066d6)",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    padding: "12px 16px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(11,99,255,0.16)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 15,
  };

  const thStyle = {
    textAlign: "left",
    padding: isMobile ? "12px 10px" : "14px 16px",
    fontWeight: 700,
    fontSize: 15,
    color: "#334155",
    borderBottom: "1px solid #eef3fb",
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: isMobile ? "12px 10px" : "14px 16px",
    borderBottom: "1px solid #f3f7fb",
    color: "#0f172a",
    fontSize: 15,
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 14,
    padding: isMobile ? 16 : 22,
    boxShadow: "0 10px 30px rgba(11,37,69,0.06)",
    marginBottom: 18,
    border: "1px solid #f0f6fb",
  };

  return (
    <div style={pageStyle}>
      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Inventory Management</h1>
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

        {lowStock.length > 0 && (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              background: "#fff4e6",
              border: "1px solid #ffe7c7",
              color: "#8a5a0a",
              marginBottom: 16,
              fontSize: 15,
            }}
          >
            Low stock: {lowStock.map((i) => i.name).join(", ")}. Consider raising
            a request.
          </div>
        )}

        {/* Add Inventory */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, marginBottom: 14, color: "#00aaff" }}>
            Add Inventory
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill,minmax(200px,1fr))",
              gap: 12,
              marginBottom: 12,
            }}
          >
            {[
              { key: "sku", label: "SKU Code" },
              { key: "name", label: "Item Name" },
              { key: "stock", label: "Stock Qty" },
              { key: "reorder", label: "Reorder Level" },
              { key: "ordered", label: "Ordered Qty" },
              { key: "location", label: "Location" },
              { key: "vendor", label: "Vendor" },
            ].map((field) => (
              <input
                key={field.key}
                type={["stock", "reorder", "ordered"].includes(field.key) ? "number" : "text"}
                placeholder={field.label}
                value={newItem[field.key]}
                onChange={(e) =>
                  setNewItem({ ...newItem, [field.key]: e.target.value })
                }
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #e6eef8",
                  fontSize: 14,
                }}
              />
            ))}
          </div>
          <button style={addBtnStyle} onClick={handleAddItem}>
            <FiPlus /> Add Item
          </button>
        </div>

        {/* Inventory Table */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, marginBottom: 14, color: "#00aaff" }}>
            Inventory
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>SKU</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Stock</th>
                  <th style={thStyle}>Reorder</th>
                  <th style={thStyle}>Ordered</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Vendor</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((i) => (
                  <tr key={i.id}>
                    <td style={tdStyle}>{i.sku}</td>
                    <td style={tdStyle}>{i.name}</td>
                    <td
                      style={{
                        ...tdStyle,
                        color: i.stock <= i.reorder ? "#c92a2a" : "#0f172a",
                        fontWeight: i.stock <= i.reorder ? 700 : 600,
                      }}
                    >
                      {i.stock}
                    </td>
                    <td style={tdStyle}>{i.reorder}</td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={i.ordered}
                        onChange={(e) =>
                          handleUpdateOrdered(i.id, e.target.value)
                        }
                        style={{
                          width: "70px",
                          padding: "6px",
                          borderRadius: 8,
                          border: "1px solid #e6eef8",
                        }}
                      />
                    </td>
                    <td style={tdStyle}>{i.location}</td>
                    <td style={tdStyle}>{i.vendor}</td>
                    <td style={tdStyle}>
                      {i.ordered > 0 && (
                        <button
                          onClick={() => handleReceiveOrder(i.id)}
                          style={{
                            background: "#22c55e",
                            border: "none",
                            padding: "6px 10px",
                            borderRadius: 8,
                            color: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <FiCheck /> Received
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
