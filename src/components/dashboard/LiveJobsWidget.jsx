import React, { useState, useEffect } from "react";
import { RiAlertLine, RiTimeLine } from "react-icons/ri";

export default function LiveJobsWidget() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        { id: 1, vehicle: "MH12AB1234", stage: "In Progress", eta: "20m", progress: 60, delayed: false },
        { id: 2, vehicle: "MH12CD5678", stage: "Inspection", eta: "40m", progress: 30, delayed: true, delayTime: "10m" },
        { id: 3, vehicle: "MH12EF9012", stage: "Pre-Wash", eta: "15m", progress: 20, delayed: false },
        { id: 4, vehicle: "MH12GH3456", stage: "Completed", eta: "0m", progress: 100, delayed: false },
      ]);
    }, 380);
  }, []);

  const stageColor = (stage) =>
    ({
      "Pre-Wash": "#3b82f6",
      "In Progress": "#f59e0b",
      "Inspection": "#6366f1",
      "Completed": "#16a34a",
    }[stage] || "#94a3b8");

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Live Jobs Status</h3>
        <span style={styles.link}>View All</span>
      </div>

      <div style={styles.jobsContainer}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.item}>
            <div style={styles.row}>
              <div style={styles.vehicle}>{job.vehicle}</div>
              <div style={{ ...styles.stage, color: stageColor(job.stage) }}>{job.stage}</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={styles.progressTop}>
                <span>Completion</span>
                <span>{job.progress}%</span>
              </div>
              <div style={styles.bar}>
                <div 
                  style={{ 
                    ...styles.fill, 
                    width: `${job.progress}%`, 
                    backgroundColor: stageColor(job.stage),
                    backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)`,
                    backgroundSize: "1rem 1rem",
                  }} 
                />
              </div>
            </div>

            <div style={styles.footer}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <RiTimeLine size={14} />
                <span style={{ color: "var(--muted)" }}>ETA:</span>
                <span style={{ fontWeight: 800 }}>{job.eta}</span>
              </div>

              {job.delayed && (
                <div style={styles.delay}>
                  <RiAlertLine /> Delayed by {job.delayTime}
                </div>
              )}
              
              {job.stage === "Completed" && (
                <div style={styles.completed}>
                  Completed
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
  card: {
    background: "#fff",
    borderRadius: "var(--radius)",
    padding: 24,
    boxShadow: "var(--shadow)",
    border: "1px solid #f1f5f9",
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
  link: { 
    color: "var(--brand)", 
    fontSize: 14, 
    fontWeight: 700, 
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
  jobsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1,
    overflowY: "auto",
    minHeight: 0,
  },
  item: { 
    border: "1px solid var(--border)", 
    borderRadius: 14, 
    padding: 20, 
    transition: "transform .15s, box-shadow .15s",
    background: "#fff",
    flexShrink: 0,
  },
  row: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 16,
  },
  vehicle: { 
    fontWeight: 800, 
    fontSize: 16,
    color: "#1e293b",
  },
  stage: { 
    fontSize: 13, 
    fontWeight: 800,
    padding: "4px 10px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.05)",
  },
  progressTop: { 
    display: "flex", 
    justifyContent: "space-between", 
    marginBottom: 8, 
    fontSize: 13, 
    color: "var(--muted)",
    fontWeight: 500,
  },
  bar: { 
    height: 10, 
    background: "#f1f5f9", 
    borderRadius: 6, 
    overflow: "hidden",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
  },
  fill: { 
    height: "100%", 
    borderRadius: 6, 
    transition: "width .5s ease",
  },
  footer: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginTop: 4,
  },
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
  completed: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(22,163,74,.12)",
    color: "#16a34a",
    fontSize: 12,
    fontWeight: 800,
    padding: "6px 10px",
    borderRadius: 8,
  },
};