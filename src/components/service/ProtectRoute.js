// ProtectRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("PROTECTED!!");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
