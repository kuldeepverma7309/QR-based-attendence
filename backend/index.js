const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Import Routes
const authRoutes = require('./routes/auth');
const qrCodeRoutes = require('./routes/qrCodeRoutes');
const eventRoute = require('./routes/event');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/qrcode', qrCodeRoutes);
app.use('/api/event', eventRoute);

// Home Route
app.get('/', (req, res) => {
  res.send('QRCodeAttend API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
