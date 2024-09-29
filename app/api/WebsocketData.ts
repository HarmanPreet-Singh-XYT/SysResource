'use server'
// Define the interface for the WebSocket response
interface WebSocketResponse {
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
}

// Function to establish WebSocket connection
function connectWebSocket(apiUrl: string, key: string, onMessage: (response: WebSocketResponse) => void, onError: (error: string) => void): WebSocket {
    const socket = new WebSocket(apiUrl);

    // Event: WebSocket connection is opened
    socket.onopen = () => {
        console.log("WebSocket connection established");

        // Send the API key as soon as the connection is established
        socket.send(JSON.stringify({ key }));
    };

    // Event: WebSocket receives a message from the server
    socket.onmessage = (event) => {
        try {
            const response: WebSocketResponse = JSON.parse(event.data);

            if (response.status) {
                onMessage(response);
            } else {
                onError(response.error || "Unknown error occurred");
            }
        } catch (err) {
            onError(`Failed to parse server response as JSON, Error: ${err}`);
        }
    };

    // Event: WebSocket connection closes
    socket.onclose = () => {
        console.log("WebSocket connection closed");
    };

    // Event: WebSocket encounters an error
    socket.onerror = (event) => {
        console.error("WebSocket error occurred:", event);
        onError("WebSocket error occurred");
    };

    return socket;
}

export default connectWebSocket;