import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import { useUser } from "../context/UserProvider";

export const ProtectedRoutes = () => {
  const { userId, token, setUserId, setToken } = useUser();

  useEffect(() => {
    const isTokenExpired = () => {
      if (!token) return true;

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
      } catch (error) {
        // Handle decoding error (e.g., invalid token format)
        console.error("Token decoding error:", error);
        return true; // Consider the token expired/invalid if an error occurs
      }
    };

    if (isTokenExpired()) {
      setUserId(null);
      setToken(null);
      <Navigate to="/" />;
    }
  }, [token, setUserId, setToken]);

  return <Outlet />;
};
