import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = async (userId: string): Promise<string> => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET, // Ensured it is defined before use
        { expiresIn: "7d" }
    );
};
