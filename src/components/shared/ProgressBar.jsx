import React from "react";

export default function ProgressBar({ value }) {
  const containerStyle = {
    width: "100%",
    height: "10px",
    backgroundColor: "#eee",
    borderRadius: "5px",
    overflow: "hidden",
    marginTop: "6px",
    marginBottom: "6px",
  };

  const barStyle = {
    height: "100%",
    width: `${value}%`,
    backgroundColor: value < 50 ? "#f39c12" : "#2ecc71", // orange if < 50%, green otherwise
    transition: "width 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}></div>
    </div>
  );
}
