import React, { useState } from "react";

export default function Reports() {
  const [reports] = useState([
    { id: 1, name: "EoD Sales Report", date: "2025-08-24", type: "Sales" },
    { id: 2, name: "Job Duration Report", date: "2025-08-24", type: "Operations" },
    { id: 3, name: "Inventory Usage Report", date: "2025-08-24", type: "Inventory" },
    { id: 4, name: "Customer Ratings Report", date: "2025-08-24", type: "Customer Feedback" },
    { id: 5, name: "Re-Image Tracker Report", date: "2025-08-24", type: "Operations" },
    { id: 6, name: "Weekly Sales Conversion Ratios", date: "2025-08-24", type: "Sales" },
  ]);

  const [scheduleModal, setScheduleModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [emailData, setEmailData] = useState({
    frequency: "weekly",
    recipients: "",
    time: "09:00",
    dayOfWeek: "monday"
  });

  const handleExport = (format) => {
    alert(`Exporting to ${format.toUpperCase()} format`);
  };

  const handleSchedule = (report) => {
    setSelectedReport(report);
    setScheduleModal(true);
  };

  const submitSchedule = () => {
    alert(`Scheduled ${selectedReport.name} to be sent ${emailData.frequency} to ${emailData.recipients}`);
    setScheduleModal(false);
    setEmailData({
      frequency: "weekly",
      recipients: "",
      time: "09:00",
      dayOfWeek: "monday"
    });
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Reports Dashboard</h2>
      
      <div style={buttonGroupStyle}>
        <button style={primaryButtonStyle} onClick={() => handleExport('csv')}>
          Export CSV
        </button>
        <button style={primaryButtonStyle} onClick={() => handleExport('pdf')}>
          Export PDF
        </button>
      </div>

      <div style={cardContainerStyle}>
        {reports.map(report => (
          <div key={report.id} style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={cardTitleStyle}>{report.name}</h3>
              <span style={badgeStyle}>{report.type}</span>
            </div>
            <p style={cardDateStyle}>Generated: {report.date}</p>
            <div style={cardActionsStyle}>
              <button style={secondaryButtonStyle} onClick={() => handleExport('csv')}>Download</button>
              <button style={tertiaryButtonStyle} onClick={() => handleSchedule(report)}>Schedule</button>
            </div>
          </div>
        ))}
      </div>

      {scheduleModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalHeaderStyle}>Schedule Report: {selectedReport?.name}</h3>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Frequency</label>
              <select
                style={inputStyle}
                value={emailData.frequency}
                onChange={(e) => setEmailData({...emailData, frequency: e.target.value})}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {emailData.frequency === "weekly" && (
              <div style={formGroupStyle}>
                <label style={labelStyle}>Day of Week</label>
                <select
                  style={inputStyle}
                  value={emailData.dayOfWeek}
                  onChange={(e) => setEmailData({...emailData, dayOfWeek: e.target.value})}
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                </select>
              </div>
            )}

            <div style={formGroupStyle}>
              <label style={labelStyle}>Time</label>
              <input
                type="time"
                style={inputStyle}
                value={emailData.time}
                onChange={(e) => setEmailData({...emailData, time: e.target.value})}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Recipients</label>
              <input
                type="text"
                style={inputStyle}
                value={emailData.recipients}
                onChange={(e) => setEmailData({...emailData, recipients: e.target.value})}
                placeholder="email1@example.com, email2@example.com"
              />
            </div>

            <div style={modalActionsStyle}>
              <button style={cancelButtonStyle} onClick={() => setScheduleModal(false)}>Cancel</button>
              <button style={confirmButtonStyle} onClick={submitSchedule}>Schedule Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  padding: '1.5rem',
  backgroundColor: '#fff',
  minHeight: '100vh',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxSizing: 'border-box'
};

const headerStyle = {
  color: '#007BFF',
  marginBottom: '1.5rem',
  fontWeight: '700',
  fontSize: '1.8rem',
  textAlign: 'center'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '2rem',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

const primaryButtonStyle = {
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer'
};

const secondaryButtonStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  border: '1px solid #007BFF',
  backgroundColor: 'transparent',
  color: '#007BFF',
  fontWeight: '500',
  cursor: 'pointer'
};

const tertiaryButtonStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  border: '1px solid #95a5a6',
  backgroundColor: 'transparent',
  color: '#7f8c8d',
  fontWeight: '500',
  cursor: 'pointer'
};

const cardContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1.5rem',
  justifyContent: 'center'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '1.5rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column'
};

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem'
};

const cardTitleStyle = {
  margin: '0',
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#2c3e50',
  flex: 1
};

const badgeStyle = {
  backgroundColor: '#ecf0f1',
  color: '#7f8c8d',
  padding: '0.25rem 0.5rem',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: '600',
  marginLeft: '0.5rem'
};

const cardDateStyle = {
  color: '#95a5a6',
  fontSize: '0.9rem',
  margin: '0 0 1.5rem 0'
};

const cardActionsStyle = {
  display: 'flex',
  gap: '0.5rem',
  marginTop: 'auto'
};

// Modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '1rem'
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  width: '100%',
  maxWidth: '500px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
};

const modalHeaderStyle = {
  margin: '0 0 1.5rem 0',
  color: '#2c3e50',
  fontSize: '1.4rem',
  fontWeight: '600'
};

const formGroupStyle = { marginBottom: '1.2rem' };

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '500',
  color: '#34495e'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const modalActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '1.5rem',
  flexWrap: 'wrap'
};

const cancelButtonStyle = {
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  border: '1px solid #95a5a6',
  backgroundColor: 'transparent',
  color: '#7f8c8d',
  fontWeight: '600',
  cursor: 'pointer'
};

const confirmButtonStyle = {
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer'
};
