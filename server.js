const express = require('express');
const path = require('path');
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve Static Files (The React Build)
app.use(express.static(path.join(__dirname, 'dist')));

// -----------------------------------------------------
// API Placeholder Routes
// In the future, you will connect these to the PostgreSQL database
// using the 'pg' library.
// -----------------------------------------------------

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', db: 'disconnected (mock mode)' });
});

// Example: How you would fetch users
// const { Pool } = require('pg');
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// app.get('/api/users', async (req, res) => {
//    const result = await pool.query('SELECT * FROM users');
//    res.json(result.rows);
// });

// -----------------------------------------------------

// Handle React Routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}`);
});
