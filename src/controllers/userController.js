const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateUser, validateLogin } = require('../utils/validator');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/environment');

const signToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

exports.register = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ status: 'error', message: error.details[0].message });

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ status: 'error', message: 'User already exists' });

    const user = await User.create({ name, email, password });

    const token = signToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ status: 'error', message: error.details[0].message });

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }

    // If everything is ok, send token to client
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};