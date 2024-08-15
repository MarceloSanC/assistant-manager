import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    establishmentName: "Toca do Surubim",
    phoneNumber: "(48) 9 9148-7526",
    countryCode: "+55",
    profileImage: null
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};