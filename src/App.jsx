import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";

import AdminDashboard from "./pages/AdminDashboard";
import Customers from "./pages/Customers";
import Jobs from "./pages/Jobs";
import Schedule from "./pages/Schedule";
import Inventory from "./pages/Inventory";
import Staff from "./pages/Staff";
import Attendance from "./pages/Attendance";
import Performance from "./pages/Performance";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import StoreRating from "./pages/StoreRating";
import Settings from "./pages/Settings";
import Forms from "./pages/Forms";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages"; 
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Layout>
      <Routes>
  
        <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/reports" element={<Reports />} />

        <Route path="/store-rating" element={<StoreRating />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Layout>
  );
}

export default App;
