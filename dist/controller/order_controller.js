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
Object.defineProperty(exports, "__esModule", { value: true });
const order_logic_1 = require("../logics/order_logic");
class OrderController {
    createOrderController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, order_logic_1.createOrderLogic)(request, response);
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchAllOrderController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, order_logic_1.fetchAllOrderLogic)(request, response);
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchUserOrderController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, order_logic_1.fetchUserOrderLogic)(request, response);
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchOrderByIdController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, order_logic_1.fetchOrderByIdLogic)(request, response);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = OrderController;
