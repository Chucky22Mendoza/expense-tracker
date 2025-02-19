import { CardContainer, CardContent } from "../CardContainer";
import HeaderTable from "../../../shared/sections/Table/HeaderTable";
import styles from './HistoryCard.module.css';
import RowTransactions from "../../../shared/sections/Table/RowTransactions";
import { useTransactionStore } from "../../store/TransactionStore";
import { useNavigate } from "react-router-dom";
import NoDataAvailable from "@/modules/shared/sections/NoDataAvailable";
import { useCurrencyStore } from "@/modules/shared/store/CurrencyStore";
import { format } from "date-fns";
import { formatCurrencyShort } from "@/lib/utils";
import { useTagStore } from "../../store/TagStore";
import { TransactionRenderType } from "../../domain/Transaction";

function HistoryCard() {
  const transactions = useTransactionStore((state) => state.transactions);
  const tags = useTagStore((state) => state.tags);
  const navigate = useNavigate();
  const { sign } = useCurrencyStore((state) => state.currency);

  const transactionsTransform: TransactionRenderType[] = transactions.map((trans) => ({
    ...trans,
    date: format(new Date(trans.date), 'dd-MM-yyyy').toString(),
    amount: formatCurrencyShort(trans.amount, sign),
    tag: tags.find((t) => t.id === trans.tagId) ?? tags[0],
}));

  return (
    <CardContainer title="History" buttonText="See more" onClick={() => navigate('/history')}>
      <CardContent className={styles.content}>
        <HeaderTable items={['Name', 'Tag', 'Amount']} />
        {
          transactionsTransform.length > 0
            ? transactionsTransform.slice(0, 5).map((tr) => (
              <RowTransactions key={tr.id} transaction={tr} />
            ))
            : <NoDataAvailable />
        }
      </CardContent>
    </CardContainer>
  );
}

export default HistoryCard;
