'use server'
import { cookies } from 'next/headers';
interface data{
    apiInterval?: number,
    apiHistoryLimit?: number,
    maxAPIFailure?: number,
    alertsEnabled?: boolean,
    customAlert?: boolean,
    cpuThreshold?: number,
    memoryThreshold?: number,
    serverDown?: boolean
}
export default async function setApiConfigCookies({
  apiInterval = 5000,
  apiHistoryLimit = 100,
  maxAPIFailure = 5,
  alertsEnabled = false,
  customAlert = false,
  cpuThreshold = 80,
  memoryThreshold = 80,
  serverDown = false,
    }:data) {
  // Check for existing cookie
  const existingCookie = cookies().get('apiConfig');

  const apiConfig = {
    apiInterval,
    apiHistoryLimit,
    maxAPIFailure,
    alertsEnabled,
    customAlert,
    cpuThreshold,
    memoryThreshold,
    serverDown,
  };

  if (existingCookie) {
    // Parse and return the existing values
    const parsedConfig = JSON.parse(existingCookie.value);
    
    // Return the retrieved values with isCreated = false
    return {
      isCreated: false,
      retrievedData: parsedConfig,
    };
  } else {
    // No existing cookie, so create a new one
    const cookieValue = JSON.stringify(apiConfig);

    // Set the cookie with default values
    cookies().set({
      name: 'apiConfig',
      value: cookieValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Return isCreated = true, no retrieved data
    return {
      isCreated: true,
      retrievedData: null,
    };
  }
}
export async function updateApiConfigCookie(setting:string, value:string|number|boolean) {
    // Retrieve the existing cookie
    const existingCookie = cookies().get('apiConfig');
  
    if (!existingCookie) {
      return {
        success: false,
        message: 'No existing cookie found. Please create the cookie first.',
      };
    }
  
    // Parse the existing cookie value
    const apiConfig = JSON.parse(existingCookie.value);
  
    // Use a switch statement to update the specific setting
    switch (setting) {
      case 'apiInterval':
        apiConfig.apiInterval = value;
        break;
      case 'apiHistoryLimit':
        apiConfig.apiHistoryLimit = value;
        break;
      case 'maxAPIFailure':
        apiConfig.maxAPIFailure = value;
        break;
      case 'alertsEnabled':
        apiConfig.alertsEnabled = value;
        break;
      case 'customAlert':
        apiConfig.customAlert = value;
        break;
      case 'cpuThreshold':
        apiConfig.cpuThreshold = value;
        break;
      case 'memoryThreshold':
        apiConfig.memoryThreshold = value;
        break;
      case 'serverDown':
        apiConfig.serverDown = value;
        break;
      default:
        return {
          success: false,
          message: `Invalid setting: ${setting}`,
        };
    }
  
    // Stringify the updated object and set the updated cookie
    const cookieValue = JSON.stringify(apiConfig);
  
    cookies().set({
      name: 'apiConfig',
      value: cookieValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  
    return {
      success: true,
      message: `${setting} updated successfully`,
      updatedConfig: apiConfig,
    };
  }