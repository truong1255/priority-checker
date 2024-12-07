import { findServer } from '../src/findServer';
import { Server } from '../src/types';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('findServer', () => {
  const servers: Server[] = [
    { url: 'https://does-not-work.perfume.new', priority: 1 },
    { url: 'https://gitlab.com', priority: 4 },
    { url: 'http://app.scnt.me', priority: 3 },
    { url: 'https://offline.scentronix.com', priority: 2 },
  ];

  it('should resolve to the online server with the lowest priority', async () => {
    mockedAxios.get
      .mockRejectedValueOnce(new Error('Network error')) // does-not-work.perfume.new
      .mockResolvedValueOnce({ status: 200 })            // gitlab.com
      .mockResolvedValueOnce({ status: 200 })            // app.scnt.me
      .mockRejectedValueOnce(new Error('Timeout'));      // offline.scentronix.com

    const result = await findServer(servers);

    expect(result).toEqual({ url: 'http://app.scnt.me', priority: 3, isOnline: true });
  });

  it('should throw an error if no servers are online', async () => {
    // All servers are mocked as offline
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(findServer(servers)).rejects.toThrow('No servers are online');
  });
});
