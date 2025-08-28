import React, { useState, useEffect } from "react";
import { RiErrorWarningLine, RiAlertLine, RiInformationLine } from "react-icons/ri";

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        { id: 1, type: "Job Delay", message: "Job #102 delayed by 15m", severity: "high" },
        { id: 2, type: "Low Stock", message: "Oil stock below threshold", severity: "medium" },
        { id: 3, type: "Complaint", message: "Customer reported unsatisfactory wash", severity: "high" },
        { id: 4, type: "Re-image", message: "Vehicle #ABC123 requires re-imaging", severity: "medium" },
      ]);
    }, 400);
  }, []);

  const iconBySeverity = (sev) =>
    sev === "high" ? <RiErrorWarningLine /> : sev === "medium" ? <RiAlertLine /> : <RiInformationLine />;

  const leftBar = (sev) =>
    sev === "high"
      ? { borderLeft: "3px solid #ef4444" }
      : sev === "medium"
      ? { borderLeft: "3px solid #f59e0b" }
      : { borderLeft: "3px solid #3b82f6" };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Alerts & Notifications</h3>
        <span style={styles.count}>{alerts.length}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {alerts.length === 0 ? (
          <div style={styles.empty}>No active alerts</div>
        ) : (
          alerts.map((a) => (
            <div key={a.id} style={{ ...styles.item, ...leftBar(a.severity) }}>
              <div style={styles.icon}>{iconBySeverity(a.severity)}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.itemTitle}>{a.type}</div>
                <div style={styles.itemText}>{a.message}</div>
              </div>
              <div style={styles.time}>Just now</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  card: { background: "#fff", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 800, margin: 0 },
  count: {
    background: "linear-gradient(135deg,var(--brand),var(--brand-2))",
    color: "#fff",
    fontSize: 12,
    fontWeight: 800,
    padding: "4px 10px",
    borderRadius: 999,
  },
  empty: { textAlign: "center", padding: 30, color: "var(--muted)", fontStyle: "italic" },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    background: "#f8fafc",
    border: "1px solid #edf2f7",
  },
  icon: { fontSize: 18, color: "#0f172a", marginTop: 2 },
  itemTitle: { fontWeight: 700, fontSize: 14, marginBottom: 4 },
  itemText: { fontSize: 13, color: "var(--muted)" },
  time: { fontSize: 12, color: "var(--muted)" },
};
