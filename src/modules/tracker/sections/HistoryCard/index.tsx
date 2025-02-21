import { CardContainer, CardContent } from "../CardContainer";
import HeaderTable from "../../../shared/sections/Table/HeaderTable";
import styles from './HistoryCard.module.css';
import RowTransactions from "../../../shared/sections/Table/RowTransactions";
import { useTransactionStore } from "../../store/TransactionStore";
import { useNavigate } from "react-router-dom";
import NoDataAvailable from "@/modules/shared/sections/NoDataAvailable";
import { useCurrencyStore } from "@/modules/shared/store/CurrencyStore";
import { format, isAfter } from "date-fns";
import { formatCurrencyShort } from "@/lib/utils";
import { useTagStore } from "../../store/TagStore";
import { ITransaction, TransactionRenderType } from "../../domain/Transaction";
import { useMemo } from "react";

function HistoryCard() {
  const transactions = useTransactionStore((state) => state.transactions);
  const tags = useTagStore((state) => state.tags);
  const navigate = useNavigate();
  const { sign } = useCurrencyStore((state) => state.currency);

  const transactionsOrdering = useMemo<TransactionRenderType[]>(() => {
      const transactionsCopy: ITransaction[] = [...transactions];
      transactionsCopy.sort((a: ITransaction, b: ITransaction) =>
        b.date !== a.date
          ? isAfter(new Date(b.date), new Date(a.date))
            ? 1
            : -1
          : 0
      );
      const transactionsTransform: TransactionRenderType[] = transactionsCopy.map((trans) => ({
          ...trans,
          date: format(new Date(trans.date), 'dd-MM-yyyy').toString(),
          amount: formatCurrencyShort(trans.amount, sign),
          tag: tags.find((t) => t.id === trans.tagId) ?? tags[0],
      }));

      return transactionsTransform;
    }, [transactions, tags]);

  return (
    <CardContainer
      title="History"
      buttonText="See more"
      onClick={() => navigate('/history')}
      style={{
        maxHeight: '372.53px',
        height: '372.53px',
        minHeight: '372.53px',
      }}
    >
      <CardContent className={styles.content}>
        <HeaderTable items={['Name', 'Tag', 'Amount']} />
        {
          transactionsOrdering.length > 0
            ? transactionsOrdering.slice(0, 5).map((tr) => (
              <RowTransactions key={tr.id} transaction={tr} />
            ))
            : <NoDataAvailable />
        }
      </CardContent>
    </CardContainer>
  );
}

export default HistoryCard;
