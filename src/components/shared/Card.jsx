import React from "react";

export default function Card({ title, value }) {
  const cardStyle = {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  };

  const valueStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#222",
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}
