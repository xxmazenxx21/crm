import User from '../models/User.js';
import ErrorHandler from '../utils/errorHandler.js';

// Get all users (manager only)
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ role: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Get users by role (manager only)
export const getUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.params;

    if (!['sales', 'manager'].includes(role)) {
      throw new ErrorHandler('Invalid role', 400);
    }

    const users = await User.find({ role }).select('-password').sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
