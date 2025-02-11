import mongoose from 'mongoose';
import 'dotenv/config'

export const connectDB = async () => {
    try {
        if(!process.env.MONGO_URI) {
            throw new Error("Invalid Mongoose Uri");
        }
    
        await mongoose.connect(`${process.env.MONGO_URI}`)
    
        mongoose.connection.on('connected', () => console.log('DB Connected'));
        mongoose.connection.on('error', (err) => console.log(err));
    } catch(err) {
        console.log(err)
    }
}

