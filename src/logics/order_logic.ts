import { Request, Response } from "express";
import OrderService from "../service/order_service";
import UserService from "../service/user_service";
import ErrorHandler from "../utils/error_handler";

const orderService = new OrderService();
const userService = new UserService();

export const fetchAllOrderLogic = async (request: Request, response: Response) => {
    try { 
        const order = await orderService.fetchAllOrder();

        if(!order || order.length === 0) {
            return ErrorHandler.sendError(response, 404, "No Order Found");
        }

        return response.status(200).json({
            success: true,
            message: "Orders Fetched",
            order
        })
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
}

export const fetchUserOrderLogic = async (request: Request, response: Response) => {
    try { 
        const { userId } = request.body;

        if(!userId) {
            return ErrorHandler.sendError(response, 404, "No Order Found");
        }

        const userExist = await userService.findUserById(userId);

        if(!userExist || !userExist._id) {
            return ErrorHandler.sendError(response, 404, "User Dosent Exist");
        }

        const order = await orderService.fetchUserOrder(userExist._id);

        if(!order || order.length === 0) {
            return ErrorHandler.sendError(response, 404, "No Order Found");
        }

        return response.status(200).json({
            success: true,
            message: "Orders Fetched",
            order
        })
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
}

export const fetchOrderByIdLogic = async (request: Request, response: Response) => {
    try {
        const { orderId } = request.params;

        if(!orderId) {
            return ErrorHandler.sendError(response, 404, "No Order Found");
        }

        const order = await orderService.fetchOrderById(orderId);

        if(!order) {
            return ErrorHandler.sendError(response, 404, "No Order Found");
        }

        return response.status(200).json({
            success: true,
            message: "Order Fetched",
            order
        })
    } catch(error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
}

export const createOrderLogic = async (request: Request, response: Response) => {
    try {
        const { userId, products, total } = request.body;

        // Validation check
        if (!userId || !Array.isArray(products) || products.length === 0 || !total) {
            return ErrorHandler.sendError(response, 400, "Required Credential");
        }

        // Construct the order payload
        const orderPayload = {
            user_id: userId,
            products: products.map((item: any) => ({
                product_id: item.product_id, // Assuming the product contains `productId`
                quantity: item.quantity, 
                amount: item.amount
            })),
            total: total
        };

        // Create the order
        const createdOrder = await orderService.createOrder(orderPayload);

        if (!createdOrder) {
            return ErrorHandler.sendError(response, 500, "Failed to create order");
        }

        // Return success response
        return response.status(201).json({
            success: true,
            message: "Order created successfully",
            order: createdOrder
        });

    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};

