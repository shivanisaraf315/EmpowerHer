import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allowRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  if (allowRole && user.role !== allowRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
