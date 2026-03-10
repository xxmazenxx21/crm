import ErrorHandler from '../utils/errorHandler.js';

export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ErrorHandler('Unauthorized', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ErrorHandler(
        `Role "${req.user.role}" is not allowed to access this resource`,
        403
      );
    }

    next();
  };
};
