import { useMemo, useRef, useState } from "react";
import CenterModal from "../shared/sections/CenterModal";
import NoDataAvailable from "../shared/sections/NoDataAvailable";
import HeaderTable from "../shared/sections/Table/HeaderTable";
import RowTransactions from "../shared/sections/Table/RowTransactions";
import { useTransactionStore } from "../tracker/store/TransactionStore";
import styles from './HistoryViewFactory.module.css';
import questionMarkIcon from "@/assets/question-mark.svg";
import HeadButton from "../shared/sections/HeadButton";
import { CircleDollarSign } from "lucide-react";
import FormTransaction from "../tracker/sections/Form/FormTransaction";
import LateralForm from "../shared/sections/LateralForm";
import { Wrapper, WrapperBody } from "../shared/sections/Wrapper";
import { useCurrencyStore } from "../shared/store/CurrencyStore";
import { format, isAfter } from "date-fns";
import { TransactionRenderType } from "../tracker/domain/Transaction";
import { toast } from "sonner";
import SearchFloat from "../shared/sections/SearchFloat";
import { useTagStore } from "../tracker/store/TagStore";
import { formatCurrencyShort } from "@/lib/utils";

function HistoryViewFactory() {
  const transactions = useTransactionStore((state) => state.transactions);
  const tags = useTagStore((state) => state.tags);
  const removeTransaction = useTransactionStore((state) => state.removeTransaction);
  const [transactionId, setTransactionId] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const refForm = useRef<HTMLFormElement | null>(null);
  const { sign } = useCurrencyStore((state) => state.currency);

  const transactionsOrdering = useMemo<TransactionRenderType[]>(() => {
    const transactionsTransform: TransactionRenderType[] = transactions.map((trans) => ({
        ...trans,
        date: format(new Date(trans.date), 'dd-MM-yyyy').toString(),
        amount: formatCurrencyShort(trans.amount, sign),
        tag: tags.find((t) => t.id === trans.tagId) ?? tags[0],
    }));

    return transactionsTransform.sort((a: TransactionRenderType, b: TransactionRenderType) =>
      b.date !== a.date
        ? isAfter(new Date(b.date), new Date(a.date))
          ? 1
          : -1
        : 0
    )
  }, [transactions, tags]);

  const filterSearchTransactions = useMemo<TransactionRenderType[]>(() => (
    searchText === ''
      ? transactionsOrdering
      : transactionsOrdering.filter((trans) => trans.name.toUpperCase().includes(searchText.toUpperCase()) ||
          trans.date.includes(searchText.toUpperCase()) ||
          trans.type.toUpperCase().includes(searchText.toUpperCase()) ||
          trans.tag.name.toUpperCase().includes(searchText.toUpperCase()) ||
          trans.amount.toUpperCase().includes(searchText.toUpperCase())
      )
  ), [transactionsOrdering, searchText]);

  return (
    <Wrapper>
      <WrapperBody>
        <HeadButton
          title="History Tracking"
          label="New Transaction"
          onClick={() => setIsOpenForm(true)}
          icon={<CircleDollarSign style={{ color: 'var(--text-color)' }} />}
        />
        <HeaderTable
          items={['Name', 'Tag', 'Date', 'Type', 'Amount']}
          hasDeleteButton
          type="history"
        />
        {
          transactionsOrdering.length > 0
            ? filterSearchTransactions.length > 0
              ?  filterSearchTransactions.map((tr) => (
                <RowTransactions
                  key={tr.id}
                  transaction={tr}
                  type="history"
                  hasDeleteButton
                  onClickDelete={() => {
                    setIsOpen(true);
                    setTransactionId(tr.id);
                  }}
                />
              ))
              : <NoDataAvailable text="No results found, try by name, color, tag name, date, type or amount" />
            : <NoDataAvailable />
        }
        <SearchFloat onChange={setSearchText} value={searchText} />
      </WrapperBody>
        <CenterModal
          isOpen={isOpen}
          hasClickBlurClose
          title="Delete transaction"
          onConfirm={() => {
            removeTransaction(transactionId);
            toast.success('Transaction deleted successfully');
          }}
          onCancel={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
          onConfirmClose
          subtitle="Are you sure you want to delete this transaction?"
          icon={<img src={questionMarkIcon} alt="?" />}
          allowConfirm
        />
        <LateralForm
          isOpen={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          style={{
            padding: '2rem',
          }}
        >
          <div className={styles.modal}>
            <h1 className={styles.title}>Create New Transaction</h1>
            <FormTransaction
              hasFooterButtons
              refForm={refForm}
              style={{ flex: 'none' }}
              onClose={() => setIsOpenForm(false)}
            />
          </div>
        </LateralForm>
    </Wrapper>
  );
}

export default HistoryViewFactory;
