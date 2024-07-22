const Joi = require('joi');

exports.validateJob = (job) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.number().min(0),
    jobType: Joi.string().valid('full-time', 'part-time', 'contract', 'internship'),
  });

  return schema.validate(job);
};

exports.validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};

exports.validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};