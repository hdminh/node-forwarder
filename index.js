const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Forwarding route
app.use('/', async (req, res) => {
  try {
    const baseUrl = 'https://smilegate.onstove.com';

    // Construct the full target URL by appending the path and query parameters
    const targetUrl = new URL(req.originalUrl, baseUrl);

    // Forward the request to the target URL using Axios
    const response = await axios({
      method: req.method,
      url: targetUrl.toString(),
      data: req.body,
      headers: { ...req.headers, host: new URL(baseUrl).host },
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error forwarding request', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Forwarder server running on port ${PORT}`);
});