
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { FaStar, FaExclamationTriangle } from "react-icons/fa";

const COLORS = ["#5B64D4", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#0088FE"];
const BACKGROUND_COLOR = "#FFFFFF";
const CARD_BACKGROUND = "#F9FAFB";
const TEXT_PRIMARY = "#1E293B";
const TEXT_SECONDARY = "#64748B";
const ACCENT_COLOR = "#6366F1";
const WARNING_COLOR = "#F59E0B";
const ERROR_COLOR = "#EF4444";

const FACTOR_WEIGHTS = {
  staffing: 0.25,
  jobTime: 0.2,
  sales: 0.2,
  footfall: 0.1,
  cleanliness: 0.15,
  complaints: 0.1,
};

const storeFactors = {
  staffing: 4.8,
  jobTime: 35,
  sales: 4.9,
  footfall: 4.8,
  cleanliness: 4.9,
  complaints: 2,
  reimageRate: 0.8,
  reviewsScore: 4.85,
};

const reviews = [
  { id: 1, author: "Rahul", stars: 5, text: "Quick and clean service! My car looks brand new.", date: "2023-10-15" },
  { id: 2, author: "Nisha", stars: 4, text: "Good job but a bit pricey compared to other locations.", date: "2023-10-12" },
  { id: 3, author: "Alex", stars: 3, text: "Missed a spot on the dashboard. Had to come back.", date: "2023-10-10" },
];

const trends = [4.95, 4.92, 4.91, 4.89, 4.93, 4.90, 4.88];

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function jobTimeToScore(minutes) {
  return clamp(5 - (minutes - 30) * 0.05, 1.5, 5);
}
function complaintsToScore(count) {
  return clamp(5 - count * 0.3, 1.5, 5);
}

function weightedOverall(f) {
  const score =
    f.staffing * FACTOR_WEIGHTS.staffing +
    jobTimeToScore(f.jobTime) * FACTOR_WEIGHTS.jobTime +
    f.sales * FACTOR_WEIGHTS.sales +
    f.footfall * FACTOR_WEIGHTS.footfall +
    f.cleanliness * FACTOR_WEIGHTS.cleanliness +
    complaintsToScore(f.complaints) * FACTOR_WEIGHTS.complaints;
  return Number((score * 0.9 + f.reviewsScore * 0.1).toFixed(2));
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: CARD_BACKGROUND,
          padding: "12px",
          border: `1px solid #334155`,
          borderRadius: "6px",
        }}
      >
        <p style={{ color: TEXT_PRIMARY, margin: "0 0 8px 0", fontWeight: "600" }}>{label}</p>
        <p style={{ color: payload[0].fill, margin: "0", fontSize: "14px" }}>
          {payload[0].name}: <span style={{ color: TEXT_PRIMARY }}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function StoreRating() {
  const overall = useMemo(() => weightedOverall(storeFactors), []);
  const breakdownData = [
    { name: "Staff Perf.", value: storeFactors.staffing * 20 },
    { name: "Job Time", value: jobTimeToScore(storeFactors.jobTime) * 20 },
    { name: "Sales", value: storeFactors.sales * 20 },
    { name: "Footfall", value: storeFactors.footfall * 20 },
    { name: "Cleanliness", value: storeFactors.cleanliness * 20 },
    { name: "Complaints", value: complaintsToScore(storeFactors.complaints) * 20 },
    { name: "Reviews", value: storeFactors.reviewsScore * 20 },
  ];

  const trendSeries = trends.map((v, i) => ({ label: `Day ${i + 1}`, rating: v }));
  const belowThreshold = overall < 4; 

  return (
    <div
      style={{
        backgroundColor: BACKGROUND_COLOR,
        color: TEXT_PRIMARY,
        minHeight: "100vh",
        padding: "24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <header style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0",
            color: "#38BDF8", 
          }}
        >
          Store Ratings
        </h1>
        <p style={{ color: TEXT_SECONDARY, margin: "0", fontSize: "16px" }}>
          Performance metrics and customer feedback
        </p>
      </header>

      <div
        style={{
          backgroundColor: CARD_BACKGROUND,
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
          border: belowThreshold ? `1px solid ${ERROR_COLOR}` : `1px solid #334155`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: TEXT_SECONDARY }}>
              Overall Store Rating
            </h2>
            <div style={{ fontSize: "40px", fontWeight: "700" }}>{overall}/5</div>
          </div>
          {belowThreshold && (
            <div
              style={{
                backgroundColor: "rgba(239,68,68,0.1)",
                border: `1px solid ${ERROR_COLOR}`,
                borderRadius: "8px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaExclamationTriangle color={ERROR_COLOR} />
              <span style={{ color: ERROR_COLOR, fontSize: "14px", fontWeight: "500" }}>
                Rating dropped below 4! Investigate immediately.
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: CARD_BACKGROUND,
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #334155",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: TEXT_SECONDARY }}>
            Performance Composition
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={breakdownData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                {breakdownData.map((e, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            backgroundColor: CARD_BACKGROUND,
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #334155",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: TEXT_SECONDARY }}>
            Performance Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={breakdownData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: TEXT_SECONDARY, fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: TEXT_SECONDARY, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {breakdownData.map((e, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          backgroundColor: CARD_BACKGROUND,
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #334155",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: TEXT_SECONDARY }}>Rating Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: TEXT_SECONDARY, fontSize: 12 }} />
            <YAxis domain={[4.6, 5.0]} tick={{ fill: TEXT_SECONDARY, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="rating" stroke={ACCENT_COLOR} strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          backgroundColor: CARD_BACKGROUND,
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #334155",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: TEXT_SECONDARY }}>Customer Reviews</h3>
        <div style={{ display: "grid", gap: "16px" }}>
          {reviews.map((r) => (
            <div
              key={r.id}
              style={{
                backgroundColor: r.stars <= 3 ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.02)",
                border: r.stars <= 3 ? `1px solid ${ERROR_COLOR}` : `1px solid #334155`,
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <strong>{r.author}</strong>
                <span style={{ fontSize: "14px", color: TEXT_SECONDARY }}>{r.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < r.stars ? (r.stars <= 3 ? ERROR_COLOR : WARNING_COLOR) : "#CBD5E1"} />
                ))}
              </div>
              <p style={{ margin: 0, fontSize: "14px" }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}
