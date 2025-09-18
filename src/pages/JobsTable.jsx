import React from "react";
import { FiEye, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function fmtMinutes(minutes) {
  if (minutes == null || isNaN(minutes)) return "-";
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

export default function JobsTable({ jobs, jobProgressPct, onSelectJob, onMarkJobDone }) {
  const navigate = useNavigate();

  const theme = {
    primary: "#00aaff",
    muted: "#6b7280",
  };

  const th = { textAlign: "left", padding: 14, fontWeight: 800, fontSize: 13, color: "#0f172a" };
  const td = { padding: 14, borderTop: "1px solid #f1f3f8", fontSize: 14, verticalAlign: "middle" };

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 14, boxShadow: "0 10px 30px rgba(11,92,255,0.08)", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "linear-gradient(90deg,#ffffff, #f8fafc)" }}>
          <tr>
            <th style={th}>Job ID</th>
            <th style={th}>Customer</th>
            <th style={th}>Vehicle</th>
            <th style={th}>Services</th>
            <th style={th}>Status</th>
            <th style={th}>Progress</th>
            <th style={th}>Bay</th>
            <th style={th}>Billing</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id}>
              <td style={td}>{j.id}</td>
              <td style={td}>{j.customer}</td>
              <td style={td}>{j.vehicle}</td>
              <td style={td}>{(j.services || []).map((s) => s.name || s).join(", ")}</td>
              <td style={td}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: j.status === "Delayed" ? "#fff1f2" : "#eef6ff",
                    color: j.status === "Delayed" ? "#dc2626" : theme.primary,
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {j.status}
                </span>
              </td>
              <td style={td}>
                <div style={{ width: 220, maxWidth: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: theme.muted }}>
                    <span>{jobProgressPct(j)}% complete</span>
                    <span>{fmtMinutes((jobProgressPct(j) / 100) * 60)}</span>
                  </div>
                  <div
                    style={{
                      height: 10,
                      background: "#eef2ff",
                      borderRadius: 999,
                      marginTop: 6,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${jobProgressPct(j)}%`,
                        height: "100%",
                        background: "linear-gradient(90deg,#06b6d4,#0b5cff)",
                      }}
                    />
                  </div>
                </div>
              </td>
              <td style={td}>{j.bay}</td>
              <td style={td}>
                <button
                  onClick={() =>
                    navigate("/billing", {
                      state: {
                        fromJob: true,
                        customer: j.customer,
                        services: (j.services || []).map((s) => ({
                          description: s.name,
                          qty: 1,
                          charges: 0,
                        })),
                      },
                    })
                  }
                  disabled={jobProgressPct(j) < 100}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "none",
                    cursor: jobProgressPct(j) === 100 ? "pointer" : "not-allowed",
                    background: jobProgressPct(j) === 100
                      ? "linear-gradient(90deg,#059669,#10b981)"
                      : "#e5e7eb",
                    color: jobProgressPct(j) === 100 ? "#fff" : "#9ca3af",
                    fontWeight: 700,
                  }}
                >
                  Create Bill
                </button>
              </td>
              <td style={td}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => onSelectJob(j)}
                    style={{
                      padding: 8,
                      borderRadius: 10,
                      border: "1px solid rgba(11,92,255,0.08)",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                    title="View details"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => onMarkJobDone(j.id)}
                    style={{
                      padding: 8,
                      borderRadius: 10,
                      border: "1px solid rgba(16,185,129,0.08)",
                      background: "#fff",
                      cursor: "pointer",
                      color: "#059669",
                    }}
                    title="Mark job done"
                  >
                    <FiCheckCircle />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: 40, color: theme.muted }}>
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
