import React, { createContext, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    connectionStatus: "disable", // 'disable', 'online', 'offline'
    syncStatus: "error", // 'saved', 'saving', 'error'
    isLoading: false,
    qrCode: null,
    qrError: null,
  });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
