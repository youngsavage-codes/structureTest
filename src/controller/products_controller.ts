import { Request, Response } from "express";
import { 
    addProductLogic, 
    removeProductLogic, 
    updateProductLogic, 
    fetchAllProductsLogic, 
    fetchSingleProductLogic 
} from "../logics/products_logic";
import ErrorHandler from "../utils/error_handler";

class ProductController {
    
    addProductController = async (request: Request, response: Response) => {
        try {
            return await addProductLogic(request, response);
        } catch (error) {
            console.error("Error in addProductController:", error);
            return ErrorHandler.sendError(response, 500, "Failed to add product.");
        }
    };

    removeProductController = async (request: Request, response: Response) => {
        try {
            return await removeProductLogic(request, response);
        } catch (error) {
            console.error("Error in removeProductController:", error);
            return ErrorHandler.sendError(response, 500, "Failed to remove product.");
        }
    }; 

    updateProductController = async (request: Request, response: Response) => {
        try {
            return await updateProductLogic(request, response);
        } catch (error) {
            console.error("Error in updateProductController:", error);
            return ErrorHandler.sendError(response, 500, "Failed to update product.");
        }
    };

    fetchAllProductController = async (request: Request, response: Response) => {
        try {
            return await fetchAllProductsLogic(request, response);
        } catch (error) {
            console.error("Error in fetchAllProductController:", error);
            return ErrorHandler.sendError(response, 500, "Failed to fetch products.");
        }
    };

    fetchSingleProductController = async (request: Request, response: Response) => {
        try {
            return await fetchSingleProductLogic(request, response);
        } catch (error) {
            console.error("Error in fetchSingleProductController:", error);
            return ErrorHandler.sendError(response, 500, "Failed to fetch product.");
        }
    };
}

export default ProductController;
