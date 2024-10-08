'use client'
import { useThreshold } from '@/helpers/Alerts';
import { useData } from '@/helpers/Data';
import { useSettings } from '@/helpers/Settings';
import React, { useEffect, useRef } from 'react';


// Define a WebSocket connection function with reconnection logic
const connectWebSocket = (
    url: string,
    reconnect: (url: string) => void,
    maxRetries: number,
    retriesRef: React.MutableRefObject<number>
): WebSocket => {
    const socket = new WebSocket(url);

    // Set up event listeners inside the WebSocket connection function
    socket.onopen = () => {
        console.log('WebSocket connection opened');
        retriesRef.current = 0;  // Reset retry counter on successful connection
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
        // if (retriesRef.current < maxRetries) {
            const retryDelay = Math.min(5000, retriesRef.current * 1000);  // Exponential backoff with max delay of 5 seconds
            retriesRef.current++;
            setTimeout(() => reconnect(url), retryDelay);  // Retry connection after delay
        // }
    };

    return socket;
};

const WebSocketAPIUpdate = ({setPopup}:{setPopup:(text:string)=>void}) => {
    const { dataLoaded, data, updateData,updateErrors,setserverSystemInfo,serverSystemInfo } = useData();
    const retriesRef = useRef(0);  // For reconnection retries
    const maxRetries = 5;  // Maximum number of reconnection attempts
    const { maxAPIFailure } = useSettings();
    const socketRefs = useRef<{ [key: string]: WebSocket }>({});
    const APITries = useRef(0);
    const {cpuThreshold,memoryThreshold,customAlert,alertsEnabled, serverDown} = useThreshold();
    const firstTime = useRef(true);
    const dataRef = useRef(data);

    useEffect(() => {
        dataRef.current = data;
    }, [data]); // Keep updating the ref when data changes
    useEffect(() => {
        if (dataLoaded) {
            data.forEach((each,index) => {
                if (each.connectionType === 'WebSocket') {
                    const socketUrl = `${each.ipDomain}/sysresource?key=${each.APIKey}`;  // Attach API key in URL
                    
                    // Reconnect function to use inside the socket setup
                    const reconnect = (url: string) => {
                        // console.log(`Attempting to reconnect for ${each.id}...`);
                        updateErrors({id:each.id,error:'Lost connection, reconnecting...'});
                        updateData(each.id, {
                            ...dataRef.current[index],
                            id:each.id,
                            isRunning: false,
                            totalMemory: 0,
                            availMemory: 0,
                            usedMemory: 0,
                            cpuUsage: 0,
                        });
                        socketRefs.current[each.id] = connectWebSocket(url, reconnect, maxRetries, retriesRef);
                        socketRefs.current[each.id].onmessage = (event) => {
                            const APIRes = JSON.parse(event.data);
    
                            if (APIRes) {
                                updateData(each.id, {
                                    ...dataRef.current[index],
                                    id:each.id,
                                    platform: APIRes.type,
                                    cpuUsage: APIRes.cpuUsage<=100 ? APIRes.cpuUsage : 0,
                                    availMemory: APIRes.freeMemory,
                                    totalMemory: APIRes.totalMemory,
                                    usedMemory: APIRes.totalMemory - APIRes.freeMemory,
                                    uptime: APIRes.uptime > 60
                                        ? `${(APIRes.uptime / 60).toFixed(2)} Hours`
                                        : `${(APIRes.uptime).toFixed(0)} Minutes`,
                                    isRunning: true,
                                    environment: APIRes.environment,
                                });
                                const orgData = {status:true,hostname:APIRes.hostname,cpuUsage:APIRes.cpuUsage,cpu:APIRes.cpu,
                                    cpuCore:APIRes.cpuCore,totalMemory:APIRes.totalMemory,
                                    freeMemory:APIRes.freeMemory,uptime:APIRes.uptime,platform:APIRes.platform,
                                    environment:APIRes.environment,release:APIRes.release,machine:APIRes.machine,
                                    architecture:APIRes.architecture,type:APIRes.type};
                                setserverSystemInfo([...serverSystemInfo,{id:each.id,serverInfo:orgData}]);
                                firstTime.current = false;
                                if(customAlert && alertsEnabled){
                                    if(APIRes.cpuUsage>cpuThreshold || APIRes.freeMemory<memoryThreshold){
                                        setPopup('thresholdError');
                                    }
                                }
                            } else {
                                updateErrors({id:each.id,error:APIRes.error!==null ? APIRes.error : 'Fetch Error'});
                                if (APITries.current < maxAPIFailure) {
                                    APITries.current++;
                                } else {
                                    updateData(each.id, {
                                        ...dataRef.current[index],
                                        id:each.id,
                                        isRunning: false,
                                        totalMemory: 0,
                                        availMemory: 0,
                                        usedMemory: 0,
                                        cpuUsage: 0,
                                    });
                                    if(firstTime.current === false && alertsEnabled && serverDown) setPopup('error');
                                }
                            }
                        };
                    };

                    // Initial connection
                    socketRefs.current[each.id] = connectWebSocket(socketUrl, reconnect, maxRetries, retriesRef);

                    // Handling incoming WebSocket messages
                    socketRefs.current[each.id].onmessage = (event) => {
                        const APIRes = JSON.parse(event.data);

                        if (APIRes) {
                            updateData(each.id, {
                                ...dataRef.current[index],
                                id:each.id,
                                platform: APIRes.type,
                                cpuUsage: APIRes.cpuUsage<=100 ? APIRes.cpuUsage : 0,
                                availMemory: APIRes.freeMemory,
                                totalMemory: APIRes.totalMemory,
                                usedMemory: APIRes.totalMemory - APIRes.freeMemory,
                                uptime: APIRes.uptime > 60
                                    ? `${(APIRes.uptime / 60).toFixed(2)} Hours`
                                    : `${(APIRes.uptime).toFixed(0)} Minutes`,
                                isRunning: true,
                                environment: APIRes.environment,
                            });
                            const orgData = {status:true,hostname:APIRes.hostname,cpuUsage:APIRes.cpuUsage,cpu:APIRes.cpu,
                                cpuCore:APIRes.cpuCore,totalMemory:APIRes.totalMemory,
                                freeMemory:APIRes.freeMemory,uptime:APIRes.uptime,platform:APIRes.platform,
                                environment:APIRes.environment,release:APIRes.release,machine:APIRes.machine,
                                architecture:APIRes.architecture,type:APIRes.type};
                            setserverSystemInfo([...serverSystemInfo,{id:each.id,serverInfo:orgData}]);
                            firstTime.current = false;
                            if(customAlert && alertsEnabled){
                                if(APIRes.data.cpuUsage>cpuThreshold || APIRes.data.freeMemory<memoryThreshold){
                                    setPopup('thresholdError');
                                }
                            }
                        } else {
                            updateErrors({id:each.id,error:APIRes.error!==null ? APIRes.error : 'Fetch Error'});
                            if (APITries.current < maxAPIFailure) {
                                APITries.current++;
                            } else {
                                updateData(each.id, {
                                    ...dataRef.current[index],
                                    id:each.id,
                                    isRunning: false,
                                    totalMemory: 0,
                                    availMemory: 0,
                                    usedMemory: 0,
                                    cpuUsage: 0,
                                });
                                if(firstTime.current === false && alertsEnabled && serverDown) setPopup('error');
                            }
                        }
                    };

                    // On close, we are already handling reconnection logic within the `connectWebSocket` function.
                }
            });
        }

        return () => {
            // Clean up and close WebSocket connections when the component unmounts
            Object.values(socketRefs.current).forEach((socket) => {
                socket.close();
            });
        };
    }, [dataLoaded]);

    return <></>;
};

export default WebSocketAPIUpdate;
