import styles from './table.module.css';
import { Trash } from 'lucide-react';
import { TagRenderType } from '@/modules/tracker/domain/Tag';
import ColorCell from './ColorCell';

type Props = {
  tag: TagRenderType;
  hasDeleteButton?: boolean;
  onClickDelete?: () => void;
};

function RowTags({
  tag,
  hasDeleteButton = false,
  onClickDelete,
}: Props) {
  return (
    <div className={`${styles.row} ${styles[tag.type]} ${styles.history}`}>
      <span>{tag.name}</span>
      <ColorCell tag={tag} />
      <span>{tag.amount}</span>
      {
        hasDeleteButton && (
          <button className={styles.delete} onClick={onClickDelete}>
            <Trash />
          </button>
        )
      }
    </div>
  );
}

export default RowTags;
