import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import UpdateRestaurant from "./pages/UpdateRestaurant.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Admin protected */}
      <Route element={<ProtectedRoute allowRole="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/restaurants/update" element={<UpdateRestaurant />} />
      </Route>

      {/* Customer protected */}
      <Route element={<ProtectedRoute allowRole="customer" />}>
        <Route path="/customers/dashboard" element={<CustomerDashboard />} />
      </Route>

      {/* Catch */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
