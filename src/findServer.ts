import { Server } from './types';
import { isServerOnline } from './serverChecker';

/**
* Finds the online server with the lowest priority.
* @param servers Array of servers.
* @returns A Promise that resolves to the lowest priority online server.
*/
export const findServer = async (servers: Server[]): Promise<Server> => {
  const serverStatusPromises = servers.map(async (server) => {
    const isOnline = await isServerOnline(server.url);
    return { ...server, isOnline };
  });

  const serverStatuses = await Promise.all(serverStatusPromises);

  const onlineServers = serverStatuses.filter((server) => server.isOnline);

  if (onlineServers.length === 0) {
    throw new Error('No servers are online');
  }

  // Sort by priority (ascending) and return the server with the lowest priority
  onlineServers.sort((a, b) => a.priority - b.priority);

  return onlineServers[0];
};