const jobService = require('../services/jobService');
const { validateJob } = require('../utils/validator');

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json({ status: 'success', data: jobs });
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).json({ status: 'error', message: error.details[0].message });

    const job = await jobService.createJob(req.body, req.userData.userId);
    res.status(201).json({ status: 'success', data: job });
  } catch (error) {
    next(error);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ status: 'error', message: 'Job not found' });
    res.status(200).json({ status: 'success', data: job });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).json({ status: 'error', message: error.details[0].message });

    const job = await jobService.updateJob(req.params.id, req.body, req.userData.userId);
    if (!job) return res.status(404).json({ status: 'error', message: 'Job not found or you are not authorized to update it' });
    res.status(200).json({ status: 'success', data: job });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await jobService.deleteJob(req.params.id, req.userData.userId);
    if (!job) return res.status(404).json({ status: 'error', message: 'Job not found or you are not authorized to delete it' });
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};