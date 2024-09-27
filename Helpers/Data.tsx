'use client'
import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the Data object
interface Data {
  id: number;
  name: string;
  ip?: string;
  domain?: string;
  isRunning: boolean;
  uptime: string;
  type: string;
  cpuUsage: number;
  availMemory: number;
  totalMemory: number;
  usedMemory: number;
  platform: string;
  environment: string;
  connectivityMedium: string;
  ipDomain: string;
  groupID: number;
  APIKey: string;
  creationTime: string;
}
interface Group{
  id: number;
  name: string;
  creationTime: string;
}

// Define the type for the context value
interface DataContextProps {
  data: Data[];
  groups:Group[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lib:any|null;
  selectedGroupID: number;
  selectedServerID: number;
  setupData: (data: Data[]) => void;
  addData: (newData: Data) => void;
  updateData: (index: number, updatedData: Data) => void;
  removeData: (index: number) => void;
  setupGroup: (groups:Group[]) => void;
  addGroup: (newGroup: Group) => void;
  updateGroup: (index: number, updatedGroup: Group) => void;
  removeGroup: (index: number) => void;
  setGroupID: (id: number) => void;
  setServerID: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLibrary: (lib:any) => void;
}

// Create a Context with a default value
export const DataContext = createContext<DataContextProps | undefined>(undefined);

// Create a Provider component
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupID, setselectedGroupID] = useState(0);
  const [selectedServerID, setselectedServerID] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lib, setLib] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setLibrary = (lib:any) => {
    setLib(lib);
  }
  const setGroupID = (id:number) => {
    setselectedGroupID(id);
  };
  const setServerID = (id:number) => {
    setselectedServerID(id);
  };
  const setupData = (data: Data[]) => {
    setData(data);
  }
  const addData = (newData: Data) => {
    setData(prevData => [...prevData, newData]);
  };

  const updateData = (id: number, updatedData: Data) => {
    setData(prevData => prevData.map((item) => (item.id === id ? updatedData : item)));
  };

  const removeData = (id: number) => {
    setData(prevData => prevData.filter((each) => each.id !== id));
  };
  const setupGroup = (data: Group[]) => {
    setGroups(data);
  }
  const addGroup = (newData: Group) => {
    setGroups(prevData => [...prevData, newData]);
  };

  const updateGroup = (id: number, updatedData: Group) => {
    setGroups(prevData => prevData.map((item) => (item.id === id ? updatedData : item)));
  };

  const removeGroup = (id: number) => {
    setGroups(prevData => prevData.filter((each) => each.id !== id));
  };

  return (
    <DataContext.Provider value={{ data,groups,lib, setLibrary,selectedGroupID,selectedServerID,setupData, addData, updateData, removeData,setupGroup,addGroup,updateGroup,removeGroup,setGroupID,setServerID }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using the DataContext
export const useData = (): DataContextProps => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
