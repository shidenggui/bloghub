// for 301

const express = require('express');
require('dotenv').config()

const app = express();
const BASE_HOST = process.env.BASE_HOST || 'https://bloghub.fun'

app.get('/*', (req, res) => {
  res.redirect(301, `${BASE_HOST}${req.originalUrl}`)
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
