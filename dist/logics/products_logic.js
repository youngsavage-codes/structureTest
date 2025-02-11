"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductLogic = exports.removeProductLogic = exports.fetchSingleProductLogic = exports.fetchAllProductsLogic = exports.addProductLogic = void 0;
const product_service_1 = __importDefault(require("../service/product_service"));
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const product_service = new product_service_1.default();
// Utility function for validation
const validateProductData = (data) => {
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
const addProductLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationError = validateProductData(request.body);
        if (validationError) {
            return error_handler_1.default.sendError(response, 400, validationError);
        }
        const productData = Object.assign({}, request.body);
        const newProduct = yield product_service.addProduct(productData);
        if (!newProduct) {
            return error_handler_1.default.sendError(response, 500, "Product could not be added.");
        }
        return response.status(201).json({
            success: true,
            message: "Product added successfully.",
            product: newProduct,
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.addProductLogic = addProductLogic;
// Fetch All Products Logic
const fetchAllProductsLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service.fetchAllProduct();
        if (!products || products.length === 0) {
            return error_handler_1.default.sendError(response, 404, "No products found.");
        }
        return response.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.fetchAllProductsLogic = fetchAllProductsLogic;
// Fetch Single Product Logic
const fetchSingleProductLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = request.params;
        if (!productId) {
            return error_handler_1.default.sendError(response, 400, "Product Id is required.");
        }
        const product = yield product_service.fetchSingleProductById(productId);
        if (!product) {
            return error_handler_1.default.sendError(response, 404, "Product not found.");
        }
        return response.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            product,
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.fetchSingleProductLogic = fetchSingleProductLogic;
// Remove Product Logic
const removeProductLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = request.params;
        if (!productId) {
            return error_handler_1.default.sendError(response, 400, "Product Id is required.");
        }
        const productExist = yield product_service.fetchSingleProductById(productId);
        if (!productExist) {
            return error_handler_1.default.sendError(response, 404, "Product not found.");
        }
        const removedProduct = yield product_service.removeProduct(productId);
        if (!removedProduct) {
            return error_handler_1.default.sendError(response, 500, "Product could not be removed.");
        }
        return response.status(200).json({
            success: true,
            message: "Product removed successfully.",
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.removeProductLogic = removeProductLogic;
// Update Product Logic
const updateProductLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = request.params;
        if (!productId) {
            return error_handler_1.default.sendError(response, 400, "Product Id is required.");
        }
        const validationError = validateProductData(request.body);
        if (validationError) {
            return error_handler_1.default.sendError(response, 400, validationError);
        }
        const updatedProduct = yield product_service.updateProduct(productId, request.body);
        if (!updatedProduct) {
            return error_handler_1.default.sendError(response, 404, "Product not updated.");
        }
        return response.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: updatedProduct,
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.updateProductLogic = updateProductLogic;
