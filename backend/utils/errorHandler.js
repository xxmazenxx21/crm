// Custom Error Handler
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;

// Error handling middleware
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Invalid JWT Token
  if (err.name === 'JsonWebTokenError') {
    err.message = 'Invalid JWT Token';
    err.statusCode = 401;
  }

  // JWT Expired
  if (err.name === 'TokenExpiredError') {
    err.message = 'JWT Token Expired';
    err.statusCode = 401;
  }

  // Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    err.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
