const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/utils/logger');

// Routes
const authRoutes = require('./src/routes/auth');
const studentRoutes = require('./src/routes/students');
const teacherRoutes = require('./src/routes/teachers');
const resultRoutes = require('./src/routes/results');
const noticeRoutes = require('./src/routes/notices');
const admissionRoutes = require('./src/routes/admissions');
const dashboardRoutes = require('./src/routes/dashboard');

const app = express();

// Connect Database
connectDB();

// Security Middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Please try again later.' }
});

app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', school: 'BBS Smart Public School', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`🚀 BBS School Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
