import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <AuthContext.Provider value={{ verificationId, setVerificationId, verificationCode, setVerificationCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// context này bỏ