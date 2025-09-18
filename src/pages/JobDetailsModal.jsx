// src/pages/JobDetailsModal.jsx
import React from "react";
import { FiX } from "react-icons/fi";

export default function JobDetailsModal({ job, onClose, staff }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 20, width: "80%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{job.id} — {job.customer}</h2>
          <button onClick={onClose}><FiX /></button>
        </div>
        <p>{job.vehicle} • Bay: {job.bay}</p>
        <p>Status: {job.status}</p>
        <h3>Stages</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Status</th>
              <th>Staff</th>
            </tr>
          </thead>
          <tbody>
            {job.stages.map((s) => (
              <tr key={s.key}>
                <td>{s.name}</td>
                <td>{s.status}</td>
                <td>{s.staffId ? staff.find((st) => st.id === s.staffId)?.name : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Pre-inspection Notes</h3>
        <p>{job.preInspection || "No notes"}</p>
      </div>
    </div>
  );
}
