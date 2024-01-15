"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type VerifiedContextType = {
  verified: boolean;
  setVerified: (value: boolean) => void;
};

const VerifiedContext = createContext<VerifiedContextType | undefined>(
  undefined
);

export function useVerified() {
  const context = useContext(VerifiedContext);
  if (!context) {
    throw new Error("useVerified must be used within a VerifiedProvider");
  }
  return context;
}

interface VerifiedProviderProps {
  children: ReactNode;
}

export function VerifiedProvider({ children }: VerifiedProviderProps) {
  const [verified, setVerified] = useState(false);

  return (
    <VerifiedContext.Provider value={{ verified, setVerified }}>
      {children}
    </VerifiedContext.Provider>
  );
}
