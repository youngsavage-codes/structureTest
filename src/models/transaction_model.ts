import mongoose, { Schema, model } from "mongoose";
import { ITransaction } from "../types/interface";


// Define the schema
const transactionSchema = new Schema<ITransaction>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    payment_method: { type: String, enum: ["card", "bank_transfer", "crypto", "not paid"], default: "not paid", required: true },
    payment_reference: { type: String, required: true, unique: true }
}, { timestamps: true });

// Create the model
const Transaction = model<ITransaction>("Transaction", transactionSchema);

export default Transaction;