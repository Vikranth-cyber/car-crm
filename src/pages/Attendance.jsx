// Attendance.jsx
import React, { useState } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiEdit,
  FiSave,
} from "react-icons/fi";

export default function Attendance() {
  const [records, setRecords] = useState([
    {
      id: 1,
      employee: "Alice",
      tier: 2,
      hours: [{ in: "09:00", out: "13:00" }],
      status: "Pending",
      logs: [],
    },
    {
      id: 2,
      employee: "Bob",
      tier: 3,
      hours: [{ in: "10:00", out: "14:00" }],
      status: "Pending",
      logs: [],
    },
  ]);

  const [selectedEdit, setSelectedEdit] = useState(null);
  const [newIn, setNewIn] = useState("");
  const [newOut, setNewOut] = useState("");

  // Manager approves/rejects (only if Pending)
  const handleApproval = (id, action) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id && r.status === "Pending"
          ? { ...r, status: action }
          : r
      )
    );

    window.dispatchEvent(
      new CustomEvent("notify", {
        detail: {
          type: "Attendance",
          message: `Manager ${action} attendance for employee #${id}`,
          severity: action === "Approved" ? "medium" : "high",
        },
      })
    );
  };

  // Manager edits (only if Pending)
  const saveEdit = () => {
    if (!selectedEdit) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === selectedEdit && r.status === "Pending"
          ? {
              ...r,
              hours: [{ in: newIn, out: newOut }],
              logs: [
                ...r.logs,
                `Edited to ${newIn}-${newOut} at ${new Date().toLocaleTimeString()}`,
              ],
            }
          : r
      )
    );
    window.dispatchEvent(
      new CustomEvent("notify", {
        detail: {
          type: "Attendance Edit",
          message: `Manager edited your hours to ${newIn}-${newOut}`,
          severity: "high",
        },
      })
    );
    setSelectedEdit(null);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "28px",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        margin: "20px auto",
        maxWidth: "1100px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: "24px",
          color: "#00aaff",
          fontSize: "24px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Attendance
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
      >
        {records.map((rec) => (
          <div
            key={rec.id}
            style={{
              border: "1px solid #e6f0ff",
              borderRadius: "14px",
              padding: "20px",
              boxShadow: "0 6px 16px rgba(11,99,255,0.08)",
              background: "#ffffff",
              transition: "transform 0.2s",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <strong style={{ fontSize: "18px", color: "#1e293b" }}>
                {rec.employee}
              </strong>
              <span
                style={{
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  background:
                    rec.status === "Approved"
                      ? "#d1fae5"
                      : rec.status === "Rejected"
                      ? "#fee2e2"
                      : "#fff7ed",
                  color:
                    rec.status === "Approved"
                      ? "#059669"
                      : rec.status === "Rejected"
                      ? "#dc2626"
                      : "#d97706",
                }}
              >
                {rec.status}
              </span>
            </div>

            {/* Hours */}
            <div style={{ fontSize: "15px", marginBottom: "12px" }}>
              <strong style={{ color: "#00aaff" }}>Hours:</strong>
              {rec.hours.map((h, idx) => (
                <span
                  key={idx}
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    background: "#f1f5ff",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontWeight: 500,
                  }}
                >
                  {h.in} - {h.out}
                </span>
              ))}
            </div>

            {/* Action buttons (only if Pending) */}
            {rec.status === "Pending" && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  style={btnStyle("#0d9488")}
                  onClick={() => handleApproval(rec.id, "Approved")}
                >
                  <FiCheckCircle style={{ marginRight: "6px" }} />
                  Approve
                </button>
                <button
                  style={btnStyle("#dc2626")}
                  onClick={() => handleApproval(rec.id, "Rejected")}
                >
                  <FiXCircle style={{ marginRight: "6px" }} />
                  Reject
                </button>
                <button
                  style={btnStyle("#00aaff")}
                  onClick={() => setSelectedEdit(rec.id)}
                >
                  <FiEdit style={{ marginRight: "6px" }} />
                  Edit
                </button>
              </div>
            )}

            {/* Edit form (only if Pending) */}
            {selectedEdit === rec.id && rec.status === "Pending" && (
              <div
                style={{
                  marginTop: "14px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="time"
                  value={newIn}
                  onChange={(e) => setNewIn(e.target.value)}
                  style={{ ...inputBox }}
                />
                <input
                  type="time"
                  value={newOut}
                  onChange={(e) => setNewOut(e.target.value)}
                  style={{ ...inputBox }}
                />
                <button style={btnStyle("#1e293b")} onClick={saveEdit}>
                  <FiSave style={{ marginRight: "6px" }} />
                  Save
                </button>
              </div>
            )}

            {/* Logs */}
            {rec.tier !== 3 && rec.logs.length > 0 && (
              <div
                style={{
                  marginTop: "14px",
                  fontSize: "14px",
                  color: "#475569",
                }}
              >
                <strong style={{ color: "#00aaff" }}>Logs:</strong>
                <ul>
                  {rec.logs.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const btnStyle = (bg) => ({
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: bg,
  color: "white",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "14px",
  transition: "background 0.2s",
  display: "flex",
  alignItems: "center",
});

const inputBox = {
  padding: "8px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  flex: "1",
  minWidth: "120px",
};
