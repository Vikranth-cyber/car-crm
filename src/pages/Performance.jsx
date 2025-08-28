import React, { useState } from "react";
import { FaTrophy, FaClipboardList, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

export default function Performance() {
  const [stats] = useState({
    avgJobTime: "45 mins",
    idealJobTime: "40 mins",
    reImageRate: "8%",
    qualityScore: "92%",
  });

  const [leaderboard] = useState([
    { id: "EMP001", name: "Amit Kumar", jobs: 30, quality: "95%" },
    { id: "EMP002", name: "Ravi Teja", jobs: 25, quality: "90%" },
    { id: "EMP003", name: "Priya Sharma", jobs: 28, quality: "94%" },
    { id: "EMP004", name: "Sneha Patel", jobs: 22, quality: "89%" },
    { id: "EMP005", name: "Rajesh Singh", jobs: 27, quality: "91%" },
  ]);

  const [jobs, setJobs] = useState([
    { id: "JOB001", title: "Office Setup", employee: "EMP001", status: "completed", evaluation: null },
    { id: "JOB002", title: "System Update", employee: "EMP002", status: "completed", evaluation: null },
    { id: "JOB003", title: "Network Installation", employee: "EMP003", status: "in-progress", evaluation: null },
    { id: "JOB004", title: "Printer Setup", employee: "EMP001", status: "completed", evaluation: null },
    { id: "JOB005", title: "Software Installation", employee: "EMP004", status: "completed", evaluation: null },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [evaluationForm, setEvaluationForm] = useState({
    quality: 0,
    timeliness: 0,
    professionalism: 0,
    notes: ""
  });

  const handleEvaluate = (job) => {
    if (job.status === "completed") {
      setSelectedJob(job);
      setEvaluationForm(job.evaluation || { quality: 0, timeliness: 0, professionalism: 0, notes: "" });
    }
  };

  const handleEvaluationSubmit = (e) => {
    e.preventDefault();
    if (selectedJob) {
      const updatedJobs = jobs.map(job =>
        job.id === selectedJob.id
          ? { ...job, evaluation: { ...evaluationForm, date: new Date().toLocaleDateString() } }
          : job
      );
      setJobs(updatedJobs);
      setSelectedJob(null);
      alert("Evaluation submitted successfully!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvaluationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="performance-container">
      <h2 className="title">Performance Dashboard</h2>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="card blue">
          <FaHourglassHalf size={22} className="icon" />
          <div className="label">Average Job Time</div>
          <div className="value">{stats.avgJobTime}</div>
          <div className="subtext">Ideal: {stats.idealJobTime}</div>
        </div>
        <div className="card red">
          <FaClipboardList size={22} className="icon" />
          <div className="label">Re-Image Rate</div>
          <div className="value">{stats.reImageRate}</div>
          <div className="subtext">Lower is better</div>
        </div>
        <div className="card green">
          <FaCheckCircle size={22} className="icon" />
          <div className="label">Quality Score</div>
          <div className="value">{stats.qualityScore}</div>
          <div className="subtext">Overall performance</div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="section">
        <h3 className="section-title"><FaTrophy className="icon" /> Top Performers</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Jobs Completed</th>
                <th>Quality Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.jobs}</td>
                  <td>
                    <span className={`badge ${parseInt(emp.quality) >= 94 ? "success" : "warning"}`}>
                      {emp.quality}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Evaluation */}
      <div className="section">
        <h3 className="section-title"><FaClipboardList className="icon" /> Job Evaluation</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Title</th>
                <th>Employee</th>
                <th>Status</th>
                <th>Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>{leaderboard.find(e => e.id === job.employee)?.name || job.employee}</td>
                  <td>
                    <span className={`badge ${job.status === "completed" ? "success" : "warning"}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>
                    {job.status === "completed" ? (
                      job.evaluation ? (
                        <span className="evaluated">Evaluated</span>
                      ) : (
                        <button className="btn" onClick={() => handleEvaluate(job)}>Evaluate</button>
                      )
                    ) : (
                      <span className="pending">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluation Modal */}
      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Evaluate Job: {selectedJob.title}</h3>
            <form onSubmit={handleEvaluationSubmit}>
              {["quality", "timeliness", "professionalism"].map((field) => (
                <div key={field} className="form-group">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)} (1-10):</label>
                  <input
                    type="range"
                    name={field}
                    min="1"
                    max="10"
                    value={evaluationForm[field]}
                    onChange={handleInputChange}
                  />
                  <div className="range-value">{evaluationForm[field]}/10</div>
                </div>
              ))}
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  name="notes"
                  value={evaluationForm.notes}
                  onChange={handleInputChange}
                />
              </div>
              <div className="actions">
                <button type="button" className="btn secondary" onClick={() => setSelectedJob(null)}>Cancel</button>
                <button type="submit" className="btn primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styling */}
      <style>{`
        .performance-container {
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
          background: #f9fbfd;
          min-height: 100vh;
        }
        .title {
          color: #0056b3;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 25px;
        }
        .kpi-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .card .icon { color: #007bff; margin-bottom: 8px; }
        .card.blue { border-left: 4px solid #007bff; }
        .card.red { border-left: 4px solid #e74c3c; }
        .card.green { border-left: 4px solid #28a745; }
        .label { font-size: 14px; color: #7f8c8d; }
        .value { font-size: 24px; font-weight: 600; color: #2c3e50; }
        .subtext { font-size: 12px; color: #95a5a6; }
        .section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e9ecef;
          font-size: 14px;
        }
        th { color: #2c3e50; font-weight: 600; background: #f8f9fa; }
        td { color: #495057; }
        .badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 13px;
        }
        .badge.success { background: #d4edda; color: #155724; }
        .badge.warning { background: #fff3cd; color: #856404; }
        .evaluated { color: #28a745; font-weight: 600; }
        .pending { color: #6c757d; }
        .btn {
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          border: none;
          font-size: 14px;
          font-weight: 500;
          transition: 0.3s;
        }
        .btn.primary { background: #007bff; color: white; }
        .btn.secondary { background: #6c757d; color: white; }
        .btn:hover { opacity: 0.9; }
        .modal-overlay {
          position: fixed;
          top:0; left:0; right:0; bottom:0;
          background: rgba(0,0,0,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:1000;
        }
        .modal {
          background: white;
          padding: 25px;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .form-group { margin-bottom: 15px; }
        .form-group label { font-weight: 500; margin-bottom: 5px; display: block; }
        .form-group textarea {
          width: 100%; padding: 8px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          min-height: 80px;
        }
        .range-value { text-align: right; font-size: 13px; color: #6c757d; }
        .actions { display:flex; justify-content:flex-end; gap:10px; }
        @media (max-width: 768px) {
          .title { font-size: 24px; }
          .section-title { font-size: 18px; }
          th, td { padding: 8px 10px; font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
