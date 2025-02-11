export const generateDigits = (): string => {
    return String(Math.floor(100000 + Math.random() * 900000)); // Ensures a 6-digit OTP (100000 - 999999)
};