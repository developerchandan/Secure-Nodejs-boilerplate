const Job = require('../models/Job');

exports.getAllJobs = async () => {
  return await Job.find().populate('postedBy', 'name');
};

exports.createJob = async (jobData, userId) => {
  return await Job.create({ ...jobData, postedBy: userId });
};

exports.getJobById = async (id) => {
  return await Job.findById(id).populate('postedBy', 'name');
};

exports.updateJob = async (id, jobData, userId) => {
  return await Job.findOneAndUpdate(
    { _id: id, postedBy: userId },
    jobData,
    { new: true, runValidators: true }
  );
};

exports.deleteJob = async (id, userId) => {
  return await Job.findOneAndDelete({ _id: id, postedBy: userId });
};