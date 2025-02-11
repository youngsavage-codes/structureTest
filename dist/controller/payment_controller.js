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
const payment_logic_1 = require("../logics/payment_logic");
class PaymentControler {
    acceptPayment(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, payment_logic_1.acceptPaymentLogic)(request, response);
            }
            catch (error) {
                return null;
            }
        });
    }
    verifyPayment(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, payment_logic_1.verifyPaymentLogic)(request, response);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = PaymentControler;
