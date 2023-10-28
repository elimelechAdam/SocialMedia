import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
};

export const ProtectedRoutes = () => {
  if (isTokenExpired()) {
    localStorage.removeItem("userToken");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
