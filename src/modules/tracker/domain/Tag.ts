export interface ITag {
  id: number;
  name: string;
  color: string;
}

export type ICreateTag = Omit<ITag, 'id'>;

export type TagRenderType = ITag & {
  amount: string;
  type: 'expense' | 'income';
};
