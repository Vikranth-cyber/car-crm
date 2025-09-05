import React from "react";
import KpiStrip from "../components/dashboard/KpiStrip";
import LiveJobsWidget from "../components/dashboard/LiveJobsWidget";
import QuickActions from "../components/dashboard/QuickActions";
import AlertsPanel from "../components/dashboard/AlertsPanel";

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fff", // ✅ pure white background
        color: "#2c3e50",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <style>{`
        .dash-wrap {
          padding: 24px 32px;
          max-width: 1600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
          background: #fff;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .dash-header h1 {
          margin: 0;
          font-weight: 700;
          font-size: 1.6rem;
          color: #00aaff; /* dashboard blue */
        }
        .dash-header-date {
          color: #64748b;
          font-weight: 500;
        }
        .dash-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 28px;
        }
        @media (max-width: 1024px) {
          .dash-grid {
            grid-template-columns: 1fr;
          }
        }
        .dash-left,
        .dash-right {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
      `}</style>

      <div className="dash-wrap">
        {/* Header */}
        <div className="dash-header">
          <h1>Dashboard Overview</h1>
          <div className="dash-header-date">{today}</div>
        </div>

        {/* KPI Strip */}
        <KpiStrip />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Grid */}
        <div className="dash-grid">
          {/* Left Column */}
          <div className="dash-left">
            <LiveJobsWidget />
          </div>

          {/* Right Column */}
          <div className="dash-right">
            <AlertsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
