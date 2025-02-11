import { ITransaction } from "../types/interface";
import Transaction from "../models/transaction_model";

class TransactionService {
    async createTransaction(credential: Partial<ITransaction>): Promise<ITransaction | null> {
        try {
            const transaction = new Transaction(credential);
            await transaction.save();
            return transaction
        } catch(error) {
            return null
        }
    }

    async fetchAllTransaction(): Promise<ITransaction[] | null> {
        try {
            return await Transaction.find();
        } catch(error) {
            return null
        }
    }

    async fetchUserTransaction(userId: string): Promise<ITransaction[] | null> {
        try {
            return await Transaction.find({user_id: userId});
        } catch(error) {
            return null
        }
    }

    async fetchTransactionById(transactionId: string): Promise<ITransaction | null> {
        try {
            return await Transaction.findOne({_id: transactionId});
        } catch(error) {
            return null
        }
    }
}

export default TransactionService