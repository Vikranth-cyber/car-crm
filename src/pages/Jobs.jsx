// Jobs.jsx
import React, { useEffect, useMemo, useState } from "react";

/**
 * Simplified sample data for STAFF, SERVICES and CUSTOMERS.
 * In production these would come from your backend endpoints.
 */

const STAFF = [
  { id: "S001", name: "Ramesh" },
  { id: "S002", name: "Kavita" },
  { id: "S003", name: "Vikram" },
  { id: "S004", name: "Anita" },
  { id: "S005", name: "Suresh" },
];

const SERVICES = [
  {
    id: "SV001",
    name: "Full Car Cleaning",
    steps: ["Check-in", "Inspection", "Interior Cleaning", "Exterior Cleaning", "Quality Check"],
  },
  {
    id: "SV002",
    name: "AC Service",
    steps: ["Check-in", "Diagnosis", "Gas Top-up", "Testing", "Quality Check"],
  },
  {
    id: "SV003",
    name: "Oil Change",
    steps: ["Check-in", "Drain Oil", "Replace Filter", "Refill & Test", "Quality Check"],
  },
  {
    id: "SV004",
    name: "Wheel Alignment",
    steps: ["Check-in", "Alignment Setup", "Alignment Run", "Test Drive", "Quality Check"],
  },
];

/**
 * Sample customers dataset with mobile and known vehicles.
 * Backend should own this; here it's used for auto-fill demo.
 */
const CUSTOMERS = [
  {
    name: "Rahul Sharma",
    mobile: "9000000001",
    vehicles: ["MH12AB1234 - Honda City"],
  },
  {
    name: "Priya Verma",
    mobile: "9000000002",
    vehicles: ["TS09XY5678 - Hyundai i20"],
  },
];

