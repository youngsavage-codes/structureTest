"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_controller_1 = __importDefault(require("../controller/products_controller"));
const express_1 = require("express");
const productController = new products_controller_1.default();
const productRoute = (0, express_1.Router)();
productRoute.post('/add', productController.addProductController);
productRoute.get('/', productController.fetchAllProductController);
productRoute.get('/:productId', productController.fetchSingleProductController);
productRoute.put('/:productId', productController.updateProductController);
productRoute.delete('/:productId', productController.removeProductController);
exports.default = productRoute;
