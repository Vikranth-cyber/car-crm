import React, { useState, useEffect } from "react";

export default function Reports() {
  const [reports] = useState([
    { id: 1, name: "Daily Sales Report", date: "2025-08-24", type: "Sales" },
    { id: 2, name: "Job Duration Report", date: "2025-08-24", type: "Operations" },
    { id: 3, name: "Jobs Completed Report", date: "2025-08-24", type: "Operations" },
    { id: 4, name: "Custom Sales Report", date: "2025-08-24", type: "Sales" },
  ]);

  const [scheduleModal, setScheduleModal] = useState(false);
  const [customDateModal, setCustomDateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [emailData, setEmailData] = useState({
    frequency: "weekly",
    recipients: "",
    time: "09:00",
    dayOfWeek: "monday"
  });
  
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  
  const [gridColumns, setGridColumns] = useState("1fr");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setGridColumns("repeat(2, 1fr)");
      } else {
        setGridColumns("1fr"); 
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExport = (report, format) => {
    alert(`Exporting ${report.name} to ${format.toUpperCase()} format`);
  };

  const handleSchedule = (report) => {
    setSelectedReport(report);
    setScheduleModal(true);
  };
  
  const handleCustomDate = (report) => {
    setSelectedReport(report);
    setCustomDateModal(true);
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
  
  const generateCustomReport = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert("Please select both start and end dates");
      return;
    }
    
    alert(`Generating custom ${selectedReport.name} from ${dateRange.startDate} to ${dateRange.endDate}`);
    setCustomDateModal(false);
    setDateRange({
      startDate: "",
      endDate: ""
    });
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Reports Dashboard</h2>
      
      <div style={{ ...cardContainerStyle, gridTemplateColumns: gridColumns }}>
        {reports.map(report => (
          <div key={report.id} style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={cardTitleStyle}>{report.name}</h3>
              <span style={badgeStyle}>{report.type}</span>
            </div>
            <p style={cardDateStyle}>Generated: {report.date}</p>
            
            <div style={cardActionsStyle}>
              <button style={generateButtonStyle} onClick={() => 
                report.name === "Custom Sales Report" ? handleCustomDate(report) : handleExport(report, 'csv')
              }>
                Generate
              </button>
              
              <button 
                style={pdfButtonStyle} 
                onClick={() => handleExport(report, 'pdf')}
              >
                Generate as PDF
              </button>
              
              <button style={scheduleButtonStyle} onClick={() => handleSchedule(report)}>
                <svg style={iconStyle} viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
                </svg>
                Schedule
              </button>
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
      
      {customDateModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalHeaderStyle}>Custom Date Range: {selectedReport?.name}</h3>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Start Date</label>
              <input
                type="date"
                style={inputStyle}
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>End Date</label>
              <input
                type="date"
                style={inputStyle}
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>

            <div style={modalActionsStyle}>
              <button style={cancelButtonStyle} onClick={() => setCustomDateModal(false)}>Cancel</button>
              <button style={confirmButtonStyle} onClick={generateCustomReport}>Generate Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  padding: '2rem',
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxSizing: 'border-box'
};

const headerStyle = {
  color: '#00aaff',
  marginBottom: '2rem',
  fontWeight: '700',
  fontSize: '2rem',
  textAlign: 'center'
};

const cardContainerStyle = {
  display: 'grid',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  minHeight: '220px',
  border: '1px solid #eaeaea'
};

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1.2rem'
};

const cardTitleStyle = {
  margin: '0',
  fontSize: '1.4rem',
  fontWeight: '600',
  color: '#00aaff',
  flex: 1
};

const badgeStyle = {
  backgroundColor: '#ecf0f1',
  color: '#7f8c8d',
  padding: '0.4rem 0.8rem',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: '600',
  marginLeft: '0.8rem'
};

const cardDateStyle = {
  color: '#95a5a6',
  fontSize: '0.95rem',
  margin: '0 0 2rem 0'
};

const cardActionsStyle = {
  display: 'flex',
  gap: '0.8rem',
  marginTop: 'auto',
  alignItems: 'center',
  flexWrap: 'wrap'
};

const generateButtonStyle = {
  padding: '0.7rem 1.4rem',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#00aaff',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexShrink: 0
};

const pdfButtonStyle = {
  padding: '0.7rem 1.2rem',
  borderRadius: '6px',
  border: '1px solid #e74c3c',
  backgroundColor: 'transparent',
  color: '#e74c3c',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const scheduleButtonStyle = {
  padding: '0.6rem 1rem',
  borderRadius: '6px',
  border: '1px solid #ddd',
  backgroundColor: 'transparent',
  color: '#7f8c8d',
  fontWeight: '500',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginLeft: 'auto'
};

const iconStyle = {
  display: 'block'
};

// Modal styles
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
  padding: '2.5rem',
  width: '100%',
  maxWidth: '500px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
};

const modalHeaderStyle = {
  margin: '0 0 1.8rem 0',
  color: '#00aaff',
  fontSize: '1.5rem',
  fontWeight: '600'
};

const formGroupStyle = { 
  marginBottom: '1.5rem' 
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.6rem',
  fontWeight: '500',
  color: '#34495e'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: '6px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const modalActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '2rem',
  flexWrap: 'wrap'
};

const cancelButtonStyle = {
  padding: '0.8rem 1.6rem',
  borderRadius: '6px',
  border: '1px solid #95a5a6',
  backgroundColor: 'transparent',
  color: '#7f8c8d',
  fontWeight: '600',
  cursor: 'pointer'
};

const confirmButtonStyle = {
  padding: '0.8rem 1.6rem',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer'
};
