import { Request, Response } from 'express';
import ProductService from '../service/product_service';
import ErrorHandler from '../utils/error_handler';

const product_service = new ProductService();

// Utility function for validation
const validateProductData = (data: any) => {
    const { name, description, price, category, brand, stock, images } = data;
    if (!name || !description || !price || !category || !brand || !stock || !images || !Array.isArray(images)) {
        return "All fields are required and images must be an array.";
    }
    if (images.length === 0) {
        return "At least one product image is required.";
    }
    return null; // No validation error
};

// Add Product Logic
export const addProductLogic = async (request: Request, response: Response) => {
    try {
        const validationError = validateProductData(request.body);
        if (validationError) {
            return ErrorHandler.sendError(response, 400, validationError);
        }

        const productData = { ...request.body };
        const newProduct = await product_service.addProduct(productData);

        if (!newProduct) {
            return ErrorHandler.sendError(response, 500, "Product could not be added.");
        }

        return response.status(201).json({
            success: true,
            message: "Product added successfully.",
            product: newProduct,
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};

// Fetch All Products Logic
export const fetchAllProductsLogic = async (request: Request, response: Response) => {
    try {
        const products = await product_service.fetchAllProduct();

        if (!products || products.length === 0) {
            return ErrorHandler.sendError(response, 404, "No products found.");
        }

        return response.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};

// Fetch Single Product Logic
export const fetchSingleProductLogic = async (request: Request, response: Response) => {
    try {
        const { productId } = request.params;
        if (!productId) {
            return ErrorHandler.sendError(response, 400, "Product Id is required.");
        }

        const product = await product_service.fetchSingleProductById(productId);
        if (!product) {
            return ErrorHandler.sendError(response, 404, "Product not found.");
        }

        return response.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            product,
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};

// Remove Product Logic
export const removeProductLogic = async (request: Request, response: Response) => {
    try {
        const { productId } = request.params;
        if (!productId) {
            return ErrorHandler.sendError(response, 400, "Product Id is required.");
        }

        const productExist = await product_service.fetchSingleProductById(productId);
        if (!productExist) {
            return ErrorHandler.sendError(response, 404, "Product not found.");
        }

        const removedProduct = await product_service.removeProduct(productId);
        if (!removedProduct) {
            return ErrorHandler.sendError(response, 500, "Product could not be removed.");
        }

        return response.status(200).json({
            success: true,
            message: "Product removed successfully.",
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};

// Update Product Logic
export const updateProductLogic = async (request: Request, response: Response) => {
    try {
        const { productId } = request.params;
        if (!productId) {
            return ErrorHandler.sendError(response, 400, "Product Id is required.");
        }

        const validationError = validateProductData(request.body);
        if (validationError) {
            return ErrorHandler.sendError(response, 400, validationError);
        }

        const updatedProduct = await product_service.updateProduct(productId, request.body);
        if (!updatedProduct) {
            return ErrorHandler.sendError(response, 404, "Product not updated.");
        }

        return response.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: updatedProduct,
        });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error");
    }
};
