import { TransactionRenderType } from '@/modules/tracker/domain/Transaction';
import styles from './table.module.css';
import { Trash } from 'lucide-react';
import ColorCell from './ColorCell';

type Props = {
  transaction: TransactionRenderType;
  type?: 'history' | 'tracker';
  hasDeleteButton?: boolean;
  onClickDelete?: () => void;
};

function RowTransactions({
    transaction,
    type = 'tracker',
    hasDeleteButton = false,
    onClickDelete,
  }: Props) {
  return (
    <div className={`${styles.row} ${transaction.type === 'income' ? styles.income : styles.expense} ${styles[type]}`}>
      <span title={transaction.name}>{transaction.name}</span>
      <ColorCell tag={transaction.tag} />
      {
        type === 'history' && (
          <>
            <span title={transaction.date}>{transaction.date}</span>
            <span title={transaction.type}>{transaction.type}</span>
          </>
        )
      }
      <span title={transaction.amount}>{transaction.amount}</span>
      {
        hasDeleteButton && (
          <button title="Delete" className={styles.delete} onClick={onClickDelete}>
            <Trash />
          </button>
        )
      }
    </div>
  );
}

export default RowTransactions;
