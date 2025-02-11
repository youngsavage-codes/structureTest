import { Request, Response } from "express";
import { 
    createCartLogic, 
    fetchCartByIdLogic, 
    addItemToCartLogic, 
    removeCartLogic, 
    clearItemsFromCartLogic,
    removeItemFromCartLogic } from "../logics/cart_logic";
import ErrorHandler from "../utils/error_handler";

class CartController {
    async createCartController(request: Request, response: Response) {
        try {
            return await createCartLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to Create Cart.");
        }
    }

    async fetchCartByIdController(request: Request, response: Response) {
        try {
            return await fetchCartByIdLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to add product.");
        }
    }

    async addItemToCartController(request: Request, response: Response) {
        try {
            return await addItemToCartLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to add product.");
        }
    }

    async removeItemToCartController(request: Request, response: Response) {
        try {
            return await removeItemFromCartLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to add product.");
        }
    }

    async clearItemFromCartController(request: Request, response: Response) {
        try {
            return await clearItemsFromCartLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to add product.");
        }
    }

    async removeCartController(request: Request, response: Response) {
        try {
            return await removeCartLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to add product.");
        }
    }
}

export default CartController