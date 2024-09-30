'use client'
import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface SettingsContextProps {
  apiInterval: number;
  setApiInterval: (value: number) => void;
  apiHistoryLimit: number;
  setApiHistoryLimit: (value: number) => void;
  maxAPIFailure: number;
  setmaxAPIFailure: (value: number) => void;
}

// Create a Context with a default value
export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

// Create a Provider component
interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [apiInterval, setApiInterval] = useState(5000); // Default API interval in seconds
  const [apiHistoryLimit, setApiHistoryLimit] = useState(100); // Default API history limit
  const [maxAPIFailure, setmaxAPIFailure] = useState(5);

  return (
    <SettingsContext.Provider value={{ apiInterval, setApiInterval, apiHistoryLimit, setApiHistoryLimit, maxAPIFailure, setmaxAPIFailure }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for using the SettingsContext
export const useSettings = (): SettingsContextProps => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
