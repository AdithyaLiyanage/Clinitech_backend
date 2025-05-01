const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const drugRoutes = require('./routes/drugRoutes');

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', drugRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Clinitech Drug Management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
