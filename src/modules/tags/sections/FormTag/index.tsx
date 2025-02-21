import InputText from '@/modules/shared/sections/InputText';
import styles from './FormTag.module.scss';
import { ITag } from '@/modules/tracker/domain/Tag';
import { useEffect, useRef, useState } from 'react';
import { generateRandomColor } from '@/lib/helpers';
import FooterButtons from '@/modules/shared/sections/FooterButtons';
import { toast } from 'sonner';

type Props = {
  tag: ITag;
  onChange?: (tag: ITag) => void;
  onCancel?: () => void;
  onConfirm?: () => void;
};

function FormTag({
  tag,
  onChange,
  onCancel,
  onConfirm,
}: Props) {
  const colorRef = useRef<HTMLInputElement | null>(null);
  const [newTag, setNewTag] = useState<ITag>(tag);

  useEffect(() => colorRef.current?.focus(), []);

  useEffect(() => {
    if (newTag.color === '') {
      setNewTag({
        ...newTag,
        color: generateRandomColor(),
      });
    }
  }, [newTag.color]);

  const handleInputChange = (value: string, name: string) => {
    const newTagValues: ITag = {...newTag, [name]: value };
    setNewTag(newTagValues);
    onChange?.(newTagValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.name === '') return;
    onConfirm?.();
    onCancel?.();
    toast.success('Tag has been created successfully');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Create a New Tag</h1>
      <div className={styles.body}>
        <InputText
          label="Tag Name"
          placeholder="Enter new tag name"
          value={newTag.name}
          onChange={(value: string) => handleInputChange(value, 'name')}
          styleParent={{
            alignSelf: 'auto',
            flex: '1',
          }}
          style={{
            borderRadius: '80px 0 0 80px',
            maxWidth: 'calc(100% - 100px)',
            borderRight: '1px solid transparent',
          }}
          iconButton={
            <div className={styles.icon}>
              <button
                type="button"
                className={styles.color}
                style={{ backgroundColor: newTag.color }}
                onClick={() => {
                  colorRef.current?.click();
                }}
              >
                Choose color
              </button>
            </div>
          }
        />
        <input
          ref={colorRef}
          type="color"
          value={newTag.color}
          className={styles['color-input']}
          onChange={(e) => handleInputChange(e.target.value, 'color')}
          tabIndex={1}
        />
      </div>
      <FooterButtons onCancel={() => {
        onCancel?.();
        toast.success('Tag cancelled successfully');
      }} />
    </form>
  );
}

export default FormTag;
