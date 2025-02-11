import { Request, Response } from "express";
import { 
    createOrderLogic, 
    fetchAllOrderLogic, 
    fetchOrderByIdLogic, 
    fetchUserOrderLogic } from "../logics/order_logic";

class OrderController {
    async createOrderController(request: Request, response: Response) {
        try {
            return await createOrderLogic(request, response);
        } catch(error) {
            return null
        }
    }
    
    async fetchAllOrderController(request: Request, response: Response) {
        try {
            return await fetchAllOrderLogic(request, response);
        } catch(error) {
            return null
        }
    }

    async fetchUserOrderController(request: Request, response: Response) {
        try {
            return await fetchUserOrderLogic(request, response);
        } catch(error) {
            return null
        }
    }

    async fetchOrderByIdController(request: Request, response: Response) {
        try {
            return await fetchOrderByIdLogic(request, response);
        } catch(error) {
            return null
        }
    }
}

export default OrderController