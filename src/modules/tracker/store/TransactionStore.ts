import { create } from "zustand";
import { persist } from "zustand/middleware";import { ICreateTransaction, ITransaction } from "../domain/Transaction";

export interface ITransactionState {
  transactions: ITransaction[];
  setTransaction: (transaction: ICreateTransaction) => void;
  removeTransaction: (id: number) => void;
  updateTransactionNoTag: (tagId: number) => void;
  setTransactionsList: (tags: ITransaction[]) => void;
  resetTransactions: () => void;
}

export const useTransactionStore = create(persist<ITransactionState>((set) => ({
  transactions: [],
  setTransaction: (transaction: ICreateTransaction) => set((state) => ({
    ...state,
    transactions: [
      ...state.transactions,
      {
        ...transaction,
        id: (state.transactions[state.transactions.length - 1]?.id ?? 0) + 1,
      }
    ],
  })),
  removeTransaction: (id: number) => set((state) => ({
    ...state,
    transactions: state.transactions.filter((transaction) => transaction.id !== id),
  })),
  updateTransactionNoTag: (tagId: number) => set((state) => ({
    ...state,
    transactions: state.transactions.map((transaction) => (
      transaction.tagId === tagId ? { ...transaction, tagId: 0 } : transaction
    )),
  })),
  setTransactionsList: (transactions: ITransaction[]) => set((state) => ({
    ...state,
    transactions: [...state.transactions, ...transactions],
  })),
  resetTransactions: () => set((state) => ({
    ...state,
    transactions: [],
  })),
}), {
  name: 'transactions',
}));
