const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};