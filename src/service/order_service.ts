import Order from "../models/orders_model"
import { IOrder } from "../types/interface"

class OrderService {
    async createOrder(credential: Partial<IOrder>): Promise<IOrder | null> {
        try {
            const order = new Order(credential);
            order.save();
            return order
        } catch(error) {
            return null
        }
    }

    async fetchAllOrder(): Promise<IOrder[] | null>  {
        try {
            return await Order.find();
        } catch(error) {
            return null
        }
    }

    async fetchUserOrder(userId: string): Promise<IOrder[] | null> {
        try {
            return await Order.find({user_id: userId}).populate("user_id").populate("products.product_id");
        } catch(error) {
            return null
        }
    }

    async fetchOrderById(orderId: string): Promise<IOrder | null> {
        try {
            return await Order.findOne({_id: orderId});
        } catch(error) {
            return null
        }
    }
}

export default OrderService