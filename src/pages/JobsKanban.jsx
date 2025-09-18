import React from "react";

export default function JobsKanban({ jobs, jobProgressPct, onSelectJob, windowWidth }) {
  const theme = {
    primary: "#00aaff",
    muted: "#6b7280",
  };

  const kanbanColumns = {
    Waiting: jobs.filter((j) => j.status === "Waiting"),
    "In Progress": jobs.filter((j) => j.status === "In Progress"),
    Ready: jobs.filter((j) => j.status === "Ready"),
    Delayed: jobs.filter((j) => j.status === "Delayed"),
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        overflowX: windowWidth < 1024 ? "auto" : "hidden",
        flexWrap: windowWidth < 1024 ? "nowrap" : "wrap",
      }}
    >
      {Object.entries(kanbanColumns).map(([status, list]) => (
        <div
          key={status}
          style={{
            minWidth: windowWidth < 1024 ? 280 : "calc(25% - 14px)",
            background: "#fff",
            borderRadius: 12,
            padding: 14,
            boxShadow: "0 6px 18px rgba(2,6,23,0.04)",
            flex: windowWidth < 1024 ? "0 0 auto" : "1",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ fontWeight: 900, color: theme.primary }}>{status}</div>
            <div style={{ fontSize: 12, color: theme.muted }}>{list.length}</div>
          </div>
          {list.map((job) => (
            <div
              key={job.id}
              style={{
                padding: 12,
                borderRadius: 12,
                background: "#f8fbff",
                marginBottom: 10,
                boxShadow: "0 8px 30px rgba(2,6,23,0.04)",
                cursor: "pointer",
              }}
              onClick={() => onSelectJob(job)}
            >
              <div style={{ fontWeight: 900, fontSize: 15 }}>
                {job.id} • {job.customer}
              </div>
              <div style={{ fontSize: 13, color: theme.muted, marginTop: 6 }}>
                {job.vehicle}
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#475569",
                }}
              >
                <span>{(job.services || []).map((s) => s.name || s).join(", ")}</span>
                <span style={{ fontWeight: 800, color: "#0b5cff" }}>{jobProgressPct(job)}%</span>
              </div>
            </div>
          ))}
          {list.length === 0 && <div style={{ color: theme.muted }}>No jobs</div>}
        </div>
      ))}
    </div>
  );
}
