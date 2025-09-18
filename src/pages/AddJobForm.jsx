import React, { useEffect, useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";

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

const emptyDraft = {
  customerName: "",
  mobile: "",
  vehicle: "",
  existingVehicleList: [],
  bay: "",
  selectedServices: [], 
  preInspectionNotes: "",
  preInspectionMedia: [],
};

export default function AddJobForm({ onClose, onSave, existingJobs = [] }) {
  const [newJobDraft, setNewJobDraft] = useState(emptyDraft);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  const busyStaffIds = React.useMemo(() => {
    const s = new Set();
    (existingJobs || []).forEach((j) => {
      if (j.staffAssigned) s.add(j.staffAssigned);
      (j.stages || []).forEach((st) => {
        if (st.staffId) s.add(st.staffId);
      });
    });
    return s;
  }, [existingJobs]);

  const freeStaff = STAFF.filter((s) => !busyStaffIds.has(s.id));
  const busyStaff = STAFF.filter((s) => busyStaffIds.has(s.id));

  useEffect(() => {
    function onResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
      const j = (existingJobs || []).find((job) => job.mobile === mobile);
      if (j) {
        setNewJobDraft((p) => ({
          ...p,
          customerName: j.customer,
          existingVehicleList: (existingJobs || []).filter((x) => x.mobile === mobile).map((x) => x.vehicle),
          vehicle: (existingJobs || []).find((x) => x.mobile === mobile)?.vehicle || "",
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
    e.target.value = null;
  }

  function removeNewDraftMedia(id) {
    setNewJobDraft((p) => ({ ...p, preInspectionMedia: p.preInspectionMedia.filter((m) => m.id !== id) }));
  }

  function createNewJob() {
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
      stages: newStages.length
        ? newStages
        : [{ key: `s${Date.now()}_0`, name: "Check-in", status: "Waiting", staffId: null, start: null, end: null }],
      delays: [],
      preInspection: newJobDraft.preInspectionNotes || "",
      preInspectionMedia: (newJobDraft.preInspectionMedia || []).map((m) => ({ id: m.id, url: m.url, type: m.type })),
    };
    onSave && onSave(job);
    setNewJobDraft(emptyDraft);
    onClose && onClose();
  }

  const theme = {
    primary: "#00aaff",
    muted: "#6b7280",
  };
  const btnPrimary = {
    background: `linear-gradient(90deg, ${theme.primary}, #0066ff)`,
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(11,92,255,0.08)",
    whiteSpace: "nowrap",
  };
  const th = { textAlign: "left", padding: 14, color: "#0f172a", fontWeight: 800, fontSize: 13 };
  const td = { padding: 14, borderTop: "1px solid #f1f3f8", fontSize: 14, verticalAlign: "middle" };

  return (
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
      <div
        style={{
          width: windowWidth < 700 ? "100%" : 1000,
          maxHeight: "92vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 14,
          padding: 18,
          boxShadow: "0 20px 60px rgba(2,6,23,0.12)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>Add New JOB</div>
          <button style={{ border: "none", background: "transparent", fontSize: 20 }} onClick={() => onClose && onClose()} aria-label="Close add job">
            <FiX />
          </button>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: windowWidth < 900 ? "1fr" : "1fr 1fr", gap: 14 }}>
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

       
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <button
            onClick={() => {
              setNewJobDraft(emptyDraft);
              onClose && onClose();
            }}
            style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e6e9f2", background: "#fff" }}
          >
            Cancel
          </button>
          <button onClick={createNewJob} style={btnPrimary}>
            Create JOB
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCombo({ onAdd }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const matches = (q.trim() ? SERVICES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())) : SERVICES);

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
            const exact = SERVICES.find((s) => s.id.toLowerCase() === q.trim().toLowerCase() || s.name.toLowerCase() === q.trim().toLowerCase());
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
