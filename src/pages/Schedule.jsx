// Schedule.jsx
import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPlusCircle,
  FiAlertTriangle,
  FiSettings,
  FiTruck,
} from "react-icons/fi";

export default function Schedule() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      vehicle: "MH12AB1234",
      service: "Full Car Cleaning",
      date: "2025-08-25",
      time: "10:00 AM",
      bay: "Bay 1",
      priority: "Normal",
      location: "Main Center",
    },
  ]);

  const [waitlist, setWaitlist] = useState([
    {
      id: 1,
      customer: "Priya Patel",
      vehicle: "MH01CD5678",
      service: "Interior Cleaning",
      date: "2025-08-25",
      time: "11:00 AM",
      priority: "Normal",
      location: "Main Center",
    },
  ]);

  const [form, setForm] = useState({
    customer: "",
    vehicle: "",
    service: "",
    date: "",
    time: "",
    bay: "",
    priority: "Normal",
    location: "Main Center",
  });

  const [view, setView] = useState("day");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedBay, setSelectedBay] = useState("all");
  const [locations] = useState(["Main Center", "East Branch", "West Branch"]);

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
        b.bay === form.bay &&
        b.location === form.location
    );
    if (conflict) {
      alert("Booking conflict! This bay is already occupied at the selected time.");
      return;
    }
    setBookings([...bookings, { id: bookings.length + 1, ...form }]);
    resetForm();
  };

  const addToWaitlist = () => {
    setWaitlist([...waitlist, { id: waitlist.length + 1, ...form }]);
    resetForm();
    alert("Added to waitlist!");
  };

  const resetForm = () =>
    setForm({
      customer: "",
      vehicle: "",
      service: "",
      date: "",
      time: "",
      bay: "",
      priority: "Normal",
      location: "Main Center",
    });

  const promoteFromWaitlist = (waitlistItem) => {
    setBookings([...bookings, { ...waitlistItem, id: bookings.length + 1 }]);
    setWaitlist(waitlist.filter((item) => item.id !== waitlistItem.id));
  };

  const getBays = () => ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Bay 5"];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // 🎨 Styling
  const containerStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "20px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "20px",
    gap: "15px"
  };

  const titleStyle = {
    color: "#007BFF",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "14px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    padding: "25px",
    marginBottom: "25px",
    width: "100%",
    overflowX: "auto",
  };

  const centeredCardStyle = {
    ...cardStyle,
    margin: "0 auto 25px auto",
    maxWidth: "1200px",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    margin: "5px",
    transition: "background-color 0.2s",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    minWidth: "140px",
    flex: "1",
    fontSize: "14px"
  };

  const dateSelectorStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap"
  };

  const dateButtonStyle = (isSelected) => ({
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: isSelected ? "#007BFF" : "#f0f0f0",
    color: isSelected ? "white" : "#333",
    cursor: "pointer",
    fontWeight: isSelected ? "600" : "400",
    transition: "all 0.2s"
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    fontSize: "14px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const thStyle = {
    padding: "14px 12px",
    textAlign: "left",
    backgroundColor: "#007BFF",
    color: "white",
    position: "sticky",
    top: "0",
    fontWeight: "600",
    fontSize: "14px"
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #f0f0f0",
  };

  const priorityStyle = (priority) => {
    const baseStyle = {
      padding: "12px",
      borderBottom: "1px solid #f0f0f0",
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
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
    marginBottom: "20px"
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          <FiCalendar /> Schedule Dashboard
        </h2>
        
        <div style={dateSelectorStyle}>
          <button 
            style={dateButtonStyle(selectedDate === new Date().toISOString().split("T")[0])}
            onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
          >
            Today ({formatDate(new Date().toISOString().split("T")[0])})
          </button>
          <button 
            style={dateButtonStyle(selectedDate === new Date(Date.now() + 86400000).toISOString().split("T")[0])}
            onClick={() => setSelectedDate(new Date(Date.now() + 86400000).toISOString().split("T")[0])}
          >
            Tomorrow ({formatDate(new Date(Date.now() + 86400000).toISOString().split("T")[0])})
          </button>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{...inputStyle, minWidth: "150px"}}
          />
        </div>
      </div>

      {/* Add Booking Form */}
      <div style={centeredCardStyle}>
        <h3 style={{color: "#007BFF", display: "flex", alignItems: "center", gap: "8px", marginTop: 0}}>
          <FiPlusCircle /> Add Booking
        </h3>
        <div style={formGridStyle}>
          <input name="customer" placeholder="Customer" value={form.customer} onChange={handleChange} style={inputStyle} />
          <input name="vehicle" placeholder="Vehicle" value={form.vehicle} onChange={handleChange} style={inputStyle} />
          <input name="service" placeholder="Service" value={form.service} onChange={handleChange} style={inputStyle} />
          <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
          <input name="time" placeholder="Time (e.g. 10:00 AM)" value={form.time} onChange={handleChange} style={inputStyle} />
          <select name="bay" value={form.bay} onChange={handleChange} style={inputStyle}>
            <option value="">Select Bay</option>
            {getBays().map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select name="priority" value={form.priority} onChange={handleChange} style={inputStyle}>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Emergency">Emergency</option>
          </select>
          <select name="location" value={form.location} onChange={handleChange} style={inputStyle}>
            {locations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div style={buttonContainerStyle}>
          <button onClick={addBooking} style={buttonStyle}>
            Add Booking
          </button>
          <button onClick={addToWaitlist} style={secondaryButtonStyle}>
            Add to Waitlist
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div style={centeredCardStyle}>
        <h3 style={{color: "#007BFF", display: "flex", alignItems: "center", gap: "8px", marginTop: 0}}>
          <FiTruck /> All Bookings
        </h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Vehicle</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Bay</th>
              <th style={thStyle}>Priority</th>
              <th style={thStyle}>Location</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td style={priorityStyle(b.priority)}>{b.customer}</td>
                <td style={priorityStyle(b.priority)}>{b.vehicle}</td>
                <td style={priorityStyle(b.priority)}>{b.service}</td>
                <td style={priorityStyle(b.priority)}>{b.date}</td>
                <td style={priorityStyle(b.priority)}>{b.time}</td>
                <td style={priorityStyle(b.priority)}>{b.bay}</td>
                <td style={priorityStyle(b.priority)}>{b.priority}</td>
                <td style={priorityStyle(b.priority)}>{b.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Waitlist */}
      <div style={centeredCardStyle}>
        <h3 style={{color: "#007BFF", display: "flex", alignItems: "center", gap: "8px", marginTop: 0}}>
          <FiAlertTriangle /> Waitlist
        </h3>
        {waitlist.length === 0 ? (
          <p>No waitlist entries</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Vehicle</th>
                <th style={thStyle}>Service</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Priority</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {waitlist.map((w) => (
                <tr key={w.id}>
                  <td style={priorityStyle(w.priority)}>{w.customer}</td>
                  <td style={priorityStyle(w.priority)}>{w.vehicle}</td>
                  <td style={priorityStyle(w.priority)}>{w.service}</td>
                  <td style={priorityStyle(w.priority)}>{w.date}</td>
                  <td style={priorityStyle(w.priority)}>{w.time}</td>
                  <td style={priorityStyle(w.priority)}>{w.priority}</td>
                  <td style={priorityStyle(w.priority)}>{w.location}</td>
                  <td style={priorityStyle(w.priority)}>
                    <button onClick={() => promoteFromWaitlist(w)} style={{...buttonStyle, padding: "6px 12px", fontSize: "13px"}}>
                      Promote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}