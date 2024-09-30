'use server'
// Define the interface for the response pattern

interface ApiResponse {
    status: boolean;
    error: string | null;
    data: SystemInfo | null;
}

// Define the interface for SystemInfo
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

// Function to fetch system info using POST
export default async function fetchSystemInfo(apiUrl: string, path: string, key: string): Promise<ApiResponse> {
    try {
        const response = await fetch(`${apiUrl}/${path}/${key}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            return {
                status: false,
                error: `Error: ${response.status} ${response.statusText}`,
                data: null
            };
        }

        const data: SystemInfo = await response.json();

        return {
            status: true,
            error: null,
            data
        };

    } catch (error) {
        return {
            status: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            data: null
        };
    }
}
