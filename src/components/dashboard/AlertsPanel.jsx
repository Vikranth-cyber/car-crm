import React, { useState, useEffect } from "react";
import { RiErrorWarningLine, RiAlertLine, RiInformationLine, RiCloseLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        { id: 1, type: "Job Delay", message: "Job #102 delayed by 15m", severity: "high", time: "5 min ago" },
        { id: 2, type: "Low Stock", message: "Oil stock below threshold", severity: "medium", time: "12 min ago" },
        { id: 3, type: "Complaint", message: "Customer reported unsatisfactory wash", severity: "high", time: "25 min ago" },
        { id: 4, type: "Re-image", message: "Vehicle #ABC123 requires re-imaging", severity: "medium", time: "45 min ago" },
        { id: 5, type: "Maintenance", message: "Machine #3 requires scheduled maintenance", severity: "medium", time: "1 hour ago" },
        { id: 6, type: "New Order", message: "New premium wash package ordered", severity: "low", time: "1 hour ago" },
        { id: 7, type: "Payment Issue", message: "Payment failed for order #2057", severity: "high", time: "2 hours ago" },
        { id: 8, type: "System Update", message: "New software update available", severity: "low", time: "3 hours ago" },
      ]);
    }, 400);
  }, []);

  const iconBySeverity = (sev) =>
    sev === "high" ? <RiErrorWarningLine /> : sev === "medium" ? <RiAlertLine /> : <RiInformationLine />;

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div style={styles.card}>
      {/* Header with title and bell icon */}
      <div style={styles.header}>
        <h3 style={styles.title}>Alerts </h3>
      </div>

      {/* Alerts list */}
      <div style={styles.alertsContainer}>
        {alerts.length === 0 ? (
          <div style={styles.empty}>
            <RiInformationLine size={24} style={{ marginBottom: 8, opacity: 0.5 }} />
            <div>No active alerts</div>
            <div style={{ fontSize: 13, marginTop: 4, opacity: 0.7 }}>Everything is running smoothly</div>
          </div>
        ) : (
          alerts.map((a) => (
            <div key={a.id} style={{ ...styles.item, borderLeft: `4px solid ${getSeverityColor(a.severity)}` }}>
              <div style={{ ...styles.icon, color: getSeverityColor(a.severity) }}>
                {iconBySeverity(a.severity)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.itemTitle}>{a.type}</div>
                <div style={styles.itemText}>{a.message}</div>
                <div style={styles.time}>{a.time}</div>
              </div>
              <button 
                onClick={() => dismissAlert(a.id)}
                style={styles.dismissBtn}
                aria-label="Dismiss alert"
              >
                <RiCloseLine size={16} />
              </button>
            </div>
          ))
        )}
      </div>
      
      {alerts.length > 0 && (
        <div style={styles.footer}>
          <Link to="/notifications" style={styles.viewAllLink}>
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}

const getSeverityColor = (severity) => {
  switch(severity) {
    case "high": return "#ef4444";
    case "medium": return "#f59e0b";
    default: return "#3b82f6";
  }
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "var(--radius)",
    padding: 24,
    boxShadow: "var(--shadow)",
    border: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: 0,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "1px solid #f1f5f9",
    flexShrink: 0,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 800, 
    margin: 0,
    color: "#00aaff",
  },
  alertsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flex: 1,
    overflowY: "auto",
    minHeight: 0,
  },
  empty: { 
    textAlign: "center", 
    padding: "40px 20px", 
    color: "#94a3b8", 
    fontStyle: "normal",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    padding: 16,
    borderRadius: 12,
    background: "#f8fafc",
    border: "1px solid #f1f5f9",
    transition: "all 0.2s ease",
    position: "relative",
    flexShrink: 0,
  },
  icon: { 
    fontSize: 20, 
    marginTop: 2,
    flexShrink: 0,
  },
  itemTitle: { 
    fontWeight: 700, 
    fontSize: 14, 
    marginBottom: 6,
    color: "#0f172a",
  },
  itemText: { 
    fontSize: 13, 
    color: "#475569",
    lineHeight: 1.4,
    marginBottom: 6,
  },
  time: {
    fontSize: 12, 
    color: "#94a3b8",
    fontWeight: 500,
  },
  dismissBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    borderRadius: "50%",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
    transition: "all 0.2s ease",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 16,
    borderTop: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "center",
    flexShrink: 0,
  },
  viewAllLink: {
    color: "#00aaff",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
};