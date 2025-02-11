import { Types } from "mongoose";
import User from "../models/user_model";
import { IUser } from "../types/interface";

class UserService {
    async createUser(credentials: IUser): Promise<IUser | null> {
        console.log('loaded Service');
        try {
            const newUser = new User(credentials);
            await newUser.save();
            return newUser
        } catch(error) {
            return null
        }
    }

    async findEmail(email: string): Promise<IUser | null> {
        try {
            const user = await User.findOne({email})
            return user
        } catch(error) {
            return null
        }
    }

    async findAllUsers(): Promise<IUser[] | null> {
        try {
            const users = await User.find().select("-password");
            return users
        } catch(error) {
            return null
        }
    }

    async findUserById(userId: string): Promise<IUser | null> {
        try {
            if(!Types.ObjectId.isValid(userId)) {
                return null
            }

            const users = await User.findById(userId).select("-password")
            return users
        } catch(error) {
            return null
        }
    }

    async updateUser(userId: string, credentials: IUser): Promise<IUser | null> {
        try {
            if(!Types.ObjectId.isValid(userId)) {
                return null
            }

            const users = await User.findByIdAndUpdate(userId, { $set: credentials }, {new: true});
            return users
        } catch(error) {
            return null;
        }
    }
}

export default UserService;