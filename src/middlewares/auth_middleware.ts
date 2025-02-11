import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/error_handler";
import jwt from "jsonwebtoken";

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.cookies.token;
        
        if (!token) {
            return ErrorHandler.sendError(response, 400, "Authentication Required");
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        // Decode token using the JWT secret
        const decodeToken = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

        // Check if the token contains the 'id' field
        if (decodeToken.id) {
            request.body.userId = decodeToken.id;
            return next();  // Proceed to the next middleware or route handler
        } else {
            return ErrorHandler.sendError(response, 400, "Invalid token. Please log in again.");
        }
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        return ErrorHandler.sendError(response, 500, "Server Error");
    }
};
