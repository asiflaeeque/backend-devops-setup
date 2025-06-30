const express = require('express');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0'; // Modified: Changed from 'localhost' to '0.0.0.0' for Docker compatibility

app.get('/', (req, res) => {
  res.send('Hello DevOps!'); // Original: Hello Asif DevOps! -- test expects 'Hello DevOps!'
});

// Only start the server if this file is run directly (not imported as a module)
if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

// Export the app for testing
module.exports = app;
