const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const locationTracker = require('./middleware/locationTracker');
const logger = require('./utils/logger');
const auth = require('./middleware/auth');

const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


// Apply location tracking to all routes
app.use(locationTracker);

// Apply rate limiter
app.use('/api', rateLimiter);

// Serve static files from the public/uploads directory
app.use('/public/uploads', express.static('public/uploads'));

app.use('/api/v1', routes);


app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found'
  });
});

app.use(errorHandler);

module.exports = app;