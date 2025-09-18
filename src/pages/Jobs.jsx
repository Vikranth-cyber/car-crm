
import React, { useState, useEffect } from "react";
import { FiPlus, FiTable, FiLayout } from "react-icons/fi";
import JobsTable from "./JobsTable";
import JobsKanban from "./JobsKanban";
import JobDetailsModal from "./JobDetailsModal";
import AddJobForm from "./AddJobForm";

const STAFF = [
  { id: "S001", name: "Ramesh" },
  { id: "S002", name: "Kavita" },
  { id: "S003", name: "Vikram" },
  { id: "S004", name: "Anita" },
  { id: "S005", name: "Suresh" },
];

const theme = {
  primary: "#00aaff",
  muted: "#6b7280",
  surface: "#ffffff",
};

export default function Jobs() {
  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([
    {
      id: "JOB001",
      customer: "Rahul Sharma",
      vehicle: "MH12AB1234 - Honda City",
      services: [{ id: "SV001", name: "Full Car Cleaning" }],
      status: "In Progress",
      bay: "Bay 2",
      stages: [
        { key: "s1", name: "Check-in", status: "Done", staffId: "S001" },
        { key: "s2", name: "Inspection", status: "In Progress", staffId: "S002" },
      ],
      delays: [],
      preInspection: "Small scratch on bumper",
    },
    {
      id: "JOB002",
      customer: "Priya Verma",
      vehicle: "TS09XY5678 - Hyundai i20",
      services: [{ id: "SV003", name: "Oil Change" }],
      status: "Waiting",
      bay: "-",
      stages: [{ key: "s1", name: "Check-in", status: "Waiting" }],
      delays: [],
      preInspection: "",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showAddJob, setShowAddJob] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function onResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function jobProgressPct(job) {
    const total = job.stages.length || 1;
    const done = job.stages.filter((s) => s.status === "Done").length;
    return Math.round((done / total) * 100);
  }

  function markJobDone(jobId) {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              stages: j.stages.map((s) => ({ ...s, status: "Done" })),
              status: "Ready",
            }
          : j
      )
    );
  }

  const filteredJobs = jobs.filter((j) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      j.id.toLowerCase().includes(q) ||
      j.customer.toLowerCase().includes(q) ||
      (j.vehicle || "").toLowerCase().includes(q)
    );
  });

  return (
    <div
      style={{
        padding: 16,
        background: "#fff", 
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          gap: 12,
        }}
      >
        <h2 style={{ color: theme.primary, margin: 0 }}>Jobs Management</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <input
            placeholder="Search Job ID, customer, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              flex: "1 1 auto",
              minWidth: windowWidth < 420 ? "100%" : 260,
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          />
          <div
            style={{
              display: "flex",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            <button
              onClick={() => setViewMode("table")}
              style={{
                padding: "8px 14px",
                cursor: "pointer",
                border: "none",
                background: viewMode === "table" ? theme.primary : "transparent",
                color: viewMode === "table" ? "#fff" : "#000",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FiTable /> Table
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              style={{
                padding: "8px 14px",
                cursor: "pointer",
                border: "none",
                background: viewMode === "kanban" ? theme.primary : "transparent",
                color: viewMode === "kanban" ? "#fff" : "#000",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FiLayout /> Kanban
            </button>
          </div>
          <button
            style={{
              background: "linear-gradient(90deg,#06b6d4,#0b5cff)",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 12,
              border: "none",
              fontWeight: 700,
              boxShadow: "0 4px 10px rgba(11,92,255,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onClick={() => setShowAddJob(true)}
          >
            <FiPlus /> Add Job
          </button>
        </div>
      </div>
      {viewMode === "table" ? (
        <JobsTable
          jobs={filteredJobs}
          jobProgressPct={jobProgressPct}
          onSelectJob={(j) => setSelectedJob(j)}
          onMarkJobDone={markJobDone}
        />
      ) : (
        <JobsKanban
          jobs={filteredJobs}
          jobProgressPct={jobProgressPct}
          onSelectJob={(j) => setSelectedJob(j)}
          windowWidth={windowWidth}
        />
      )}

      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} staff={STAFF} />
      )}
      {showAddJob && (
        <AddJobForm
          existingJobs={jobs}
          onClose={() => setShowAddJob(false)}
          onSave={(job) => setJobs([job, ...jobs])}
        />
      )}
    </div>
  );
}
