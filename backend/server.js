const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS for the frontend origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Debug incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));