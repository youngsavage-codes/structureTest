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
const products_model_1 = __importDefault(require("../models/products_model"));
class ProductService {
    addProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = new products_model_1.default(data);
                yield newProduct.save();
                return newProduct;
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return products_model_1.default.find();
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchSingleProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return products_model_1.default.findById(productId);
            }
            catch (error) {
                return null;
            }
        });
    }
    updateProduct(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield products_model_1.default.findByIdAndUpdate(productId, updateData, { new: true });
            }
            catch (error) {
                console.error("Error updating product:", error);
                return null;
            }
        });
    }
    removeProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return products_model_1.default.findByIdAndDelete(productId);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = ProductService;
