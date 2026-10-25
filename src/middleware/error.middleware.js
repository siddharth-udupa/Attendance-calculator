import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isServerError = status >= 500;

  // Never expose internal error details (e.g. raw SQL queries) to clients.
  const message = isServerError
    ? "Something went wrong. Please try again later."
    : err.message || "Request failed";

  logger.error(`API Error: ${err.message || message}`, err, {
    path: req.path,
    method: req.method,
    status
  });

  res.status(status).json({
    message: message
  });
};
