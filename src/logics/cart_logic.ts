import { Request, Response } from "express";
import { CartService } from "../service/cart_service";
import ErrorHandler from "../utils/error_handler";
import { Types } from "mongoose"; // Import ObjectId

const cartService = new CartService();

export const fetchCartByIdLogic = async (request: Request, response: Response) => {
    try {
        const { userId } = request.body;

        if (!userId) {
            return ErrorHandler.sendError(response, 400, "Credential Required");
        }

        const cart = await cartService.findCartById(userId);

        if (!cart) {
            const createCart = await cartService.createCart({user_id: userId});

            if (!createCart) {
                return ErrorHandler.sendError(response, 400, "Cart Not Created");
            }

            return createCart
        }
        

        return response.status(200).json({
            success: true,
            message: "Cart Fetched",
            cart,
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
}

export const createCartLogic = async (request: Request, response: Response) => {
    try {
        const { userId } = request.body;

        if (!userId) {
            return ErrorHandler.sendError(response, 400, "Credential Required");
        }

        const cartExist = await cartService.findCartById(userId);

        if (cartExist) {
            return ErrorHandler.sendError(response, 400, "Cart Already Exists");
        }

        const cart = await cartService.createCart({user_id: userId});

        if (!cart) {
            return ErrorHandler.sendError(response, 400, "Cart Not Created");
        }

        return response.status(200).json({
            success: true,
            message: "Cart Created",
            cart,
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};

export const addItemToCartLogic = async (request: Request, response: Response) => {
    try {
        const { userId, productId } = request.body;

        if (!userId || !productId) {
            return ErrorHandler.sendError(response, 400, "User ID and Product ID are required");
        }

        // Convert productId to ObjectId for accurate comparison
        const productObjectId = new Types.ObjectId(productId);

        // Find the user's cart
        let cart = await cartService.findCartById(userId);

        if (!cart) {
            // If cart doesn't exist, create a new one
            cart = await cartService.createCart({ user_id: userId, products: [] });

            if (!cart) {
                return ErrorHandler.sendError(response, 400, "Failed to create cart");
            }
        }

        // Ensure cart.products is initialized
        if (!cart.products) {
            cart.products = [];
        }

        // Check if the product already exists in the cart
        const productInCart = cart.products.find(item => item.product_id.equals(productObjectId));

        if (productInCart) {
            // If the product exists, update the quantity
            productInCart.quantity += 1;
        } else {
            // Otherwise, add a new product entry
            cart.products.push({
                product_id: productObjectId, // Ensure correct type
                quantity: 1,
            });
        }

        // Save the updated cart
        await cart.save();

        return response.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cart,
        });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};


export const removeItemFromCartLogic = async (request: Request, response: Response) => {
    try {
        const { userId, productId } = request.body;

        if (!userId || !productId) {
            return ErrorHandler.sendError(response, 400, "User ID and Product ID are required");
        }

        const cart = await cartService.findCartById(userId);

        if (!cart) {
            return ErrorHandler.sendError(response, 400, "Cart Does Not Exist");
        }

        // Convert productId to ObjectId for accurate comparison
        const productObjectId = new Types.ObjectId(productId);

        // Find the product in the cart
        const productInCart = cart.products.find(item => item.product_id.equals(productObjectId));

        if (!productInCart) {
            return ErrorHandler.sendError(response, 400, "Product not found in cart");
        }

        // If quantity is greater than 1, reduce it by 1
        if (productInCart.quantity > 1) {
            productInCart.quantity -= 1;
        } else {
            // If quantity is 1, remove the product from the cart
            const productIndex = cart.products.findIndex(item => item.product_id.equals(productObjectId));
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
            }
        }

        await cart.save();

        return response.status(200).json({
            success: true,
            message: productInCart.quantity > 0 
                ? "Product quantity reduced successfully" 
                : "Product removed from cart successfully",
            cart,
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};

export const clearItemsFromCartLogic = async (request: Request, response: Response) => {
    try {
        const { userId } = request.body;

        if (!userId) {
            return ErrorHandler.sendError(response, 400, "User ID is required");
        }

        const cart = await cartService.findCartById(userId);

        if (!cart) {
            return ErrorHandler.sendError(response, 400, "Cart Does Not Exist");
        }

        // Remove all products from the cart
        cart.products.splice(0);

        // Save the updated cart
        await cart.save();

        return response.status(200).json({
            success: true,
            message: "All items removed from cart successfully",
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};


export const removeCartLogic = async (request: Request, response: Response) => {
    try {
        const { userId } = request.body;

        if (!userId) {
            return ErrorHandler.sendError(response, 400, "User ID is required");
        }

        const cart = await cartService.findCartById(userId);

        if (!cart) {
            return ErrorHandler.sendError(response, 400, "Cart Does Not Exist");
        }

        await cartService.removeCart(userId);

        return response.status(200).json({
            success: true,
            message: "Cart removed successfully",
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};
