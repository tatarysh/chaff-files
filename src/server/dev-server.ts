
import express from 'express';
import { generateChaffResponse } from "../index";

const app = express();
const port = 3000;

app.use((req, res) => {
  console.log(`[${new Date().toISOString()}] Attempted access to path: ${req.path}`);
  const chaffResponse = generateChaffResponse(req.path);
  res.status(200).type(chaffResponse.type).send(chaffResponse.content);
});

app.listen(port, () => {
  console.log(`Development server running at http://localhost:${port}`);
});
