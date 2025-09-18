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
    workPerformance: 0,
    workQuality: 0,
    skills: 0,
    knowledge: 0,
    attendance: 0,
    punctuality: 0,
    consistency: 0,
    honesty: 0,
    initiative: 0,
    attitude: 0,
    creativity: 0,
    dependability: 0,
    productivity: 0,
    managerialSkills: 0,
    interpersonalSkills: 0,
    communicationSkills: 0,
    abilityToLead: 0,
    abilityToFollow: 0,
    abilityToWorkInGroups: 0,
    abilityToSetGoals: 0,
    abilityToFollowThrough: 0,
    abilityToMultitask: 0,
    abilityToWorkOnDeadline: 0,
    reviewerComments: "",
    employeeComments: ""
  });

  const handleEvaluate = (job) => {
    if (job.status === "completed") {
      setSelectedJob(job);
      setEvaluationForm(job.evaluation || {
        workPerformance: 0,
        workQuality: 0,
        skills: 0,
        knowledge: 0,
        attendance: 0,
        punctuality: 0,
        consistency: 0,
        honesty: 0,
        initiative: 0,
        attitude: 0,
        creativity: 0,
        dependability: 0,
        productivity: 0,
        managerialSkills: 0,
        interpersonalSkills: 0,
        communicationSkills: 0,
        abilityToLead: 0,
        abilityToFollow: 0,
        abilityToWorkInGroups: 0,
        abilityToSetGoals: 0,
        abilityToFollowThrough: 0,
        abilityToMultitask: 0,
        abilityToWorkOnDeadline: 0,
        reviewerComments: "",
        employeeComments: ""
      });
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

  const evaluationCategories = [
    { title: "Core Competencies", fields: [
      "workPerformance", "workQuality", "skills", "knowledge", 
      "attendance", "punctuality", "consistency", "honesty"
    ]},
    { title: "Personal Attributes", fields: [
      "initiative", "attitude", "creativity", "dependability", 
      "productivity"
    ]},
    { title: "Skills Assessment", fields: [
      "managerialSkills", "interpersonalSkills", "communicationSkills", 
      "abilityToLead", "abilityToFollow", "abilityToWorkInGroups"
    ]},
    { title: "Performance Metrics", fields: [
      "abilityToSetGoals", "abilityToFollowThrough", 
      "abilityToMultitask", "abilityToWorkOnDeadline"
    ]}
  ];

  const getFieldLabel = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="performance-container">
      <h2 className="title">Performance Dashboard</h2>

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

      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal evaluation-modal">
            <h3 className="modal-title">Evaluate Job: {selectedJob.title}</h3>
            <form onSubmit={handleEvaluationSubmit}>
              <div className="evaluation-form">
                <div className="form-header">
                  <span>Employee: {leaderboard.find(e => e.id === selectedJob.employee)?.name || selectedJob.employee}</span>
                  <span>Date: {new Date().toLocaleDateString()}</span>
                </div>
                
                {evaluationCategories.map((category, index) => (
                  <div key={index} className="evaluation-category">
                    <h4 className="category-title">{category.title}</h4>
                    <table className="evaluation-table">
                      <thead>
                        <tr>
                          <th>Aspect</th>
                          <th>Poor</th>
                          <th>Below Avg</th>
                          <th>Average</th>
                          <th>Good</th>
                          <th>Excellent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.fields.map((field) => (
                          <tr key={field}>
                            <td className="aspect-label">{getFieldLabel(field)}</td>
                            {[1, 2, 3, 4, 5].map((value) => (
                              <td key={value}>
                                <input
                                  type="radio"
                                  name={field}
                                  value={value}
                                  checked={parseInt(evaluationForm[field]) === value}
                                  onChange={handleInputChange}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
                
                <div className="comments-section">
                  <div className="form-group">
                    <label>Reviewer Comments:</label>
                    <textarea
                      name="reviewerComments"
                      value={evaluationForm.reviewerComments}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Employee Comments:</label>
                    <textarea
                      name="employeeComments"
                      value={evaluationForm.employeeComments}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  </div>
                </div>
              </div>
              <div className="actions">
                <button type="button" className="btn secondary" onClick={() => setSelectedJob(null)}>Cancel</button>
                <button type="submit" className="btn primary">Submit Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        body {
          background-color: white;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          color: #333;
        }
        
        .performance-container {
          padding: 20px;
          background: white;
          min-height: 100vh;
          color: #333;
        }
        
        .title {
          color: #00aaff;
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
          border: 1px solid #e0e0e0;
        }
        
        .card .icon { 
          color: #00aaff; 
          margin-bottom: 8px; 
        }
        
        .card.blue { border-left: 4px solid #00aaff; }
        .card.red { border-left: 4px solid #e74c3c; }
        .card.green { border-left: 4px solid #28a745; }
        
        .label { 
          font-size: 14px; 
          color: #666; 
        }
        
        .value { 
          font-size: 24px; 
          font-weight: 600; 
          color: #2c3e50; 
        }
        
        .subtext { 
          font-size: 12px; 
          color: #888; 
        }
        
        .section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          border: 1px solid #e0e0e0;
        }
        
        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #00aaff;
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
        
        th { 
          color: #00aaff; 
          font-weight: 600; 
          background: #f8f9fa; 
        }
        
        td { 
          color: #333; 
        }
        
        .badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 13px;
        }
        
        .badge.success { 
          background: #d4edda; 
          color: #155724; 
        }
        
        .badge.warning { 
          background: #fff3cd; 
          color: #856404; 
        }
        
        .evaluated { 
          color: #28a745; 
          font-weight: 600; 
        }
        
        .pending { 
          color: #6c757d; 
        }
        
        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          border: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .btn.primary { 
          background: #00aaff; 
          color: white; 
        }
        
        .btn.secondary { 
          background: #6c757d; 
          color: white; 
        }
        
        .btn:hover { 
          opacity: 0.9; 
          transform: translateY(-2px);
        }
        
        .modal-overlay {
          position: fixed;
          top:0; 
          left:0; 
          right:0; 
          bottom:0;
          background: rgba(0,0,0,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:1000;
          padding: 20px;
          overflow-y: auto;
        }
        
        .modal {
          background: white;
          padding: 25px;
          border-radius: 12px;
          width: 90%;
          max-width: 1000px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.3);
          border: 1px solid #e0e0e0;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-title {
          color: #00aaff;
          margin-bottom: 20px;
          font-size: 22px;
        }
        
        .evaluation-form {
          margin-bottom: 20px;
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 500;
        }
        
        .evaluation-category {
          margin-bottom: 25px;
        }
        
        .category-title {
          color: #00aaff;
          margin-bottom: 15px;
          font-size: 18px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .evaluation-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        
        .evaluation-table th {
          background-color: #f0f7ff;
          text-align: center;
          padding: 10px 5px;
          font-size: 12px;
        }
        
        .evaluation-table td {
          text-align: center;
          padding: 8px 5px;
        }
        
        .aspect-label {
          text-align: left;
          font-weight: 500;
          color: #333;
        }
        
        .comments-section {
          margin-top: 25px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #00aaff;
        }
        
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-family: inherit;
        }
        
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 15px;
          border-top: 1px solid #e0e0e0;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .performance-container {
            padding: 15px;
          }
          
          .kpi-cards {
            grid-template-columns: 1fr;
          }
          
          table {
            font-size: 12px;
          }
          
          th, td {
            padding: 8px 10px;
          }
          
          .modal {
            padding: 15px;
            width: 95%;
          }
          
          .evaluation-table {
            display: block;
            overflow-x: auto;
          }
          
          .evaluation-table th:nth-child(n+2),
          .evaluation-table td:nth-child(n+2) {
            min-width: 60px;
          }
          
          .form-header {
            flex-direction: column;
            gap: 10px;
          }
        }
        
        @media (max-width: 480px) {
          .title {
            font-size: 24px;
          }
          
          .section {
            padding: 15px;
          }
          
          .actions {
            flex-direction: column;
          }
          
          .actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}