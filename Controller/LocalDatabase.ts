/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useData } from '@/Helpers/Data';

// Define interfaces
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

interface Group {
    id: number;
    name: string;
    creationTime: string;
}

const useDB = () => {
    const {lib} = useData();

    // Add a new group to the database
    const addGroupDB = (group: Group) => {
        if (lib) {
            lib.insert('groupData', group);
            lib.commit();
        }
    };
    const removeGroupDB = (id: number) => {
        if (lib) {
            lib.deleteRows('groupData', {id});
            lib.commit();
        }
    };
    // Add a new server to the database
    const addServerDB = (server: Data) => {
        if (lib) {
            lib.insert('serverData', server);
            lib.commit();
        }
    };
    const removeServerDB = (id: number) => {
        if (lib) {
            lib.deleteRows('serverData', {id});
            lib.commit();
        }
    };

    const updateServerDB = (id:number,data:Data)=>{
        if(lib){
            lib.update("serverData", {id}, function(row: { name: string; ip: string | undefined; domain: string | undefined; isRunning: boolean; uptime: string; type: string; cpuUsage: number; availMemory: number; totalMemory: number; usedMemory: number; platform: string; environment: string; connectivityMedium: string; ipDomain: string; groupID: number; APIKey: string; creationTime: string; }) {
                row.name = data.name;
                row.ip = data.ip;
                row.domain = data.domain;
                row.isRunning = data.isRunning;
                row.uptime = data.uptime;
                row.type = data.type;
                row.cpuUsage = data.cpuUsage;
                row.availMemory = data.availMemory;
                row.totalMemory = data.totalMemory;
                row.usedMemory = data.usedMemory;
                row.platform = data.platform;
                row.environment = data.environment;
                row.connectivityMedium = data.connectivityMedium;
                row.ipDomain = data.ipDomain;
                row.groupID = data.groupID;
                row.APIKey = data.APIKey;
                row.creationTime = data.creationTime;
            
                // the update callback function returns to the modified record
                return row;
            });
            lib.commit();
        }
    }

    return {
        addGroupDB,
        addServerDB,
        removeGroupDB,
        removeServerDB,
        updateServerDB
    };
};

export default useDB;
