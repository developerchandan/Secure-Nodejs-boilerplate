const app = require('./app');
const { PORT } = require('./config/environment');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

connectDB();

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection! Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});