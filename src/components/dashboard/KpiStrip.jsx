import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiArrowDownRight, FiMinus, FiStar } from "react-icons/fi";

export default function KpiStrip() {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setKpis([
        { label: "Sales Today", value: "₹12,500", trend: "up", change: "5.2%" },
        { label: "Active Jobs", value: 8, trend: "down", change: "2" },
        { label: "Waitlist Count", value: 5, trend: "up", change: "3" },
        { label: "Store Rating", value: "4.5", trend: "up", change: "0.2" },
      ]);
    }, 350);
  }, []);

  const chipStyle = (trend) =>
    trend === "up"
      ? { color: "#16a34a", background: "rgba(22,163,74,.12)" }
      : trend === "down"
      ? { color: "#ef4444", background: "rgba(239,68,68,.12)" }
      : { color: "#64748b", background: "rgba(100,116,139,.14)" };

  const icon = (t) => (t === "up" ? <FiArrowUpRight /> : t === "down" ? <FiArrowDownRight /> : <FiMinus />);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20,
        marginBottom: 24,
      }}
    >
      {kpis.map((k, i) => (
        <div key={i} style={styles.card}>
          <div style={{ flex: 1 }}>
            <div style={styles.kLabel}>{k.label}</div>
            <div style={styles.kValue}>
              {k.value}
              {k.label === "Store Rating" && <FiStar style={{ marginLeft: 6, color: "#fbbf24" }} />}
            </div>
          </div>

          <div style={{ ...styles.chip, ...chipStyle(k.trend) }}>
            {icon(k.trend)} <span>{k.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: 24,
    boxShadow: "var(--shadow)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    border: "1px solid #f1f5f9",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  kLabel: { 
    fontSize: 14, 
    color: "#64748b", 
    marginBottom: 8, 
    fontWeight: 600,
    letterSpacing: "0.01em",
  },
  kValue: { 
    fontSize: 28, 
    fontWeight: 800,
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 800,
    fontSize: 13,
    padding: "6px 12px",
    borderRadius: 999,
  },
};