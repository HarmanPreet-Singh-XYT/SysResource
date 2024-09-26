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
    type: 'Production' | 'Development';
    cpuUsage: number;
    availMemory: number;
    totalMemory: number;
    usedMemory: number;
    platform: string;
    environment: string;
    connectivityMedium: 'IP' | 'Domain';
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
    return {
        addGroupDB,
        addServerDB,
        removeGroupDB,
        removeServerDB
    };
};

export default useDB;
