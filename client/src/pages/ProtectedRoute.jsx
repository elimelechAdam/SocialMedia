import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  let auth = localStorage.getItem("userToken");
  return auth ? <Outlet /> : <Navigate to="/" />;
};
