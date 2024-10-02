import React from 'react'

const TSDocs = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Integration Guide
          </h1>
          <p className="text-lg text-center text-gray-600">
            Learn how to integrate our monitoring solution into your server
          </p>
        </header>

        {/* WebSocket Integration Section */}
        <section id="websocket-integration" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            WebSocket Integration
          </h2>
          <p className="text-gray-700 mb-4">
            To integrate WebSocket functionality, follow the steps below:
          </p>
          <h1>Main File</h1>
          <pre className='bg-gray-800 text-white p-4 rounded mb-4'>
          <code>
              {`
// Main.ts
import express from 'express';
import http from 'http';
import { sysResource_WebsocketData } from './websocketData';

// Create an Express app (optional)
const app = express();
const cors = require('cors')

app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: 'https://sysresource.vercel.app',// your frontend domain or ip
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

//Integrating WebSocket

// Create an HTTP server
const server = http.createServer(app);

// Define WebSocket authentication key and data sending interval
const authKey = 'your-secret-key';
const interval = 5000; // Send data every 5 seconds (in milliseconds)

// Pass the HTTP server to the WebSocket handler
sysResource_WebsocketData(server, { key: authKey, interval });

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
    console.log('Server Listening on Port 4000');
});


              
              `}
            </code>
            </pre>
            <h1>websocketData.ts File</h1>
          <pre className="bg-gray-800 text-white p-4 rounded mb-4">
            <code>
              {`
// websocketData.ts
const WebSocketServer = require('websocket').server;  // WebSocket server from the 'websocket' package
const os = require('os');
const url = require('url');
let previousCpuInfo = os.cpus();

function calculateCpuUsage() {
    const currentCpuInfo = os.cpus();

    let idleDiff = 0;
    let totalDiff = 0;

    for (let i = 0; i < currentCpuInfo.length; i++) {
        const previous = previousCpuInfo[i].times;
        const current = currentCpuInfo[i].times;

        const prevIdle = previous.idle;
        const prevTotal:any = Object.values(previous).reduce((acc:number, val:number) => acc + val, 0);

        const currIdle = current.idle;
        const currTotal:any = Object.values(current).reduce((acc:number, val:number) => acc + val, 0);

        idleDiff += currIdle - prevIdle;
        totalDiff += currTotal - prevTotal;
    }

    const cpuUsagePercent = 100 - Math.floor((idleDiff / totalDiff) * 100);

    previousCpuInfo = currentCpuInfo;

    return (cpuUsagePercent>=0 && cpuUsagePercent<=100)?cpuUsagePercent:0;
}
// Define a function to start WebSocket server with key-based authentication
export function sysResource_WebsocketData(server, options){
    const { key: authKey, interval } = options;

    // Create a WebSocket server attached to the HTTP server
    const wss = new WebSocketServer({
        httpServer: server  // Attach to the provided HTTP server
    });

    // Handle WebSocket requests and connections
    wss.on('request', (req) => {
        const requestUrl = url.parse(req.httpRequest.url || '', true);
        const params = requestUrl.query;
        // Only allow connections to the /sysresource path
        if (requestUrl.pathname !== '/sysresource') {
            req.reject(404, 'Not Found');
            return;
        }
        // Check if the provided key matches the server's key
        if (params.key !== authKey) {
            // console.log('Client attempted to connect with an invalid key.');
            req.reject(1008, 'Unauthorized');  // Reject the request if the key is invalid
            return;
        }

        // console.log('Client connected via WebSocket with valid key');
        const connection = req.accept(null, req.origin);

        // Function to send system resource data periodically
        const sendSystemResources = () => {
            const data = {
                hostname: os.hostname(),
                cpuUsage:calculateCpuUsage(),
                cpu: os.cpus()[0].model,
                cpuCore: os.cpus().length,
                totalMemory: Math.round(os.totalmem() * 0.000001),
                freeMemory: Math.round(os.freemem() * 0.000001),
                release: os.release(),
                platform: os.platform(),
                uptime: Math.round(os.uptime() / 60),  // in minutes
                type: os.type(),
                machine: os.machine(),
                architecture: os.arch(),
                environment:'NodeJS'
            };
            connection.sendUTF(JSON.stringify(data));
        };

        // Set interval to send data based on the provided interval
        const dataInterval = setInterval(sendSystemResources, interval);

        // Handle WebSocket connection close event
        connection.on('close', () => {
            // console.log('Client disconnected');
            clearInterval(dataInterval);  // Stop sending data when the client disconnects
        });
    });
};
              `}
            </code>
          </pre>
          <p className="text-gray-600">
            This code will start the WebSocket server and send system resource on request in Nodejs.
          </p>
        </section>

        {/* API Function Section */}
        <section id="api-function" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            API Function
          </h2>
          <p className="text-gray-700 mb-4">
            Use the following API function to fetch system resource details:
          </p>
          <pre className="bg-gray-800 text-white p-4 rounded mb-4">
            <code>
              {`
// Main.ts
import express from 'express';
import { sysresource_APIData } from './APIData';

// Create an Express app
const app = express();
const cors = require('cors')

app.use(express.urlencoded({ extended: false }));

//Define Cors for communcation
const corsOptions = {
    origin: 'https://sysresource.vercel.app',// your frontend domain or ip
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


// Define a route for the API
app.get('/sysresource/:key', (req, res) => {
    const { key } = req.params;
    const secretKey = 'your-secret-key';
    const data = sysresource_APIData({ paramKey: key, key: secretKey });
    if(data.success) {
        res.status(200).send(data.data);
    } else {
        res.status(401).send(data.error);
    }
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
    console.log('Server Listening on PORT 4000');
});

              `}
            </code>
          </pre>
          <h1>APIData.ts File</h1>
          <pre className='bg-gray-800 text-white p-4 rounded mb-4'>
            <code>
              {`
//APIData.ts
const os = require('os');

interface sysresource_APIDataOptions {
    paramKey:string;
    key: string;
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
}

let previousCpuInfo = os.cpus();

function calculateCpuUsage() {
    const currentCpuInfo = os.cpus();

    let idleDiff = 0;
    let totalDiff = 0;

    for (let i = 0; i < currentCpuInfo.length; i++) {
        const previous = previousCpuInfo[i].times;
        const current = currentCpuInfo[i].times;

        const prevIdle = previous.idle;
        const prevTotal:any = Object.values(previous).reduce((acc:number, val:number) => acc + val, 0);

        const currIdle = current.idle;
        const currTotal:any = Object.values(current).reduce((acc:number, val:number) => acc + val, 0);

        idleDiff += currIdle - prevIdle;
        totalDiff += currTotal - prevTotal;
    }

    const cpuUsagePercent = 100 - Math.floor((idleDiff / totalDiff) * 100);

    previousCpuInfo = currentCpuInfo;

    return (cpuUsagePercent>=0 && cpuUsagePercent<=100)?cpuUsagePercent:0;
}

export function sysresource_APIData(options:sysresource_APIDataOptions):{
    success:boolean;
    error:string|null;
    data:SystemInfo | null} {
    const { paramKey, key: authKey } = options;
    if(paramKey !== authKey) {
        return {
            success: false, error: 'Unauthorized key',data: null}
    }
    const data = {
        hostname: os.hostname(),
        cpuUsage:calculateCpuUsage(),
        cpu: os.cpus()[0].model,
        cpuCore: os.cpus().length,
        totalMemory: Math.round(os.totalmem() * 0.000001),
        freeMemory: Math.round(os.freemem() * 0.000001),
        release: os.release(),
        platform: os.platform(),
        uptime: Math.round(os.uptime() / 60),  // in minutes
        type: os.type(),
        machine: os.machine(),
        architecture: os.arch(),
        environment:'NodeJS'
    };
    return {success:true,error:null,data:data}
}
              `}
            </code>
          </pre>
          <p className="text-gray-600">
            The <code>/sysresource/your-secret-key</code> endpoint provides CPU usage,
            memory details, and other system statistics. Make sure to include
            your API key in the authorization parameters.
          </p>
        </section>

        {/* Pros and Cons Section */}
        <section id="pros-and-cons" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            WebSocket vs API: Pros and Cons
          </h2>

          {/* WebSocket Pros and Cons */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              WebSocket
            </h3>
            <ul className="list-disc ml-6">
              <li className="text-gray-700 mb-2">
                <strong>Pros:</strong> 
                <ul className="list-inside list-disc text-gray-600">
                  <li>Real-time data: Provides continuous updates as soon as the server sends them.</li>
                  <li>Efficient for long-lasting connections where constant data flow is needed.</li>
                </ul>
              </li>
              <li className="text-gray-700">
                <strong>Cons:</strong> 
                <ul className="list-inside list-disc text-gray-600">
                  <li>Maintains an active connection, which can consume resources and be harder to scale.</li>
                  <li>The interval between updates can only be configured from the backend.</li>
                  <li>If the connection drops, you must handle reconnections and potential data loss.</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* API Pros and Cons */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              API (RESTful)
            </h3>
            <ul className="list-disc ml-6">
              <li className="text-gray-700 mb-2">
                <strong>Pros:</strong> 
                <ul className="list-inside list-disc text-gray-600">
                  <li>Stateless: No need to maintain an active connection, requests are made only when necessary.</li>
                  <li>Client-side control: The client can determine how often to fetch data by adjusting the request intervals.</li>
                  <li>Easier to scale as its based on HTTP requests.</li>
                </ul>
              </li>
              <li className="text-gray-700">
                <strong>Cons:</strong> 
                <ul className="list-inside list-disc text-gray-600">
                  <li>Not real-time: Updates only happen when the client makes a request.</li>
                  <li>Increased network overhead if requests are made frequently to simulate real-time behavior.</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TSDocs