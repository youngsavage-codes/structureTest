import mongoose, { Schema, model } from 'mongoose'
import { ICart } from '../types/interface'

const cartSchema = new Schema<ICart>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 1 },
        total: { type: Number }
    }]
},   { timestamps: true })

const Cart = model<ICart>("Cart", cartSchema)

export default Cart;