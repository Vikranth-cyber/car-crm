// src/pages/ChangePassword.jsx
import React from "react";
import { FiLock } from "react-icons/fi";

export default function ChangePassword() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // stiff layout
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: "600px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e7ff",
          display: "flex",
          flexDirection: "column",
          height: "95%",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #00ccff, #00ffaa)",
            color: "#fff",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#00aaff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: "700",
            }}
          >
            <FiLock />
          </div>
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700" }}>
            Change Password
          </h2>
        </div>

        {/* Form Section */}
        <div
          style={{
            flex: 1,
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.2rem",
            overflow: "hidden",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Current Password */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                  color: "#00aaff",
                }}
              >
                Current Password *
              </label>
              <input
                type="password"
                placeholder="Enter your current password"
                style={inputStyle}
              />
            </div>

            {/* New Password */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                  color: "#00aaff",
                }}
              >
                New Password *
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                style={inputStyle}
              />
              <small style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                Password must be at least 6 characters long
              </small>
            </div>

            {/* Confirm Password */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                  color: "#00aaff",
                }}
              >
                Confirm New Password *
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                style={inputStyle}
              />
            </div>

            {/* Update Button */}
            <button type="submit" style={submitButtonStyle}>
              Update Password
            </button>
          </form>

          {/* Security Tips */}
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              borderRadius: "12px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e0e7ff",
              fontSize: "0.85rem",
              lineHeight: "1.5",
              color: "#374151",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#00aaff" }}>
              Password Security Tips
            </h4>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>Use a strong password with at least 6 characters</li>
              <li>Include a mix of letters, numbers, and special characters</li>
              <li>Don't use the same password for multiple accounts</li>
              <li>Change your password regularly for better security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input + Button Styles
const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "0.9rem",
};

const submitButtonStyle = {
  backgroundColor: "#00aaff",
  color: "#fff",
  padding: "0.75rem",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "0.5rem",
  fontSize: "0.95rem",
};
