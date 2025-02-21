import { useTagStore } from '../../store/TagStore';
import Switch from '@/modules/shared/sections/Switch';
import InputText from '@/modules/shared/sections/InputText';
import SearchInput from '@/modules/shared/sections/SearchInput';
import styles from './form.module.css';
import { useTransactionStore } from '../../store/TransactionStore';
import { ICreateTransaction } from '../../domain/Transaction';
import { useState } from 'react';
import { generateRandomColor } from '@/lib/helpers';
import FooterButtons from '@/modules/shared/sections/FooterButtons';
import { toast } from 'sonner';

type Props = {
  hasFooterButtons?: boolean;
  refForm?: React.LegacyRef<HTMLFormElement>;
  style?: React.CSSProperties;
  onClose?: () => void;
  from?: 'tracker' | 'modal';
};

const resetTransaction: ICreateTransaction = {
  name: '',
  amount: 0,
  type: 'expense',
  tagId: -1,
  date: '',
};

function FormTransaction({
  hasFooterButtons = true,
  refForm,
  style,
  onClose,
  from = 'tracker',
}: Props) {
  const setTransaction = useTransactionStore((state) => state.setTransaction);
  const setTag = useTagStore((state) => state.setTag);
  const tags = useTagStore((state) => state.tags);
  const [formData, setFormData] = useState<ICreateTransaction>(resetTransaction);
  const [tagName, setTagName] = useState('');

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.amount === 0 || (formData.tagId === -1 && !tagName) || !formData.date) {
      toast.error('All fields are required');
      return;
    }

    let tagIdValue = formData.tagId;
    const tag = tags.find((tag) => tag.id === tagIdValue);

    if (tagIdValue === -1 || tag?.name !== tagName) {
      tagIdValue = (tags[tags.length - 1]?.id ?? 0) + 1;
      setTag({
        name: tagName,
        color: generateRandomColor(),
      });
    }

    try {
      setTransaction({
        ...formData,
        tagId: tagIdValue,
        amount: Number(formData.amount),
      });
      toast.success('Transaction has been created successfully');
      setFormData(resetTransaction);
      setTagName('');
      onClose?.();
    } catch (err) {
      console.log(err);
      toast.error('Failed to save transaction');
    }
  };

  const handleReset = () => {
    setFormData(resetTransaction);
    setTagName('');
    onClose?.();
    toast.success('Transaction canceled successfully');
  };

  const onAmountKeyDownHandler = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.ctrlKey && (e.key === 'v' || e.key === 'V')) return;

    const allowedKeys = ['Backspace', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Tab', 'Home', 'End', '.'];
    if (!allowedKeys.includes(e.key)) {
      if (isNaN(Number(e.key))) e.preventDefault();
    }
  };

  return (
    <form ref={refForm} className={styles.form} onSubmit={handleSubmit} style={style}>
      <div style={{ display: 'flex', alignSelf: 'flex-end', flex: '1' }}>
        <Switch
          prevLabel="Expense"
          label="Income"
          checked={formData.type === 'income'}
          onChange={(value) => handleChange('type', value ? 'income' : 'expense')}
          styleLabel={{
            color: formData.type === 'income' ? from === 'tracker' ? '#FFF' : 'var(--btn-text-color)' : '#A4B3C5',
            fontWeight: formData.type === 'income' ? '700' : '500',
          }}
          stylePrevLabel={{
            color: formData.type === 'expense' ? from === 'tracker' ? '#FFF' : 'var(--btn-text-color)' : '#A4B3C5',
            fontWeight: formData.type === 'expense' ? '700' : '500',
          }}
          styleIndicator={{
            background: 'linear-gradient(120deg, var(--btn-text-color) 0%, var(--error-color) 100%)'
          }}
        />
      </div>
      <InputText
        name="name"
        label="Name"
        placeholder="Name of transaction"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        required
      />
      <InputText
        label="Amount"
        placeholder="Value of transaction"
        name="value"
        value={formData.amount === 0 ? '' : formData.amount}
        onChange={(value) => {
          if (isNaN(Number(value))) return;
          handleChange('amount', value);
        }}
        required
        onKeyDown={onAmountKeyDownHandler}
        inputMode="decimal"
      />
      <SearchInput
        label="Tag"
        placeholder="Choose a tag"
        options={
          tags.filter((tag) => (
            tag.name.toLowerCase().includes(tagName.toLowerCase())
          )).map((tag) => ({
            label: tag.name,
            value: tag.id,
          }))
        }
        isSearcheableOpen
        onChange={(value) => setTagName(value)}
        value={tagName}
        onSelectOption={(value) => {
          handleChange('tagId', value);
          setTagName(tags.find((tag) => tag.id === Number(value))?.name || '');
        }}
        required
      />
      <InputText
        type="date"
        name="date"
        label="date"
        value={formData.date}
        onChange={(value) => handleChange('date', value)}
        required
      />
      {hasFooterButtons && (<FooterButtons onCancel={handleReset} />)}
    </form>
  )
}

export default FormTransaction