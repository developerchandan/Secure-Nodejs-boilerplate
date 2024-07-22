const express = require('express');
const jobRoutes = require('./jobRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/jobs', jobRoutes);
router.use('/users', userRoutes);

module.exports = router;