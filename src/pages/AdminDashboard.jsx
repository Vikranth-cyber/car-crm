// AdminDashboard.jsx
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
        backgroundColor: "#ffffff",
        color: "#00aaff",
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <style>{`
        :root {
          --radius: 16px;
          --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          --brand: #00aaff;
          --muted: #64748b;
          --border: #e2e8f0;
        }
        
        .dash-wrap {
          padding: 28px 32px;
          max-width: 1800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
          height: 100%;
          min-height: calc(100vh - 80px);
        }
        
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding: 0 8px;
        }
        
        .dash-header h1 {
          margin: 0;
          font-weight: 800;
          font-size: 2rem;
          background: linear-gradient(135deg, #00aaff, #0088cc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .dash-header-date {
          color: #64748b;
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .dash-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          flex: 1;
          min-height: 0;
          height: 100%;
        }
        
        @media (max-width: 1280px) {
          .dash-grid {
            gap: 24px;
          }
        }
        
        @media (max-width: 1024px) {
          .dash-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .dash-wrap {
            padding: 20px 16px;
            gap: 24px;
          }
          
          .dash-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .dash-header h1 {
            font-size: 1.8rem;
          }
        }
        
        .dash-left,
        .dash-right {
          display: flex;
          flex-direction: column;
          gap: 32px;
          min-height: 0;
          height: 100%;
        }
        
        .dash-left > *, 
        .dash-right > * {
          flex: 1;
          min-height: 0;
          height: 100%;
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