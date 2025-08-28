// Customers.jsx
import React, { useState, useEffect } from "react";
import { FiSearch, FiUser, FiPhone, FiMail } from "react-icons/fi";
import { FaCar } from "react-icons/fa";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [customers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      mobile: "9876543210",
      email: "rahul@example.com",
      vehicles: [{ plate: "MH12AB1234", model: "Honda City", year: "2020" }],
    },
    {
      id: 2,
      name: "Priya Verma",
      mobile: "9988776655",
      email: "priya@example.com",
      vehicles: [{ plate: "TS09XY5678", model: "Hyundai i20", year: "2019" }],
    },
    {
      id: 3,
      name: "Amit Patel",
      mobile: "8899667744",
      email: "amit@example.com",
      vehicles: [
        { plate: "KA03MN7890", model: "Toyota Innova", year: "2021" },
        { plate: "DL10PQ4567", model: "Maruti Swift", year: "2018" },
      ],
    },
  ]);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      c.vehicles.some((v) =>
        v.plate.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#007bff",
          marginBottom: "20px",
          fontWeight: "600",
          fontSize: "28px",
        }}
      >
        Customers
      </h2>

      {/* Search Bar */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ position: "relative", width: "260px" }}>
          <FiSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#7f8c8d",
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 15px 10px 35px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "15px",
            }}
          />
        </div>
      </div>

      {/* Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
        }}
      >
        {/* Customers list */}
        <div
          style={{
            flex: "1",
            maxHeight: "600px",
            overflowY: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              padding: "15px",
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "600",
              fontSize: "18px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <FiUser style={{ marginRight: "8px" }} />
            Customers
          </div>
          <div>
            {filteredCustomers.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCustomer(c)}
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCustomer?.id === c.id ? "#f8f9fa" : "white",
                  transition: "background-color 0.2s",
                }}
              >
                <div style={{ fontWeight: "600", color: "#007bff" }}>
                  {c.name}
                </div>
                <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
                  {c.mobile}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer details */}
        <div style={{ flex: "2" }}>
          {selectedCustomer ? (
            <div
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {selectedCustomer.name}
              </div>

              <div style={{ padding: "20px" }}>
                <p>
                  <FiPhone /> {selectedCustomer.mobile} &nbsp;|&nbsp;{" "}
                  <FiMail /> {selectedCustomer.email}
                </p>
                <h4 style={{ marginTop: "15px", marginBottom: "10px" }}>
                  <FaCar /> Vehicles
                </h4>
                {selectedCustomer.vehicles.map((v, i) => (
                  <div key={i} style={{ marginBottom: "6px" }}>
                    {v.plate} - {v.model} ({v.year})
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                color: "#7f8c8d",
              }}
            >
              <FiUser size={40} style={{ marginRight: "10px" }} />
              Select a customer to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
