import Cart from "../models/cart_model";
import { ICart } from "../types/interface";

export class CartService {
    async createCart(credential: Partial<ICart>): Promise<ICart | null> {
        try {
            const newCart = new Cart(credential);
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error creating cart:", error);
            return null;
        }
    }

    async findCartById(userId: string): Promise<ICart | null> {
        try {
            return await Cart.findOne({ user_id: userId }).populate("user_id").populate('products.product_id');
        } catch (error) {
            console.error("Error finding cart:", error);
            return null;
        }
    }

    async removeCart(userId: string): Promise<boolean> {
        try {
            const result = await Cart.deleteOne({ user_id: userId });
            return result.deletedCount > 0;
        } catch (error) {
            console.error("Error removing cart:", error);
            return false;
        }
    }
}