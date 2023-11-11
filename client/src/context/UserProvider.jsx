import React, { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext({ userId: null, token: null });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("userToken");
    const localUserId = localStorage.getItem("userId");
    if (localToken) {
      setToken(localToken);
    }
    if (localUserId) {
      setUserId(localUserId);
    }
  }, []);
  const value = {
    userId,
    token,
    setUserId,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