function fmtMinutes(minutes) {
  if (minutes == null || isNaN(minutes)) return "-";
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

export default function Jobs() {
  // --- initial jobs (sample) ---
  const [jobs, setJobs] = useState([
    {
      id: "JOB001",
      customer: "Rahul Sharma",
      mobile: "9000000001",
      vehicle: "MH12AB1234 - Honda City",
      services: [{ id: "SV001", name: "Full Car Cleaning", steps: [] }],
      status: "In Progress",
      bay: "Bay 2",
      eta: "30 mins",
      staffAssigned: "S001",
      stages: [
        {
          key: "s1",
          name: "Check-in",
          status: "Done",
          staffId: "S001",
          start: "2025-09-05T08:00:00.000Z",
          end: "2025-09-05T08:10:00.000Z",
        },
        {
          key: "s2",
          name: "Inspection",
          status: "Done",
          staffId: "S002",
          start: "2025-09-05T08:12:00.000Z",
          end: "2025-09-05T08:35:00.000Z",
        },
        {
          key: "s3",
          name: "Cleaning",
          status: "In Progress",
          staffId: "S003",
          start: "2025-09-05T08:40:00.000Z",
          end: null,
        },
        {
          key: "s4",
          name: "Quality Check",
          status: "Pending",
          staffId: "S004",
          start: null,
          end: null,
        },
      ],
      delays: [],
    },
    {
      id: "JOB002",
      customer: "Priya Verma",
      mobile: "9000000002",
      vehicle: "TS09XY5678 - Hyundai i20",
      services: [{ id: "SV003", name: "Oil Change", steps: [] }],
      status: "Waiting",
      bay: "-",
      eta: "Pending",
      staffAssigned: null,
      stages: [
        {
          key: "s1",
          name: "Check-in",
          status: "Waiting",
          staffId: null,
          start: null,
          end: null,
        },
        {
          key: "s2",
          name: "Oil Drain",
          status: "Waiting",
          staffId: null,
          start: null,
          end: null,
        },
        {
          key: "s3",
          name: "Refill & Test",
          status: "Waiting",
          staffId: null,
          start: null,
          end: null,
        },
      ],
      delays: [],
    },
  ]);

  // --- UI state ---
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAddJob, setShowAddJob] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  // --- New Job complex form state ---
  const emptyNewJob = {
    customerName: "",
    mobile: "",
    vehicle: "",
    existingVehicleList: [],
    bay: "",
    selectedServices: [], // array of { id, name, serviceId, steps: [{name, staffId}] }
    preInspectionNotes: "",
  };
  const [newJobDraft, setNewJobDraft] = useState(emptyNewJob);

  // --- responsive monitor ---
  useEffect(() => {
    function onResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // --- helper calculated values ---
  const stageAverages = useMemo(() => {
    const map = {};
    jobs.forEach((job) => {
      job.stages.forEach((st) => {
        if (st.start && st.end) {
          const diff = (new Date(st.end) - new Date(st.start)) / (1000 * 60);
          if (!isFinite(diff)) return;
          if (!map[st.name]) map[st.name] = { total: 0, count: 0 };
          map[st.name].total += diff;
          map[st.name].count += 1;
        }
      });
    });
    const out = {};
    Object.entries(map).forEach(([k, v]) => {
      out[k] = v.total / v.count;
    });
    return out;
  }, [jobs]);

  const filteredJobs = jobs.filter((j) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      j.id.toLowerCase().includes(q) ||
      j.customer.toLowerCase().includes(q) ||
      (j.vehicle || "").toLowerCase().includes(q)
    );
  });

  const kanbanColumns = {
    Waiting: jobs.filter((job) => job.status === "Waiting"),
    "In Progress": jobs.filter((job) => job.status === "In Progress"),
    Inspection: jobs.filter((job) => job.status === "Inspection"),
    Ready: jobs.filter((job) => job.status === "Ready"),
    Delayed: jobs.filter((job) => job.status === "Delayed"),
  };

  function jobProgressPct(job) {
    const total = job.stages.length || 1;
    const done = job.stages.filter((s) => s.status === "Done").length;
    return Math.round((done / total) * 100);
  }

  function openJobDetails(jobId) {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    setSelectedJob(JSON.parse(JSON.stringify(job)));
  }

  function saveSelectedJobEdits() {
    setJobs((prev) => prev.map((j) => (j.id === selectedJob.id ? selectedJob : j)));
    setSelectedJob(null);
  }

  function reportDelay(stageKey, reason) {
    setSelectedJob((prev) => {
      const now = new Date().toISOString();
      const updated = { ...prev };
      updated.delays = [...(updated.delays || []), { stageKey, reason, reportedAt: now }];
      updated.stages = updated.stages.map((st) =>
        st.key === stageKey ? { ...st, status: "Delayed" } : st
      );
      updated.status = "Delayed";
      return updated;
    });
  }

  function toggleStartStage(stageKey) {
    setSelectedJob((prev) => {
      const updated = { ...prev };
      updated.stages = updated.stages.map((st) => {
        if (st.key !== stageKey) return st;
        if (!st.start) {
          return { ...st, start: new Date().toISOString(), status: "In Progress" };
        } else if (!st.end) {
          return { ...st, end: new Date().toISOString(), status: "Done" };
        }
        return st;
      });
      const anyInProgress = updated.stages.some((s) => s.status === "In Progress");
      if (anyInProgress) updated.status = "In Progress";
      else if (updated.stages.every((s) => s.status === "Done")) updated.status = "Ready";
      return updated;
    });
  }

  function changeStageStaff(stageKey, staffId) {
    setSelectedJob((prev) => {
      const updated = { ...prev };
      updated.stages = updated.stages.map((st) => (st.key === stageKey ? { ...st, staffId } : st));
      return updated;
    });
  }

  function avgCompleteTimeForStageName(name) {
    const avg = stageAverages[name];
    if (avg) return avg;
    if (!selectedJob) return null;
    const st = selectedJob.stages.find((s) => s.name === name && s.start && s.end);
    if (st) return (new Date(st.end) - new Date(st.start)) / (1000 * 60);
    return null;
  }

  // compute staff busy set from existing jobs (any non-null staff assigned in stages or job.staffAssigned)
  const busyStaffIds = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => {
      if (j.staffAssigned) set.add(j.staffAssigned);
      (j.stages || []).forEach((s) => {
        if (s.staffId) set.add(s.staffId);
      });
    });
    return set;
  }, [jobs]);

  const freeStaff = STAFF.filter((s) => !busyStaffIds.has(s.id));
  const busyStaff = STAFF.filter((s) => busyStaffIds.has(s.id));

  // ----------------------- Styles -----------------------
  const theme = {
    primary: "#0b5cff",
    muted: "#6b7280",
    surface: "#ffffff",
    cardShadow: "0 6px 20px rgba(11,92,255,0.08)",
  };

  const containerStyle = {
    padding: "20px",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    background: "#ffffff" ,
    minHeight: "100vh",
    boxSizing: "border-box",
  };

  const headerStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 18,
  };

  const leftHeader = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" };

  const titleStyle = { color: theme.primary, fontSize: 20, fontWeight: 700 };

  // search style: decreased width on smaller screens as requested
  const searchStyle = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e6e9f2",
    minWidth:
      windowWidth < 420 ? 180 : windowWidth < 768 ? Math.min(360, windowWidth * 0.45) : 260,
    width: windowWidth < 420 ? 180 : "auto",
    boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)",
  };

  const btnPrimary = {
    background: `linear-gradient(90deg, ${theme.primary}, #0058d6)`,
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: theme.cardShadow,
    whiteSpace: "nowrap",
  };

  const viewToggle = {
    display: "flex",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(16,24,40,0.04)",
  };

  const pill = (active) => ({
    padding: "8px 12px",
    background: active ? theme.primary : "transparent",
    color: active ? "#fff" : theme.muted,
    cursor: "pointer",
    fontWeight: 600,
  });

  const tableCard = {
    background: theme.surface,
    borderRadius: 12,
    padding: 12,
    boxShadow: theme.cardShadow,
    overflowX: "auto",
  };

  const th = { textAlign: "left", padding: 12, color: "#111827", fontWeight: 700, fontSize: 13 };
  const td = { padding: 12, borderTop: "1px solid #f1f3f8", fontSize: 13 };

  const kanbanContainerStyle = {
    display: "flex",
    gap: 12,
    overflowX: windowWidth < 1024 ? "auto" : "hidden",
    paddingTop: 8,
    flexWrap: windowWidth < 1024 ? "nowrap" : "wrap",
  };

  const kanbanColumn = {
    minWidth: windowWidth < 1024 ? 260 : "calc(20% - 12px)",
    background: "#fff",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 4px 18px rgba(2,6,23,0.04)",
    flex: windowWidth < 1024 ? "0 0 auto" : "1",
  };

  const headerControlsStyle = {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: windowWidth < 768 ? "flex-start" : "flex-end",
    width: windowWidth < 768 ? "100%" : "auto",
    marginTop: windowWidth < 768 ? "10px" : 0,
  };

  // ----------------------- Actions -----------------------

  function createNewJob() {
    // build stages from selectedServices and assigned staff per step
    const id = `JOB${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const newStages = [];
    newJobDraft.selectedServices.forEach((svc, svcIndex) => {
      // svc.stepsAssigned: [{ name, staffId }]
      svc.stepsAssigned.forEach((step, i) => {
        newStages.push({
          key: `s${Date.now()}_${svcIndex}_${i}`,
          name: `${svc.name} — ${step.name}`,
          status: "Waiting",
          staffId: step.staffId || null,
          start: null,
          end: null,
        });
      });
    });

    const job = {
      id,
      customer: newJobDraft.customerName || "Unknown",
      mobile: newJobDraft.mobile || "",
      vehicle: newJobDraft.vehicle || "-",
      services: newJobDraft.selectedServices.map((s) => ({ id: s.id, name: s.name })),
      status: "Waiting",
      bay: newJobDraft.bay || "-",
      eta: "Pending",
      staffAssigned: null,
      stages: newStages.length ? newStages : [{ key: `s${Date.now()}_0`, name: "Check-in", status: "Waiting", staffId: null, start: null, end: null }],
      delays: [],
      preInspection: newJobDraft.preInspectionNotes || "",
    };

    setJobs((p) => [job, ...p]);
    // reset form
    setNewJobDraft(emptyNewJob);
    setShowAddJob(false);
  }

  // --- helpers for new job form: service search/selection, assigning steps & staff, customer mobile lookup ---
  function findCustomerByMobile(mobile) {
    if (!mobile) return null;
    return CUSTOMERS.find((c) => c.mobile === mobile) || null;
  }

  function onMobileBlurPopulate(mobile) {
    const c = findCustomerByMobile(mobile);
    if (c) {
      setNewJobDraft((p) => ({
        ...p,
        customerName: c.name,
        existingVehicleList: c.vehicles,
        vehicle: c.vehicles[0] || "",
      }));
    } else {
      // try to find from jobs history
      const j = jobs.find((job) => job.mobile === mobile);
      if (j) {
        setNewJobDraft((p) => ({
          ...p,
          customerName: j.customer,
          existingVehicleList: jobs.filter((x) => x.mobile === mobile).map((x) => x.vehicle),
          vehicle: jobs.find((x) => x.mobile === mobile)?.vehicle || "",
        }));
      } else {
        setNewJobDraft((p) => ({ ...p, existingVehicleList: [], customerName: p.customerName }));
      }
    }
  }

  function addServiceToDraft(serviceObj) {
    // avoid duplicates by service id
    if (newJobDraft.selectedServices.some((s) => s.id === serviceObj.id)) return;
    const stepsAssigned = serviceObj.steps.map((st) => ({ name: st, staffId: null }));
    setNewJobDraft((p) => ({
      ...p,
      selectedServices: [...p.selectedServices, { id: serviceObj.id, name: serviceObj.name, stepsAssigned }],
    }));
  }

  function removeServiceFromDraft(serviceId) {
    setNewJobDraft((p) => ({ ...p, selectedServices: p.selectedServices.filter((s) => s.id !== serviceId) }));
  }

  function setServiceStepStaff(serviceId, stepIndex, staffId) {
    setNewJobDraft((p) => ({
      ...p,
      selectedServices: p.selectedServices.map((s) =>
        s.id === serviceId
          ? { ...s, stepsAssigned: s.stepsAssigned.map((st, i) => (i === stepIndex ? { ...st, staffId } : st)) }
          : s
      ),
    }));
  }

  // search helper for services: returns filtered by text
  function searchServices(q) {
    const t = (q || "").trim().toLowerCase();
    if (!t) return SERVICES;
    return SERVICES.filter((s) => s.name.toLowerCase().includes(t) || s.id.toLowerCase().includes(t));
  }

  // ----------------------- Render -----------------------
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={leftHeader}>
          <div style={titleStyle}>Jobs Management</div>
          {/* subtitle removed as requested */}
        </div>

        <div style={headerControlsStyle}>
          <input
            placeholder="Search Job ID, customer, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchStyle}
          />
          <div style={viewToggle}>
            <div style={pill(viewMode === "table")} onClick={() => setViewMode("table")}>
              Table
            </div>
            <div style={pill(viewMode === "kanban")} onClick={() => setViewMode("kanban")}>
              Kanban
            </div>
          </div>
          <button style={btnPrimary} onClick={() => setShowAddJob(true)}>
            + Add JOB
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <div style={tableCard}>
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
                <th style={th}>ETA</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((j) => (
                <tr key={j.id} style={{ cursor: "pointer" }}>
                  <td style={td}>{j.id}</td>
                  <td style={td}>{j.customer}</td>
                  <td style={td}>{j.vehicle}</td>
                  <td style={td}>{(j.services || []).map((s) => s.name || s).join(", ")}</td>
                  <td style={td}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: j.status === "Delayed" ? "#ffdede" : "#eef2ff",
                        color: j.status === "Delayed" ? "#b91c1c" : theme.primary,
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {j.status}
                    </span>
                  </td>
                  <td style={td}>
                    <div style={{ width: 160 }}>
                      <div style={{ fontSize: 12, color: theme.muted }}>{jobProgressPct(j)}% complete</div>
                      <div
                        style={{
                          height: 8,
                          background: "#f1f5f9",
                          borderRadius: 999,
                          marginTop: 6,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${jobProgressPct(j)}%`,
                            height: "100%",
                            background: "linear-gradient(90deg,#0b5cff,#00a3ff)",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={td}>{j.bay}</td>
                  <td style={td}>{j.eta}</td>
                  <td style={td}>
                    <button
                      onClick={() => openJobDetails(j.id)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(11,92,255,0.12)",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ padding: 20, color: theme.muted }}>
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={kanbanContainerStyle}>
          {Object.entries(kanbanColumns).map(([status, list]) => (
            <div key={status} style={kanbanColumn}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 800, color: theme.primary }}>{status}</div>
                <div style={{ fontSize: 12, color: theme.muted }}>{list.length}</div>
              </div>

              {list.map((job) => (
                <div
                  key={job.id}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    background: "#f8fafc",
                    marginBottom: 10,
                    boxShadow: "0 6px 18px rgba(2,6,23,0.03)",
                    cursor: "pointer",
                  }}
                  onClick={() => openJobDetails(job.id)}
                >
                  <div style={{ fontWeight: 800 }}>{job.id} • {job.customer}</div>
                  <div style={{ fontSize: 13, color: theme.muted, marginTop: 6 }}>{job.vehicle}</div>
                  <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 12, color: "#475569" }}>{(job.services || []).map(s => s.name || s).join(", ")}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0b5cff" }}>{jobProgressPct(job)}%</div>
                  </div>
                </div>
              ))}
              {list.length === 0 && <div style={{ color: theme.muted, paddingTop: 8 }}>No jobs</div>}
            </div>
          ))}
        </div>
      )}

      {/* Job details modal */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(2,6,23,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: windowWidth < 760 ? "100%" : 960, maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexDirection: windowWidth < 600 ? "column" : "row" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{selectedJob.id} — {selectedJob.customer}</div>
                <div style={{ color: theme.muted, marginTop: 6 }}>{selectedJob.vehicle} • Bay: {selectedJob.bay}</div>
                <div style={{ marginTop: 8 }}>
                  <strong>Services:</strong> {(selectedJob.services || []).map(s => s.name || s).join(", ")}
                </div>
              </div>

              <div style={{ textAlign: windowWidth < 600 ? "left" : "right" }}>
                <div style={{ fontWeight: 800, color: theme.primary }}>{selectedJob.status}</div>
                <div style={{ marginTop: 6, fontSize: 13, color: theme.muted }}>{jobProgressPct(selectedJob)}% complete</div>
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    style={{ ...btnPrimary, padding: "8px 10px" }}
                    onClick={() => {
                      saveSelectedJobEdits();
                    }}
                  >
                    Save
                  </button>
                  <button
                    style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e6e9f2", background: "#fff" }}
                    onClick={() => setSelectedJob(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            <hr style={{ margin: "14px 0", border: 0, height: 1, background: "#f1f5f9" }} />

            <div style={{ overflowX: "auto", marginTop: 6 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...th, width: 36 }}>#</th>
                    <th style={th}>Stage</th>
                    <th style={th}>Status</th>
                    <th style={th}>Staff</th>
                    <th style={th}>Start</th>
                    <th style={th}>End</th>
                    <th style={th}>Duration</th>
                    <th style={th}>Avg (historical)</th>
                    <th style={th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedJob.stages.map((s, idx) => {
                    const duration = s.start && s.end ? (new Date(s.end) - new Date(s.start)) / (1000 * 60) : null;
                    const histAvg = avgCompleteTimeForStageName(s.name);
                    return (
                      <tr key={s.key}>
                        <td style={td}>{idx + 1}</td>
                        <td style={td}><strong>{s.name}</strong></td>
                        <td style={td}>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <div style={{
                              width: 10,
                              height: 10,
                              borderRadius: 999,
                              background:
                                s.status === "Done" ? "#10b981" :
                                  s.status === "In Progress" ? "#0ea5e9" :
                                    s.status === "Delayed" ? "#ef4444" : "#f59e0b"
                            }} />
                            <div style={{ fontWeight: 700 }}>{s.status}</div>
                          </div>
                        </td>
                        <td style={td}>
                          <select
                            value={s.staffId || ""}
                            onChange={(e) => changeStageStaff(s.key, e.target.value || null)}
                            style={{ padding: 8, borderRadius: 8, border: "1px solid #e6edf7", minWidth: 160 }}
                          >
                            <option value="">Unassigned</option>
                            {STAFF.map((stf) => (
                              <option key={stf.id} value={stf.id}>
                                {stf.id} — {stf.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td style={td}>
                          <input
                            type="datetime-local"
                            value={s.start ? new Date(s.start).toISOString().slice(0, 16) : ""}
                            onChange={(e) => {
                              const iso = e.target.value ? new Date(e.target.value).toISOString() : null;
                              setSelectedJob((prev) => {
                                return {
                                  ...prev,
                                  stages: prev.stages.map((st) => (st.key === s.key ? { ...st, start: iso } : st)),
                                };
                              });
                            }}
                            style={{ padding: 8, borderRadius: 8, border: "1px solid #edf2f7" }}
                          />
                        </td>
                        <td style={td}>
                          <input
                            type="datetime-local"
                            value={s.end ? new Date(s.end).toISOString().slice(0, 16) : ""}
                            onChange={(e) => {
                              const iso = e.target.value ? new Date(e.target.value).toISOString() : null;
                              setSelectedJob((prev) => {
                                return {
                                  ...prev,
                                  stages: prev.stages.map((st) => (st.key === s.key ? { ...st, end: iso } : st)),
                                };
                              });
                            }}
                            style={{ padding: 8, borderRadius: 8, border: "1px solid #edf2f7" }}
                          />
                        </td>
                        <td style={td}>{fmtMinutes(duration)}</td>
                        <td style={td}>{fmtMinutes(histAvg)}</td>
                        <td style={td}>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <button
                              onClick={() => toggleStartStage(s.key)}
                              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e6edf7", background: "#fff" }}
                            >
                              {s.start ? (s.end ? "Done" : "Toggle End") : "Start"}
                            </button>

                            <button
                              onClick={() => {
                                const reason = window.prompt("Describe delay reason (short):");
                                if (reason) reportDelay(s.key, reason);
                              }}
                              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #ffdede", background: "#fff" }}
                            >
                              Delay report
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Delay Reports</div>
              {selectedJob.delays.length === 0 && <div style={{ color: theme.muted }}>No delays reported.</div>}
              {selectedJob.delays.map((d, i) => {
                const st = selectedJob.stages.find((s) => s.key === d.stageKey);
                return (
                  <div key={i} style={{ padding: 10, background: "#fff7ed", borderRadius: 8, marginBottom: 8 }}>
                    <div style={{ fontWeight: 700 }}>{st?.name || d.stageKey} • {new Date(d.reportedAt).toLocaleString()}</div>
                    <div style={{ color: "#92400e" }}>{d.reason}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add New Job Modal (expanded form) */}
      {showAddJob && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(2,6,23,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9998,
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: windowWidth < 700 ? "100%" : 1000, maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Add New JOB</div>
              <button style={{ border: "none", background: "transparent", fontSize: 20 }} onClick={() => setShowAddJob(false)}>✕</button>
            </div>

            {/* Form main grid */}
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: windowWidth < 900 ? "1fr" : "1fr 1fr", gap: 14 }}>
              {/* Customer Section */}
              <div style={{ background: "#fbfdff", padding: 12, borderRadius: 10, border: "1px solid #eef2f7" }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Customer</div>
                <div style={{ display: "grid", gap: 8 }}>
                  <input
                    placeholder="Mobile (used for lookup)"
                    value={newJobDraft.mobile}
                    onChange={(e) => setNewJobDraft((p) => ({ ...p, mobile: e.target.value }))}
                    onBlur={(e) => onMobileBlurPopulate(e.target.value)}
                    style={{ padding: 10, borderRadius: 8, border: "1px solid #eef2f7" }}
                  />
                  <input
                    placeholder="Customer name"
                    value={newJobDraft.customerName}
                    onChange={(e) => setNewJobDraft((p) => ({ ...p, customerName: e.target.value }))}
                    style={{ padding: 10, borderRadius: 8, border: "1px solid #eef2f7" }}
                  />

                  {newJobDraft.existingVehicleList.length > 0 && (
                    <div style={{ fontSize: 12, color: theme.muted }}>
                      Known vehicles for this customer:
                      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                        {newJobDraft.existingVehicleList.map((v) => (
                          <button
                            key={v}
                            onClick={() => setNewJobDraft((p) => ({ ...p, vehicle: v }))}
                            style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #e6edf7", background: "#fff", cursor: "pointer" }}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vehicle Section */}
              <div style={{ background: "#fbfdff", padding: 12, borderRadius: 10, border: "1px solid #eef2f7" }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Vehicle</div>
                <div style={{ display: "grid", gap: 8 }}>
                  <input
                    placeholder="Vehicle (reg - model)"
                    value={newJobDraft.vehicle}
                    onChange={(e) => setNewJobDraft((p) => ({ ...p, vehicle: e.target.value }))}
                    style={{ padding: 10, borderRadius: 8, border: "1px solid #eef2f7" }}
                  />
                  <input
                    placeholder="Bay"
                    value={newJobDraft.bay}
                    onChange={(e) => setNewJobDraft((p) => ({ ...p, bay: e.target.value }))}
                    style={{ padding: 10, borderRadius: 8, border: "1px solid #eef2f7" }}
                  />
                  <div style={{ fontSize: 12, color: theme.muted }}>
                    If this is an existing vehicle, pick from customer vehicles above; otherwise enter new vehicle details.
                  </div>
                </div>
              </div>

              {/* Job Details (spans both columns when large) */}
              <div style={{ gridColumn: windowWidth < 900 ? "auto" : "1 / -1", background: "#fff", padding: 12, borderRadius: 10, border: "1px solid #eef2f7" }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Job Details</div>

                {/* Services selection: searchable combobox + add */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <ServiceCombo onAdd={addServiceToDraft} />
                  <div style={{ marginLeft: "auto", fontSize: 13, color: theme.muted }}>
                    Free staff: {freeStaff.length} • Busy staff: {busyStaff.length}
                  </div>
                </div>

                {/* Selected services with ability to assign staff to each step */}
                <div style={{ display: "grid", gap: 12 }}>
                  {newJobDraft.selectedServices.length === 0 && <div style={{ color: theme.muted }}>No services selected yet.</div>}
                  {newJobDraft.selectedServices.map((svc) => (
                    <div key={svc.id} style={{ border: "1px solid #f1f5f9", padding: 10, borderRadius: 8, background: "#fbfdff" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: 800 }}>{svc.name} <span style={{ color: theme.muted, fontSize: 12 }}>({svc.id})</span></div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => removeServiceFromDraft(svc.id)} style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #ffdede", background: "#fff" }}>Remove</button>
                        </div>
                      </div>

                      <div style={{ marginTop: 10 }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr>
                              <th style={{ ...th, width: 36 }}>#</th>
                              <th style={th}>Step</th>
                              <th style={th}>Assign Staff</th>
                            </tr>
                          </thead>
                          <tbody>
                            {svc.stepsAssigned.map((st, idx) => (
                              <tr key={idx}>
                                <td style={td}>{idx + 1}</td>
                                <td style={td}>{st.name}</td>
                                <td style={td}>
                                  <select
                                    value={st.staffId || ""}
                                    onChange={(e) => setServiceStepStaff(svc.id, idx, e.target.value || null)}
                                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e6edf7", minWidth: 180 }}
                                  >
                                    <option value="">Unassigned</option>
                                    {STAFF.map((stf) => (
                                      <option key={stf.id} value={stf.id}>
                                        {stf.id} — {stf.name} {busyStaffIds.has(stf.id) ? " (busy)" : " (free)"}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-inspection */}
              <div style={{ background: "#fbfdff", padding: 12, borderRadius: 10, border: "1px solid #eef2f7" }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Pre-inspection</div>
                <textarea
                  placeholder="Pre-inspection notes (visible to assigned staff)"
                  value={newJobDraft.preInspectionNotes}
                  onChange={(e) => setNewJobDraft((p) => ({ ...p, preInspectionNotes: e.target.value }))}
                  style={{ padding: 10, borderRadius: 8, border: "1px solid #eef2f7", minHeight: 120 }}
                />
                <div style={{ marginTop: 10, fontSize: 13, color: theme.muted }}>
                  Notes will be saved with job and visible in staff portal.
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
              <button onClick={() => { setShowAddJob(false); setNewJobDraft(emptyNewJob); }} style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e6e9f2", background: "#fff" }}>
                Cancel
              </button>
              <button onClick={createNewJob} style={btnPrimary}>
                Create JOB
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function ServiceCombo({ onAdd }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const matches = (q.trim() ? SERVICES.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())) : SERVICES);

  return (
    <div style={{ position: "relative", width: 520, maxWidth: "100%" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Search service by name or ID..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #eef2f7", flex: 1 }}
        />
        <button
          onClick={() => {
            const exact = SERVICES.find(s => s.id.toLowerCase() === q.trim().toLowerCase() || s.name.toLowerCase() === q.trim().toLowerCase());
            if (exact) {
              onAdd(exact);
              setQ("");
            } else {
              setOpen(true);
            }
          }}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e6edf7", background: "#fff", cursor: "pointer" }}
        >
          Add
        </button>
      </div>

      {open && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 44, background: "#fff", borderRadius: 8, boxShadow: "0 8px 30px rgba(2,6,23,0.08)", zIndex: 40, maxHeight: 220, overflow: "auto", border: "1px solid #eef2f7" }}>
          {matches.length === 0 && <div style={{ padding: 12, color: "#6b7280" }}>No services</div>}
          {matches.map((s) => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{s.id} • {s.steps.length} steps</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => { onAdd(s); setOpen(false); setQ(""); }}
                  style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e6edf7", background: "#fff", cursor: "pointer" }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
