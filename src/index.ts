import generators from "./generators/index";
import { ChaffResponse } from "./types/index";

/**
 * Generates a fake hacker response.
 * This is the main function of the chaff-files package.
 *
 * @param requestPath - The request path that triggered the response.
 * @returns A ChaffResponse object containing the content and type.
 */
export function generateChaffResponse(requestPath: string): ChaffResponse {
  const lowerCasePath = requestPath.toLowerCase();
  for (const { pattern, generator } of generators) {
    if (pattern.test(lowerCasePath)) {
      return generator(lowerCasePath);
    }
  }

  // Default response if no pattern matches
  const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const timestamp = new Date().toISOString();
  const htmlContent = `
    <body style="background-color: black; color: green; font-family: 'Courier New', Courier, monospace;">
    <pre>
    [${timestamp}] Connection established from ${ip}
    [${timestamp}] Accessing restricted path: ${requestPath}
    [${timestamp}] Bypassing security protocols...
    [${timestamp}] Security breach detected!
    [${timestamp}] Initiating counter-measures...
    [${timestamp}] ERROR: Permission denied. You have been logged.
    </pre>
    </body>
  `;

  return { content: htmlContent, type: 'html' };
}

// Example usage:
// In a Node.js Express server:
/*
import express from 'express';
import { generateChaffResponse } from '@rysh/chaff-files';

const app = express();

app.use((req, res) => {
  const chaffResponse = generateChaffResponse(req.path);
  res.status(403).send(chaffResponse);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
*/

// For browser usage, you can directly call the function.
// const response = generateChaffResponse('/admin/dashboard');
// document.body.innerHTML = response;