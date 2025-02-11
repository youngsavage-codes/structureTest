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
const transaction_model_1 = __importDefault(require("../models/transaction_model"));
class TransactionService {
    createTransaction(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = new transaction_model_1.default(credential);
                yield transaction.save();
                return transaction;
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchAllTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transaction_model_1.default.find();
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchUserTransaction(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transaction_model_1.default.find({ user_id: userId });
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transaction_model_1.default.findOne({ _id: transactionId });
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = TransactionService;
