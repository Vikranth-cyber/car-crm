// Jobs.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FiEye,
  FiCheckCircle,
  FiAlertTriangle,
  FiUpload,
  FiPlus,
  FiX,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

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
  {
    id: "SV005",
    name: "Brake Service",
    steps: ["Check-in", "Inspection", "Brake Pad Replacement", "Testing", "Quality Check"],
  },
  {
    id: "SV006",
    name: "Battery Replacement",
    steps: ["Check-in", "Testing", "Replacement", "Charging", "Quality Check"],
  },
];

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
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState([
    {
      id: "JOB001",
      customer: "Rahul Sharma",
      mobile: "9000000001",
      vehicle: "MH12AB1234 - Honda City",
      services: [
        { id: "SV001", name: "Full Car Cleaning", steps: [] },
        { id: "SV002", name: "AC Service", steps: [] },
      ],
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
          name: "AC Diagnosis",
          status: "Pending",
          staffId: "S004",
          start: null,
          end: null,
        },
        {
          key: "s5",
          name: "Quality Check",
          status: "Pending",
          staffId: "S004",
          start: null,
          end: null,
        },
      ],
      delays: [],
      preInspection: "Small scratch on left bumper. Fuel: half tank.",
      preInspectionMedia: [], // example: [{ id, url, type }]
    },
    {
      id: "JOB002",
      customer: "Priya Verma",
      mobile: "9000000002",
      vehicle: "TS09XY5678 - Hyundai i20",
      services: [
        { id: "SV003", name: "Oil Change", steps: [] },
        { id: "SV004", name: "Wheel Alignment", steps: [] },
        { id: "SV005", name: "Brake Service", steps: [] },
      ],
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
        {
          key: "s4",
          name: "Alignment Setup",
          status: "Waiting",
          staffId: null,
          start: null,
          end: null,
        },
        {
          key: "s5",
          name: "Brake Inspection",
          status: "Waiting",
          staffId: null,
          start: null,
          end: null,
        },
      ],
      delays: [],
      preInspection: "",
      preInspectionMedia: [],
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
    preInspectionMedia: [], // { id, file, url, type }
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

  // compute staff occupied set from existing jobs (any non-null staff assigned in stages or job.staffAssigned)
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
    primary: "#00aaff",
    muted: "#6b7280",
    surface: "#ffffff",
    cardShadow: "0 10px 30px rgba(11,92,255,0.08)",
    subtleShadow: "0 6px 18px rgba(2,6,23,0.04)",
  };

  const containerStyle = {
    padding: "24px",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    background: "#ffffff",
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

  const titleStyle = { color: theme.primary, fontSize: 22, fontWeight: 800 };

  const searchStyle = {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(14,46,124,0.06)",
    minWidth: windowWidth < 420 ? 180 : windowWidth < 768 ? Math.min(420, windowWidth * 0.45) : 340,
    width: windowWidth < 420 ? 180 : "auto",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
    background: "#fff",
  };

  const btnPrimary = {
    background: `linear-gradient(90deg, ${theme.primary}, #0066ff)`,
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: theme.cardShadow,
    whiteSpace: "nowrap",
  };

  const viewToggle = {
    display: "flex",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: theme.subtleShadow,
  };

  const pill = (active) => ({
    padding: "8px 14px",
    background: active ? theme.primary : "transparent",
    color: active ? "#fff" : theme.muted,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  });

  const tableCard = {
    background: theme.surface,
    borderRadius: 14,
    padding: 14,
    boxShadow: theme.cardShadow,
    overflowX: "auto",
  };

  const th = { textAlign: "left", padding: 14, color: "#0f172a", fontWeight: 800, fontSize: 13 };
  const td = { padding: 14, borderTop: "1px solid #f1f3f8", fontSize: 14, verticalAlign: "middle" };

  const kanbanContainerStyle = {
    display: "flex",
    gap: 14,
    overflowX: windowWidth < 1024 ? "auto" : "hidden",
    paddingTop: 8,
    flexWrap: windowWidth < 1024 ? "nowrap" : "wrap",
  };

  const kanbanColumn = {
    minWidth: windowWidth < 1024 ? 280 : "calc(20% - 14px)",
    background: "#fff",
    borderRadius: 12,
    padding: 14,
    boxShadow: theme.subtleShadow,
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
      preInspectionMedia: (newJobDraft.preInspectionMedia || []).map((m) => ({ id: m.id, url: m.url, type: m.type })),
    };

    setJobs((p) => [job, ...p]);
    // cleanup object URLs to avoid leak
    setNewJobDraft(emptyNewJob);
    setShowAddJob(false);
  }

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

  function searchServices(q) {
    const t = (q || "").trim().toLowerCase();
    if (!t) return SERVICES;
    return SERVICES.filter((s) => s.name.toLowerCase().includes(t) || s.id.toLowerCase().includes(t));
  }

  // Mark job done from table - sets stages done and timestamps and status Ready
  function markJobDone(jobId) {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        const now = new Date().toISOString();
        const stages = j.stages.map((s) => ({
          ...s,
          start: s.start || now,
          end: s.end || now,
          status: "Done",
        }));
        return { ...j, stages, status: "Ready" };
      })
    );
  }

  // ----------------- Media upload helpers -----------------
  function handleMediaChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const mapped = files.map((f) => {
      const url = URL.createObjectURL(f);
      return {
        id: `m${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        file: f,
        url,
        type: f.type.startsWith("video") ? "video" : "image",
      };
    });
    setNewJobDraft((p) => ({ ...p, preInspectionMedia: [...(p.preInspectionMedia || []), ...mapped] }));
    // reset input value (if you re-upload same file)
    e.target.value = null;
  }

  function removeNewDraftMedia(id) {
    setNewJobDraft((p) => ({ ...p, preInspectionMedia: p.preInspectionMedia.filter((m) => m.id !== id) }));
  }

  // ----------------------- Render -----------------------
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={leftHeader}>
          <div style={titleStyle}>Jobs Management</div>
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
            <FiPlus style={{ verticalAlign: "middle", marginRight: 8 }} /> Add JOB
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
                <th style={th}>Billing</th>
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
                        padding: "8px 12px",
                        borderRadius: 999,
                        background: j.status === "Delayed" ? "#fff1f2" : "#eef6ff",
                        color: j.status === "Delayed" ? "#dc2626" : theme.primary,
                        fontWeight: 800,
                        fontSize: 12,
                      }}
                    >
                      {j.status}
                    </span>
                  </td>
                  <td style={td}>
                    <div style={{ width: 220, maxWidth: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 13, color: theme.muted }}>{jobProgressPct(j)}% complete</div>
                        <div style={{ fontSize: 12, color: theme.muted }}>{fmtMinutes((jobProgressPct(j) / 100) * 60)}</div>
                      </div>
                      <div
                        style={{
                          height: 10,
                          background: "#eef2ff",
                          borderRadius: 999,
                          marginTop: 8,
                          overflow: "hidden",
                          boxShadow: "inset 0 -2px 6px rgba(2,6,23,0.02)",
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
          services: (j.services || []).map(s => ({
            description: s.name,
            qty: 1,
            charges: 0,   // user will fill
          }))
        }
      })
    }
    disabled={jobProgressPct(j) < 100}   // ✅ enable only if 100%
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
      boxShadow: jobProgressPct(j) === 100 ? "0 4px 12px rgba(16,185,129,0.3)" : "none",
    }}
  >
    Create Bill
  </button>
</td>
                  <td style={td}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        onClick={() => openJobDetails(j.id)}
                        title="View details"
                        style={{
                          padding: 8,
                          borderRadius: 10,
                          border: "1px solid rgba(11,92,255,0.08)",
                          background: "#fff",
                          cursor: "pointer",
                          boxShadow: "0 4px 12px rgba(2,6,23,0.03)",
                        }}
                        aria-label={`View ${j.id}`}
                      >
                        <FiEye />
                      </button>

                      <button
                        onClick={() => markJobDone(j.id)}
                        title="Mark done"
                        style={{
                          padding: 8,
                          borderRadius: 10,
                          border: "1px solid rgba(16,185,129,0.08)",
                          background: "#fff",
                          cursor: "pointer",
                          color: "#059669",
                          boxShadow: "0 4px 12px rgba(2,6,23,0.03)",
                        }}
                        aria-label={`Mark ${j.id} done`}
                      >
                        <FiCheckCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ padding: 40, color: theme.muted }}>
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
                  onClick={() => openJobDetails(job.id)}
                >
                  <div style={{ fontWeight: 900, fontSize: 15 }}>{job.id} • {job.customer}</div>
                  <div style={{ fontSize: 13, color: theme.muted, marginTop: 6 }}>{job.vehicle}</div>
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 13, color: "#475569" }}>{(job.services || []).map(s => s.name || s).join(", ")}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#0b5cff" }}>{jobProgressPct(job)}%</div>
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
          <div
            style={{
              width: windowWidth < 760 ? "100%" : 980,
              maxHeight: "92vh",
              overflowY: "auto", // main scroll at modal
              background: "#fff",
              borderRadius: 14,
              padding: 20,
              boxShadow: "0 20px 60px rgba(2,6,23,0.12)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexDirection: windowWidth < 600 ? "column" : "row" }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900 }}>{selectedJob.id} — {selectedJob.customer}</div>
                <div style={{ color: theme.muted, marginTop: 6 }}>{selectedJob.vehicle} • Bay: {selectedJob.bay}</div>
                <div style={{ marginTop: 8 }}>
                  <strong>Services:</strong> {(selectedJob.services || []).map(s => s.name || s).join(", ")}
                </div>
              </div>

              <div style={{ textAlign: windowWidth < 600 ? "left" : "right" }}>
                <div style={{ fontWeight: 900, color: theme.primary, fontSize: 16 }}>{selectedJob.status}</div>
                <div style={{ marginTop: 8, fontSize: 13, color: theme.muted }}>{jobProgressPct(selectedJob)}% complete</div>
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: windowWidth < 600 ? "flex-start" : "flex-end" }}>
                  <button
                    style={{ ...btnPrimary, padding: "8px 12px" }}
                    onClick={() => {
                      saveSelectedJobEdits();
                    }}
                    title="Save changes"
                  >
                    Save
                  </button>
                  <button
                    style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #eef2f7", background: "#fff" }}
                    onClick={() => setSelectedJob(null)}
                    title="Close"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            <hr style={{ margin: "16px 0", border: 0, height: 1, background: "#f1f5f9" }} />

            {/* Pre-inspection media & notes */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 900 }}>Pre-inspection</div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {selectedJob.preInspectionMedia && selectedJob.preInspectionMedia.length > 0 ? (
                  selectedJob.preInspectionMedia.map((m) => (
                    <div key={m.id} style={{ width: 120, borderRadius: 8, overflow: "hidden", background: "#f8fafc", boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
                      {m.type === "image" ? (
                        <img src={m.url} alt="pre" style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }} />
                      ) : (
                        <video src={m.url} controls style={{ width: "100%", height: 90, display: "block", objectFit: "cover" }} />
                      )}
                      <div style={{ padding: 8, fontSize: 12, color: theme.muted }}>{m.type.toUpperCase()}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: theme.muted }}>No images or videos were uploaded for pre-inspection.</div>
                )}
              </div>

              {selectedJob.preInspection ? (
                <div style={{ marginTop: 10, padding: 12, background: "#fbfdff", borderRadius: 10, border: "1px solid #eef6ff" }}>
                  <div style={{ fontWeight: 700 }}>Notes</div>
                  <div style={{ marginTop: 6, color: "#374151" }}>{selectedJob.preInspection}</div>
                </div>
              ) : null}
            </div>

            {/* Stages table */}
            <div style={{ marginTop: 6 }}>
              <div style={{ overflowX: "auto" }}>
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
                                    s.status === "In Progress" ? "#06b6d4" :
                                      s.status === "Delayed" ? "#ef4444" : "#f59e0b"
                              }} />
                              <div style={{ fontWeight: 800 }}>{s.status}</div>
                            </div>
                          </td>
                          <td style={td}>
                            <select
                              value={s.staffId || ""}
                              onChange={(e) => changeStageStaff(s.key, e.target.value || null)}
                              style={{ padding: 8, borderRadius: 8, border: "1px solid #e6edf7", minWidth: 180 }}
                            >
                              <option value="">{/* Show "Available" as placeholder */}Available</option>
                              {STAFF.map((stf) => (
                                <option key={stf.id} value={stf.id}>
                                  {stf.id} — {stf.name} {busyStaffIds.has(stf.id) ? " (Occupied)" : " (Available)"}
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
  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e6edf7", background: "#fff", cursor: "pointer", color: s.end ? "#059669" : "#0b5cff" }}
  title={s.start ? (s.end ? "Completed" : "Mark as done") : "Start stage"}
>
  {s.end ? <FiCheckCircle /> : (s.start ? "End" : "Start")}
</button>
                              <button
                                onClick={() => {
                                  const reason = window.prompt("Describe delay reason (short):");
                                  if (reason) reportDelay(s.key, reason);
                                }}
                                title="Report delay"
                                style={{ padding: 8, borderRadius: 10, border: "1px solid #ffdede", background: "#fff", cursor: "pointer" }}
                                aria-label="Report delay"
                              >
                                <FiAlertTriangle />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delay Reports */}
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Delay Reports</div>
              {selectedJob.delays.length === 0 && <div style={{ color: theme.muted }}>No delays reported.</div>}
              {selectedJob.delays.map((d, i) => {
                const st = selectedJob.stages.find((s) => s.key === d.stageKey);
                return (
                  <div key={i} style={{ padding: 12, background: "#fff7ed", borderRadius: 10, marginBottom: 10, border: "1px solid #ffe7c5" }}>
                    <div style={{ fontWeight: 800 }}>{st?.name || d.stageKey} • {new Date(d.reportedAt).toLocaleString()}</div>
                    <div style={{ color: "#92400e", marginTop: 4 }}>{d.reason}</div>
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
          <div style={{ width: windowWidth < 700 ? "100%" : 1000, maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 14, padding: 18, boxShadow: "0 20px 60px rgba(2,6,23,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>Add New JOB</div>
              <button style={{ border: "none", background: "transparent", fontSize: 20 }} onClick={() => setShowAddJob(false)} aria-label="Close add job">
                <FiX />
              </button>
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

                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <ServiceCombo onAdd={addServiceToDraft} />
                  <div style={{ marginLeft: "auto", fontSize: 13, color: theme.muted }}>
                    Available: {freeStaff.length} • Occupied: {busyStaff.length}
                  </div>
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  {newJobDraft.selectedServices.length === 0 && <div style={{ color: theme.muted }}>No services selected yet.</div>}
                  {newJobDraft.selectedServices.map((svc) => (
                    <div key={svc.id} style={{ border: "1px solid #f1f5f9", padding: 12, borderRadius: 10, background: "#fbfdff" }}>
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
                                    <option value="">Available</option>
                                    {STAFF.map((stf) => (
                                      <option key={stf.id} value={stf.id}>
                                        {stf.id} — {stf.name} {busyStaffIds.has(stf.id) ? " (Occupied)" : " (Available)"}
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

                <div style={{ marginTop: 12 }}>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input type="file" accept="image/*,video/*" multiple onChange={handleMediaChange} style={{ display: "none" }} />
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: "#fff", border: "1px solid #e6edf7" }}>
                      <FiUpload /> Upload images & videos
                    </div>
                  </label>

                  {/* previews */}
                  <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                    {newJobDraft.preInspectionMedia && newJobDraft.preInspectionMedia.length > 0 ? (
                      newJobDraft.preInspectionMedia.map((m) => (
                        <div key={m.id} style={{ width: 110, borderRadius: 8, overflow: "hidden", background: "#fff", border: "1px solid #eef2f7", position: "relative" }}>
                          <button onClick={() => removeNewDraftMedia(m.id)} title="Remove" style={{ position: "absolute", right: 6, top: 6, zIndex: 6, background: "rgba(255,255,255,0.9)", borderRadius: 8, border: "none", padding: 4, cursor: "pointer" }}>
                            <FiX />
                          </button>
                          {m.type === "image" ? (
                            <img src={m.url} alt="preview" style={{ width: "100%", height: 80, objectFit: "cover", display: "block" }} />
                          ) : (
                            <video src={m.url} controls style={{ width: "100%", height: 80, display: "block", objectFit: "cover" }} />
                          )}
                          <div style={{ padding: 8, fontSize: 11, color: theme.muted }}>{m.type.toUpperCase()}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: theme.muted }}>No media uploaded yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
              <button onClick={() => { setShowAddJob(false); setNewJobDraft(emptyNewJob); }} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e6e9f2", background: "#fff" }}>
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
        <div style={{ position: "absolute", left: 0, right: 0, top: 44, background: "#fff", borderRadius: 10, boxShadow: "0 12px 40px rgba(2,6,23,0.08)", zIndex: 40, maxHeight: 220, overflow: "auto", border: "1px solid #eef2f7" }}>
          {matches.length === 0 && <div style={{ padding: 12, color: "#6b7280" }}>No services</div>}
          {matches.map((s) => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <div style={{ fontWeight: 800 }}>{s.name}</div>
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
