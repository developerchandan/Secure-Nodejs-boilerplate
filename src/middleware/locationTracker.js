const geoip = require('geoip-lite');
const logger = require('../utils/logger');

const locationTracker = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  if (geo) {
    req.userLocation = {
      country: geo.country,
      region: geo.region,
      city: geo.city,
      ll: geo.ll // latitude and longitude
    };
    logger.info(`Request from ${ip} - Location: ${geo.city}, ${geo.country}`);
  } else {
    req.userLocation = null;
    logger.info(`Request from ${ip} - Location: Unknown`);
  }

  next();
};

module.exports = locationTracker;