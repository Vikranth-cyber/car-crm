import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHash,
  FiBriefcase,
  FiClock,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 9876543210",
    sin: "123-45-6789",
    role: "Administrator",
    lastLogin: "September 13, 2025, 10:30 AM",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(formData);

  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setFormData(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData(formData);
    setEditMode(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: "1100px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e7ff",
          display: "flex",
          flexDirection: "column",
          height: "95%",
        }}
      >
       
        <div
          style={{
            background: "linear-gradient(135deg, #00ccff, #00ffaa)",
            color: "#fff",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#00aaff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.6rem",
                fontWeight: "700",
              }}
            >
              {formData.name.charAt(0)}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700" }}>
                {formData.name}
              </h2>
              <p
                style={{
                  margin: "0.25rem 0",
                  fontSize: "0.9rem",
                  color: "#e0f7f5",
                }}
              >
                {formData.role}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  style={actionButtonStyle("#22c55e")}
                >
                  <FiCheck /> Save
                </button>
                <button
                  onClick={handleCancel}
                  style={actionButtonStyle("#ef4444")}
                >
                  <FiX /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                style={actionButtonStyle("#3b82f6")}
              >
                <FiEdit2 /> Edit
              </button>
            )}
          </div>
        </div>

       
        <div
          style={{
            flex: 1,
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflow: "hidden",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#00aaff",
              margin: "0 0 0.8rem 0",
            }}
          >
            Profile Information
          </h3>

          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              alignContent: "start",
            }}
          >
            <InfoCard
              icon={<FiUser />}
              label="Full Name"
              value={tempData.name}
              editable={editMode}
              name="name"
              onChange={handleChange}
            />
            <InfoCard
              icon={<FiMail />}
              label="Email Address"
              value={tempData.email}
              editable={editMode}
              name="email"
              onChange={handleChange}
            />
            <InfoCard
              icon={<FiPhone />}
              label="Phone Number"
              value={tempData.phone}
              editable={editMode}
              name="phone"
              onChange={handleChange}
            />
            <InfoCard
              icon={<FiHash />}
              label="SIN Number"
              value={tempData.sin}
              editable={editMode}
              name="sin"
              onChange={handleChange}
            />
            <InfoCard
              icon={<FiBriefcase />}
              label="Role / Job Title"
              value={tempData.role}
              editable={editMode}
              name="role"
              onChange={handleChange}
            />
            <InfoCard
              icon={<FiClock />}
              label="Last Login"
              value={formData.lastLogin}
              editable={false} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, editable, name, onChange }) {
  return (
    <div
      style={{
        border: "1px solid #e0e7ff",
        borderRadius: "15px",
        padding: "0.7rem",
        backgroundColor: "#f9fafb",
        minHeight: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.4rem",
          color: "#00aaff",
          fontSize: "0.85rem",
          fontWeight: "600",
          gap: "0.5rem",
        }}
      >
        {icon}
        {label}
      </div>
      {editable ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          style={{
            padding: "0.4rem",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: "500",
          }}
        />
      ) : (
        <p
          style={{
            margin: 0,
            fontWeight: "600",
            fontSize: "0.9rem",
            color: "#111",
            wordBreak: "break-word",
          }}
        >
          {value}
        </p>
      )}
    </div>
  );
}

const actionButtonStyle = (color) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.4rem 0.8rem",
  backgroundColor: color,
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: "600",
});
