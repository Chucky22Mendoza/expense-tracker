import { useRef } from 'react';
import styles from './table.module.css';
import { useTagStore } from '@/modules/tracker/store/TagStore';
import { ITag } from '@/modules/tracker/domain/Tag';

type Props = {
  tag: ITag;
};

function ColorCell({ tag }: Props) {
  const updateTag = useTagStore((state) => state.updateTag);
  const colorRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles['color-cell']}>
      <span
        className={styles.rounded}
        style={{ backgroundColor: tag.color }}
        onClick={() => colorRef.current?.click()}
      >
        {tag.name}
      </span>
      <input
        ref={colorRef}
        type="color"
        value={tag.color}
        onChange={(e) => updateTag({ ...tag, color: e.target.value })}
      />
    </div>
  );
}

export default ColorCell;
