'use client'
import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface ThresholdContextProps {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
  customAlert: boolean;
  setCustomAlert: (value: boolean) => void;
  cpuThreshold: number;
  setCpuThreshold: (value: number) => void;
  memoryThreshold: number;
  setMemoryThreshold: (value: number) => void;
  serverDown: boolean;
  setServerDown: (value: boolean) => void;
}

// Create a Context with a default value
export const ThresholdContext = createContext<ThresholdContextProps | undefined>(undefined);

// Create a Provider component
interface ThresholdProviderProps {
  children: ReactNode;
}

export const ThresholdProvider: React.FC<ThresholdProviderProps> = ({ children }) => {
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);
  const [cpuThreshold, setCpuThreshold] = useState(80); // Default threshold for CPU usage
  const [memoryThreshold, setMemoryThreshold] = useState(80); // Default threshold for Memory usage
  const [serverDown, setServerDown] = useState(false);
  return (
    <ThresholdContext.Provider value={{ alertsEnabled, setAlertsEnabled, customAlert, setCustomAlert, cpuThreshold, setCpuThreshold, memoryThreshold, setMemoryThreshold,serverDown, setServerDown }}>
      {children}
    </ThresholdContext.Provider>
  );
};

// Custom hook for using the ThresholdContext
export const useThreshold = (): ThresholdContextProps => {
  const context = React.useContext(ThresholdContext);
  if (context === undefined) {
    throw new Error('useThreshold must be used within a ThresholdProvider');
  }
  return context;
};
