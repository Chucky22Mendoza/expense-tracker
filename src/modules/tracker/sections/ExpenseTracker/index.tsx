import { useNavigate } from 'react-router-dom';
import { useTransactionStore } from '../../store/TransactionStore';
import { CardContainer, CardContent } from '../CardContainer';
import GraphByTag from './Charts/GraphByTag';
import styles from './ExpenseTracker.module.css';
import { useCurrencyStore } from '@/modules/shared/store/CurrencyStore';
import { formatCurrencyShort } from '@/lib/utils';

function ExpenseTracker() {
  const transactions = useTransactionStore((state) => state.transactions);
  const navigate = useNavigate();
  const totalExpenses = transactions.reduce((acc, tr) => tr.type === 'expense' ? acc + tr.amount : acc, 0);
  const totalIncomes = transactions.reduce((acc, tr) => tr.type === 'income' ? acc + tr.amount : acc, 0);
  const totalBalance = totalIncomes - totalExpenses;
  const { coin, sign } = useCurrencyStore((state) => state.currency);

  return (
    <CardContainer title="Expense Tracker" buttonText="Tags" onClick={() => navigate('/tags')}>
      <CardContent className={styles.wrapper}>
        <div className={styles.balance}>
          <h1>YOUR BALANCE</h1>
          <span>{formatCurrencyShort(totalBalance, coin)}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.resume}>
            <div>
              <h2>INCOME</h2>
              <span>{formatCurrencyShort(totalIncomes, sign)}</span>
            </div>
            <div className={styles.separator} />
            <div>
              <h2>EXPENSE</h2>
              <span>{formatCurrencyShort(totalExpenses, sign)}</span>
            </div>
          </div>
          <GraphByTag typeGraph="expense" signCoin={sign} />
          <GraphByTag typeGraph="income" signCoin={sign} />
        </div>
      </CardContent>
    </CardContainer>
  );
}

export default ExpenseTracker;
