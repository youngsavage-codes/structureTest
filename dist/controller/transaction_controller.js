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
const transaction_logic_1 = require("../logics/transaction_logic");
class TransactionController {
    creatTransactionController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, transaction_logic_1.createTransactionLogic)(request, response);
            }
            catch (error) {
                return;
            }
        });
    }
    fetchAllTransactionController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, transaction_logic_1.fetchAllTransactionLogic)(request, response);
            }
            catch (error) {
                return;
            }
        });
    }
    fetchUserTransactionController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, transaction_logic_1.fetchUserTransactionLogic)(request, response);
            }
            catch (error) {
                return;
            }
        });
    }
    fetchTransactionByIdController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, transaction_logic_1.fetchTransactionByIdLogic)(request, response);
            }
            catch (error) {
                return;
            }
        });
    }
}
exports.default = TransactionController;
