# Server Finder

## Description
Finds the online server with the lowest priority from a list of servers.

## Features
- Runs HTTP GET requests in parallel to check server status.
- Considers servers online only if their response status is 200–299.
- Automatically times out requests after 5 seconds.
- Returns the online server with the lowest priority or throws an error if none are online.

## Setup
1. Install dependencies:
   ```bash
   npm install

2. Test command:
    ```bash
    npm test
