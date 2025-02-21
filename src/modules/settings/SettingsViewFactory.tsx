import { useState } from 'react';
import CenterModal from '../shared/sections/CenterModal';
import HeadButton from '../shared/sections/HeadButton';
import { WrapperBody, Wrapper } from '../shared/sections/Wrapper';
import FormSettings from './sections/FormSettings';
import ImportModal from './sections/ImportModal';
import styles from './SettingsViewFactory.module.scss';
import { useXLSX } from './hooks/useExcel';
import { useTagStore } from '../tracker/store/TagStore';
import { useTransactionStore } from '../tracker/store/TransactionStore';
import { useCurrencyStore } from '../shared/store/CurrencyStore';
import { toast } from 'sonner';
import questionMarkIcon from "@/assets/question-mark.svg";

function SettingsViewFactory() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const transactions = useTransactionStore((state) => state.transactions);
  const tags = useTagStore((state) => state.tags);
  const resetCurrency = useCurrencyStore((state) => state.resetCurrency);
  const resetTags = useTagStore((state) => state.resetTags);
  const resetTransactions = useTransactionStore((state) => state.resetTransactions);
  const { exportToExcel, importFromExcel } = useXLSX();

  const onConfirmDeleteData = () => {
    resetCurrency();
    resetTags();
    resetTransactions();
    toast.success('All data deleted successfully');
  };

  return (
    <Wrapper className={styles.wrap}>
      <HeadButton title="Settings" style={{ maxWidth: '50rem', alignSelf: 'center' }} />
      <WrapperBody className={styles.container}>
        <FormSettings
          onClickExport={() => exportToExcel(transactions, tags)}
          onClickImport={() => setIsOpen(true)}
          onClickDelete={() => setIsDeleteOpen(true)}
        />
      </WrapperBody>
      <CenterModal
        isOpen={isOpen}
        hasConfirmButtons={false}
        onClose={() => setIsOpen(false)}
        style={{
          maxWidth: '60rem',
          overflow: 'scroll',
          maxHeight: 'none',
          height: 'auto',
          padding: '0',
          gap: '0',
        }}
      >
        <ImportModal
          onClickImport={importFromExcel}
          onClose={() => setIsOpen(false)}
        />
      </CenterModal>
      <CenterModal
        isOpen={isDeleteOpen}
        hasClickBlurClose
        title="Delete all data"
        onConfirm={onConfirmDeleteData}
        onCancel={() => setIsDeleteOpen(false)}
        onClose={() => setIsDeleteOpen(false)}
        onConfirmClose
        subtitle="Are you sure you want to delete all data?"
        icon={<img src={questionMarkIcon} alt="?" />}
        allowConfirm
      />
    </Wrapper>
  );
}

export default SettingsViewFactory;
