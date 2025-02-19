import { useMemo, useState } from 'react';
import CenterModal from '../shared/sections/CenterModal';
import NoDataAvailable from '../shared/sections/NoDataAvailable';
import HeaderTable from '../shared/sections/Table/HeaderTable';
import RowTags from '../shared/sections/Table/RowTags';
import { useTagStore } from '../tracker/store/TagStore';
import questionMarkIcon from "@/assets/question-mark.svg";
import { useTransactionStore } from '../tracker/store/TransactionStore';
import FormTag from './sections/FormTag';
import { ITag, TagRenderType } from '../tracker/domain/Tag';
import { Tag } from 'lucide-react';
import HeadButton from '../shared/sections/HeadButton';
import LateralForm from '../shared/sections/LateralForm';
import { Wrapper, WrapperBody } from '../shared/sections/Wrapper';
import { useCurrencyStore } from '../shared/store/CurrencyStore';
import { toast } from 'sonner';
import SearchFloat from '../shared/sections/SearchFloat';
import { formatCurrencyShort } from '@/lib/utils';

const resetTag: ITag = {
  id: -1,
  name: '',
  color: '',
};

function TagsViewFactory() {
  const tags = useTagStore((state) => state.tags);
  const updateTransactionNoTag = useTransactionStore((state) => state.updateTransactionNoTag);
  const transactions = useTransactionStore((state) => state.transactions);
  const removeTag = useTagStore((state) => state.removeTag);
  const setTag = useTagStore((state) => state.setTag);
  const [tagId, setTagId] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [tagUpdate, setTagUpdate] = useState<ITag>(resetTag);
  const [searchText, setSearchText] = useState<string>('');
  const { sign } = useCurrencyStore((state) => state.currency);

  const onDeleteTag = (id: number) => {
    removeTag(id);
    updateTransactionNoTag(id);
    toast.success('Tag deleted successfully');
  };

  const tag0hasData = transactions.some(t => t.tagId === 0);
  const tagsFiltered = tag0hasData ? tags : tags.filter((tag) => tag.id > 0);

  const tagsTransformed = useMemo<TagRenderType[]>(() => (
    tagsFiltered.map((tag) => {
      const filterById = transactions.filter((t) => t.tagId === tag.id)
      const totalAmount = filterById.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : t.amount * -1), 0);

      return {
        ...tag,
        type: totalAmount >= 0 ? 'income' : 'expense',
        amount: formatCurrencyShort(Math.abs(totalAmount), sign),
      };
    })
  ), [tagsFiltered, sign]);

  const filterSearchTags = useMemo<TagRenderType[]>(() => (
    searchText === ''
      ? tagsTransformed
      : tagsTransformed.filter((tag) =>
        tag.name.toUpperCase().includes(searchText.toUpperCase()) ||
        tag.color.toUpperCase().includes(searchText.toUpperCase()) ||
        tag.amount.toUpperCase().includes(searchText.toUpperCase())
      )
  ), [tagsTransformed, searchText]);

  return (
    <Wrapper>
      <WrapperBody>
        <HeadButton
          title="Tags"
          label="New Tag"
          onClick={() => {
            setIsOpenForm(true);
            setTagUpdate(resetTag);
          }}
          icon={<Tag style={{ color: 'var(--text-color)' }} />}
        />
        <HeaderTable
          items={['Tag', 'Color', 'Amount']}
          hasDeleteButton
          type="history"
        />
        {
          tagsFiltered.length > 0
            ? filterSearchTags.length > 0
              ? filterSearchTags.map((tag) => (
                <RowTags
                  key={`tag-table-${tag.id}`}
                  tag={tag}
                  hasDeleteButton
                  onClickDelete={() => {
                    if (tag.id === 0) {
                      toast.warning("Others can't be deleted");
                      return;
                    };
                    setIsOpen(true);
                    setTagId(tag.id);
                  }}
                />
              ))
              : <NoDataAvailable text="Results not found, try by name, color or amount" />
            : <NoDataAvailable />
        }
        <SearchFloat
          onChange={setSearchText}
          value={searchText}
        />
      </WrapperBody>
      <LateralForm
        isOpen={isOpenForm}
        onClose={() => setIsOpenForm(false)}
      >
        <FormTag
          tag={tagUpdate}
          onChange={setTagUpdate}
          onCancel={() => setIsOpenForm(false)}
          onConfirm={() => setTag(tagUpdate)}
        />
      </LateralForm>
      <CenterModal
        isOpen={isOpen}
        hasClickBlurClose
        title="Delete tag"
        onConfirm={() => onDeleteTag(tagId)}
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        onConfirmClose
        subtitle="Are you sure you want to delete this tag?"
        icon={<img src={questionMarkIcon} alt="?" />}
        allowConfirm
      />
    </Wrapper>
  );
}

export default TagsViewFactory;
