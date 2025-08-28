import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiArrowDownRight, FiMinus } from "react-icons/fi";
import { FiStar } from "react-icons/fi";

export default function KpiStrip() {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setKpis([
        { label: "Sales Today", value: "₹12,500", trend: "up", change: "5.2%" },
        { label: "EoD Billing", value: "₹42,000", trend: "up", change: "12.1%" },
        { label: "Active Jobs", value: 8, trend: "down", change: "2" },
        { label: "Avg Job Time", value: "1h 20m", trend: "neutral", change: "0m" },
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
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        marginBottom: 24,
      }}
    >
      {kpis.map((k, i) => (
        <div key={i} style={styles.card}>
          <div style={{ flex: 1 }}>
            <div style={styles.kLabel}>{k.label}</div>
            <div style={styles.kValue}>
              {k.value}
              {k.label === "Store Rating" && <FiStar style={{ marginLeft: 6 }} />}
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
    borderRadius: "var(--radius)",
    padding: 20,
    boxShadow: "var(--shadow)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  kLabel: { fontSize: 13, color: "var(--muted)", marginBottom: 8, fontWeight: 600 },
  kValue: { fontSize: 26, fontWeight: 900 },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 800,
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
  },
};
