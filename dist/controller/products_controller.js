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
const products_logic_1 = require("../logics/products_logic");
const error_handler_1 = __importDefault(require("../utils/error_handler"));
class ProductController {
    constructor() {
        this.addProductController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, products_logic_1.addProductLogic)(request, response);
            }
            catch (error) {
                console.error("Error in addProductController:", error);
                return error_handler_1.default.sendError(response, 500, "Failed to add product.");
            }
        });
        this.removeProductController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, products_logic_1.removeProductLogic)(request, response);
            }
            catch (error) {
                console.error("Error in removeProductController:", error);
                return error_handler_1.default.sendError(response, 500, "Failed to remove product.");
            }
        });
        this.updateProductController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, products_logic_1.updateProductLogic)(request, response);
            }
            catch (error) {
                console.error("Error in updateProductController:", error);
                return error_handler_1.default.sendError(response, 500, "Failed to update product.");
            }
        });
        this.fetchAllProductController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, products_logic_1.fetchAllProductsLogic)(request, response);
            }
            catch (error) {
                console.error("Error in fetchAllProductController:", error);
                return error_handler_1.default.sendError(response, 500, "Failed to fetch products.");
            }
        });
        this.fetchSingleProductController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, products_logic_1.fetchSingleProductLogic)(request, response);
            }
            catch (error) {
                console.error("Error in fetchSingleProductController:", error);
                return error_handler_1.default.sendError(response, 500, "Failed to fetch product.");
            }
        });
    }
}
exports.default = ProductController;
