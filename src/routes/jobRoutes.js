const express = require('express');
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', jobController.getAllJobs);
router.post('/', auth, jobController.createJob);
router.get('/:id', jobController.getJob);
router.put('/:id', auth, jobController.updateJob);
router.delete('/:id', auth, jobController.deleteJob);

module.exports = router;