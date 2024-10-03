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
  urlPath:string;
  connectionType:string;
  creationTime: string;
}
interface SystemInfo {
  hostname: string;
  cpuUsage: number;
  cpu: string;
  cpuCore: number;
  totalMemory: number;  // in MB
  freeMemory: number;   // in MB
  release: string;
  platform: string;
  uptime: number;  // in minutes
  type: string;
  machine: string;
  architecture: string;
  environment:string;
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
  Requests:Requests[];
  serverSystemInfo:serverSystemInfo[];
  dataLoaded: boolean;
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
  setDataLoaded: (bool:boolean) => void;
  setserverSystemInfo:(serverSystemInfo:serverSystemInfo[]) => void;
}

// Create a Context with a default value
export const DataContext = createContext<DataContextProps | undefined>(undefined);
interface SystemInfoRequests {
  status:boolean;
  hostname: string;
  cpuUsage: number;
  cpu: string;
  cpuCore: number;
  totalMemory: number;  // in MB
  freeMemory: number;   // in MB
  release: string;
  platform: string;
  uptime: number;  // in minutes
  type: string;
  machine: string;
  architecture: string;
  environment:string;
}
// Create a Provider component
interface DataProviderProps {
  children: ReactNode;
}

interface Requests{
  id: number;
  requests:SystemInfoRequests[]
  errors:{time:string,error:string}[];
}
interface serverSystemInfo{
  id: number;
  serverInfo:SystemInfo;
}
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  // eslint-disable-next-line prefer-const
  let Requests:Requests[] = [];
  const [serverSystemInfo, setserverSystemInfo] = useState<serverSystemInfo[]>([]);
  const [selectedGroupID, setselectedGroupID] = useState(0);
  const [selectedServerID, setselectedServerID] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lib, setLib] = useState<any | null>(null);
  const [dataLoaded, setdataLoaded] = useState(false);
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
  const setDataLoaded = (bool:boolean)=>{
    setdataLoaded(bool);
  }

  return (
    <DataContext.Provider value={{ data,groups,lib,dataLoaded,serverSystemInfo, Requests,setLibrary,setserverSystemInfo,selectedGroupID,selectedServerID,setupData, addData, updateData, removeData,setupGroup,addGroup,updateGroup,removeGroup,setGroupID,setServerID,setDataLoaded }}>
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
