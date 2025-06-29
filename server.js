const express = require('express');

const app = express();

const PORT = 3000;
const HOST = '0.0.0.0'; // Added this line

app.get('/', (req, res) => {
  res.send('Hello asif DevOps!');
});

// Modified this line to include HOST
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`); // Modified console log
});
