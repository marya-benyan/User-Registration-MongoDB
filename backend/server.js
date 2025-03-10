const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS for the frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from Vite dev server
  credentials: true, // Allow cookies to be sent with requests
}));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));