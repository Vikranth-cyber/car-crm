// Schedule.jsx
import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiPlusCircle,
  FiAlertTriangle,
  FiTruck,
  FiSave,
  FiMenu,
  FiX
} from "react-icons/fi";

export default function Schedule() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      vehicleModel: "Hyundai Creta",
      service: "Full Car Cleaning",
      date: "2025-08-25",
      time: "10:00 AM",
      priority: "Normal",
      location: "Main Center",
      status: "Confirmed"
    },
  ]);

  const [waitlist, setWaitlist] = useState([
    {
      id: 1,
      customer: "Priya Patel",
      vehicleModel: "Honda City",
      service: "Interior Cleaning",
      date: "2025-08-25",
      time: "11:00 AM",
      priority: "Normal",
      location: "Main Center",
      status: "Waitlisted"
    },
  ]);

  const [form, setForm] = useState({
    customer: "",
    vehicleModel: "",
    service: "",
    date: "",
    time: "",
    priority: "Normal",
    location: "Main Center",
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [locations] = useState(["Main Center", "East Branch", "West Branch"]);
  const [services] = useState([
    "Basic Wash",
    "Premium Wash",
    "Interior Cleaning",
    "Full Service",
    "Engine Cleaning",
    "Polishing"
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Checking for updates...");
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addBooking = () => {
    const conflict = bookings.find(
      (b) =>
        b.date === form.date &&
        b.time === form.time &&
        b.location === form.location
    );
    if (conflict) {
      alert("Booking conflict! This location is already occupied at the selected time.");
      return;
    }
    setBookings([...bookings, { 
      id: bookings.length + 1, 
      ...form,
      status: "Confirmed"
    }]);
    resetForm();
    alert("Booking added successfully!");
  };

  const addToWaitlist = () => {
    setWaitlist([...waitlist, { 
      id: waitlist.length + 1, 
      ...form,
      status: "Waitlisted"
    }]);
    resetForm();
    alert("Added to waitlist!");
  };

  const resetForm = () =>
    setForm({
      customer: "",
      vehicleModel: "",
      service: "",
      date: "",
      time: "",
      priority: "Normal",
      location: "Main Center",
    });

  const promoteFromWaitlist = (waitlistItem) => {
    setBookings([...bookings, { ...waitlistItem, id: bookings.length + 1, status: "Confirmed" }]);
    setWaitlist(waitlist.filter((item) => item.id !== waitlistItem.id));
  };

  // 🎨 Responsive Styling
  const containerStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px"
  };

  const titleStyle = {
    color: "#00aaff",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: isMobile ? "1.5rem" : "1.8rem"
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "14px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    padding: isMobile ? "15px" : "25px",
    marginBottom: "25px",
    width: "100%",
    overflowX: "auto",
    boxSizing: "border-box"
  };

  const centeredCardStyle = {
    ...cardStyle,
    margin: "0 auto 25px auto",
    maxWidth: "1200px",
  };

  const buttonStyle = {
    backgroundColor: "#00aaff",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    margin: "5px",
    transition: "background-color 0.2s",
    fontSize: isMobile ? "14px" : "inherit"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    width: "100%",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: isMobile ? "12px" : "14px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const thStyle = {
    padding: isMobile ? "10px 8px" : "14px 12px",
    textAlign: "left",
    backgroundColor: "#00aaff",
    color: "white",
    fontWeight: "600",
    fontSize: isMobile ? "12px" : "14px",
    whiteSpace: isMobile ? "nowrap" : "normal"
  };

  const tdStyle = {
    padding: isMobile ? "8px" : "12px",
    borderBottom: "1px solid #f0f0f0",
    fontSize: isMobile ? "12px" : "inherit"
  };

  const priorityStyle = (priority) => {
    const baseStyle = {
      padding: isMobile ? "8px" : "12px",
      borderBottom: "1px solid #f0f0f0",
      fontSize: isMobile ? "12px" : "inherit"
    };
    
    switch (priority) {
      case "Emergency":
        return { ...baseStyle, backgroundColor: "#ffebee", fontWeight: "bold", color: "#c62828" };
      case "High":
        return { ...baseStyle, backgroundColor: "#fff3e0", color: "#ef6c00" };
      default:
        return baseStyle;
    }
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
    marginBottom: "20px"
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: isMobile ? "center" : "flex-start"
  };

  const submitBtn = {
    background: "#00aaff",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    marginTop: "10px",
    justifyContent: "center",
    width: isMobile ? "100%" : "auto"
  };

  const labelStyle = {
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: 600,
    color: "#2c3e50",
  };

  const inputGroup = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const mobileMenuButton = {
    display: isMobile ? "block" : "none",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#00aaff"
  };

  const statusBadgeStyle = (status) => ({
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: isMobile ? "10px" : "12px",
    fontWeight: "bold",
    backgroundColor: status === "Confirmed" ? "#e8f5e9" : "#fff3e0",
    color: status === "Confirmed" ? "#2e7d32" : "#f57c00",
    display: "inline-block",
    whiteSpace: "nowrap"
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          <FiCalendar /> Schedule Dashboard
        </h2>
        <button 
          style={mobileMenuButton} 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* New Booking Form - Always visible on desktop, conditionally on mobile */}
      <div style={{display: isMobile && !showMobileMenu ? "none" : "block"}}>
        <div style={centeredCardStyle}>
          <h3 style={{color: "#00aaff", display: "flex", alignItems: "center", gap: "8px", marginTop: 0}}>
            <FiPlusCircle /> New Booking
          </h3>
          <div style={formGridStyle}>
            <div style={inputGroup}>
              <label style={labelStyle}>Customer Name</label>
              <input 
                name="customer" 
                placeholder="Enter customer name" 
                value={form.customer} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Vehicle Model</label>
              <input 
                name="vehicleModel" 
                placeholder="Enter vehicle model" 
                value={form.vehicleModel} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Service</label>
              <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </div>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Date</label>
              <input 
                type="date" 
                name="date" 
                value={form.date} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Time</label>
              <input 
                type="time" 
                name="time" 
                value={form.time} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} style={inputStyle}>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Location</label>
              <select name="location" value={form.location} onChange={handleChange} style={inputStyle}>
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={buttonContainerStyle}>
            <button onClick={addBooking} style={submitBtn}>
              <FiSave /> Save Booking
            </button>
            <button onClick={addToWaitlist} style={{...secondaryButtonStyle, width: isMobile ? "100%" : "auto"}}>
              Add to Waitlist
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table - Always visible on desktop, conditionally on mobile */}
      <div style={{display: isMobile && showMobileMenu ? "none" : "block"}}>
        <div style={centeredCardStyle}>
          <h3 style={{color: "#00aaff", display: "flex", alignItems: "center", gap: "8px", marginTop: 0}}>
            <FiTruck /> All Bookings
          </h3>
          <div style={{overflowX: "auto"}}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Customer</th>
                  {!isMobile && <th style={thStyle}>Vehicle Model</th>}
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Time</th>
                  {!isMobile && <th style={thStyle}>Priority</th>}
                  {!isMobile && <th style={thStyle}>Location</th>}
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td style={priorityStyle(b.priority)}>{b.customer}</td>
                    {!isMobile && <td style={priorityStyle(b.priority)}>{b.vehicleModel}</td>}
                    <td style={priorityStyle(b.priority)}>{isMobile ? b.service.substring(0, 15) + (b.service.length > 15 ? "..." : "") : b.service}</td>
                    <td style={priorityStyle(b.priority)}>{b.date}</td>
                    <td style={priorityStyle(b.priority)}>{b.time}</td>
                    {!isMobile && <td style={priorityStyle(b.priority)}>{b.priority}</td>}
                    {!isMobile && <td style={priorityStyle(b.priority)}>{b.location}</td>}
                    <td style={priorityStyle(b.priority)}>
                      <span style={statusBadgeStyle(b.status)}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Waitlist */}
        <div style={centeredCardStyle}>
          <h3 style={{color: "#00aaff", display: "flex", alignItems: "center", gap: "8px", marginTop: 0}}>
            <FiAlertTriangle /> Waitlist
          </h3>
          {waitlist.length === 0 ? (
            <p>No waitlist entries</p>
          ) : (
            <div style={{overflowX: "auto"}}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Customer</th>
                    {!isMobile && <th style={thStyle}>Vehicle Model</th>}
                    <th style={thStyle}>Service</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Time</th>
                    {!isMobile && <th style={thStyle}>Priority</th>}
                    {!isMobile && <th style={thStyle}>Location</th>}
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.map((w) => (
                    <tr key={w.id}>
                      <td style={priorityStyle(w.priority)}>{w.customer}</td>
                      {!isMobile && <td style={priorityStyle(w.priority)}>{w.vehicleModel}</td>}
                      <td style={priorityStyle(w.priority)}>{isMobile ? w.service.substring(0, 15) + (w.service.length > 15 ? "..." : "") : w.service}</td>
                      <td style={priorityStyle(w.priority)}>{w.date}</td>
                      <td style={priorityStyle(w.priority)}>{w.time}</td>
                      {!isMobile && <td style={priorityStyle(w.priority)}>{w.priority}</td>}
                      {!isMobile && <td style={priorityStyle(w.priority)}>{w.location}</td>}
                      <td style={priorityStyle(w.priority)}>
                        <button onClick={() => promoteFromWaitlist(w)} style={{...buttonStyle, padding: "6px 12px", fontSize: isMobile ? "12px" : "13px"}}>
                          Promote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation hint */}
      {isMobile && (
        <div style={{textAlign: "center", marginTop: "20px", color: "#666", fontSize: "14px"}}>
          {showMobileMenu ? "View bookings and waitlist" : "Add new booking"}
        </div>
      )}
    </div>
  );
}