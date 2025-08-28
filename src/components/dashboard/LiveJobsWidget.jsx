import React, { useState, useEffect } from "react";
import { RiAlertLine } from "react-icons/ri";

export default function LiveJobsWidget() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        { id: 1, vehicle: "MH12AB1234", stage: "In Progress", eta: "20m", progress: 60, delayed: false },
        { id: 2, vehicle: "MH12CD5678", stage: "Inspection", eta: "40m", progress: 30, delayed: true, delayTime: "10m" },
        { id: 3, vehicle: "MH12EF9012", stage: "Pre-Wash", eta: "15m", progress: 20, delayed: false },
      ]);
    }, 380);
  }, []);

  const stageColor = (stage) =>
    ({
      "Pre-Wash": "#3b82f6",
      "In Progress": "#f59e0b",
      Inspection: "#6366f1",
      Completed: "#16a34a",
    }[stage] || "#94a3b8");

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Live Jobs Status</h3>
        <span style={styles.link}>View All</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.item}>
            <div style={styles.row}>
              <div style={styles.vehicle}>{job.vehicle}</div>
              <div style={{ ...styles.stage, color: stageColor(job.stage) }}>{job.stage}</div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={styles.progressTop}>
                <span>Completion</span>
                <span>{job.progress}%</span>
              </div>
              <div style={styles.bar}>
                <div style={{ ...styles.fill, width: `${job.progress}%`, background: stageColor(job.stage) }} />
              </div>
            </div>

            <div style={styles.footer}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <span style={{ color: "var(--muted)" }}>ETA:</span>
                <span style={{ fontWeight: 800 }}>{job.eta}</span>
              </div>

              {job.delayed && (
                <div style={styles.delay}>
                  <RiAlertLine /> Delayed by {job.delayTime}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { background: "#fff", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 800, margin: 0 },
  link: { color: "var(--brand)", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  item: { border: "1px solid var(--border)", borderRadius: 14, padding: 16, transition: "transform .15s" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  vehicle: { fontWeight: 800, fontSize: 15 },
  stage: { fontSize: 13, fontWeight: 800 },
  progressTop: { display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "var(--muted)" },
  bar: { height: 10, background: "#f1f5f9", borderRadius: 6, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 6, transition: "width .5s ease" },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  delay: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(239,68,68,.12)",
    color: "#ef4444",
    fontSize: 12,
    fontWeight: 800,
    padding: "6px 10px",
    borderRadius: 8,
  },
};
