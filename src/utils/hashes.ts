import bcrypt from 'bcryptjs';

export const createHash = (password: string) => {
    return bcrypt.hash(password, 10);
}

export const compareHash = (password: string, newPassword: string) => {
    return bcrypt.compare(password, newPassword)
} 