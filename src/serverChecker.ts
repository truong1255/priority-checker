import axios from 'axios'

/**
* Check if a server is online.
* @param url Server URL.
* @returns A Promise resolving true if online, false if offline.
*/
export const isServerOnline = async (url: string): Promise<boolean> => {
    try {
        const response = await axios.get(url, { timeout: 5000 });
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        return false;
    }
};