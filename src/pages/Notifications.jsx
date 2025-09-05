import React, { useEffect, useState } from "react";
import { RiErrorWarningLine, RiAlertLine, RiInformationLine } from "react-icons/ri";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        { id: 1, type: "System", message: "Backup completed successfully", severity: "low", time: "2m ago" },
        { id: 2, type: "Job", message: "Job #104 is delayed by 20m", severity: "high", time: "5m ago" },
        { id: 3, type: "Customer", message: "New feedback submitted", severity: "medium", time: "10m ago" },
      ]);
    }, 500);
  }, []);

  const iconBySeverity = (sev) =>
    sev === "high" ? <RiErrorWarningLine color="#ef4444" /> : sev === "medium" ? <RiAlertLine color="#f59e0b" /> : <RiInformationLine color="#3b82f6" />;

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Notifications</h1>
      <div style={styles.list}>
        {notifications.length === 0 ? (
          <div style={styles.empty}>No notifications yet</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} style={styles.card}>
              <div style={styles.icon}>{iconBySeverity(n.severity)}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.type}>{n.type}</div>
                <div style={styles.message}>{n.message}</div>
              </div>
              <div style={styles.time}>{n.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#fff", minHeight: "100vh", padding: "32px", display: "flex", flexDirection: "column", gap: 20 },
  heading: { margin: 0, fontSize: "1.6rem", fontWeight: 700, color: "#00aaff" },
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 20,
    borderRadius: 14,
    background: "#fff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "transform .15s ease",
  },
  icon: { fontSize: 22 },
  type: { fontWeight: 700, fontSize: 14, marginBottom: 4 },
  message: { fontSize: 13, color: "#475569" },
  time: { fontSize: 12, color: "#94a3b8" },
  empty: { padding: 40, textAlign: "center", color: "#94a3b8" },
};
