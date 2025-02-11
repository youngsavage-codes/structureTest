import mongoose, { Schema, model } from "mongoose";
import { IOrder } from "../types/interface";

// Define the schema
const orderSchema = new Schema<IOrder>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, min: 1, required: true },
        amount: { type: Number, required: true }
    }],
    total: { type: Number, required: true, default: 0 },
    payment_status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }
}, { timestamps: true });

const Order = model<IOrder>('Order', orderSchema);

export default Order;