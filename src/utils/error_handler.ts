import { Response } from 'express';

interface ErrorResponse {
  success: boolean;
  message: string;
  details?: string | object; // Optional field for extra details
}

class ErrorHandler {
  static sendError(res: Response, statusCode: number, message: string, details?: string | object) {
    return res.status(statusCode).json({
      success: false,
      message,
      details: details || null, // Send details if available, otherwise send null
    });
  }
}

export default ErrorHandler;
