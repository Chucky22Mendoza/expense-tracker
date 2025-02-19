import { ITag } from "./Tag";

export interface ITransaction {
  id: number;
  name: string;
  amount: number;
  tagId: number;
  date: string;
  type: 'expense' | 'income';
}

export type ICreateTransaction = Omit<ITransaction, 'id'>;

export type TransactionRenderType = Omit<ITransaction, 'tagId' | 'amount'> & {
  amount: string,
  tag: ITag;
};