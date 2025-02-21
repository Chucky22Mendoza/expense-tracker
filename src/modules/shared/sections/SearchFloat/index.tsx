import searchIcon from '@/assets/search.svg';
import styles from './SearchFloat.module.scss';
import { useRef } from 'react';

type Props = {
  onChange?: (value: string) => void;
  value: string;
};

function SearchFloat({ onChange, value }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={styles.container} onMouseEnter={() => inputRef.current?.focus()} onClick={() => inputRef.current?.focus()}>
      <img src={searchIcon} alt="Search" />
      <input
        ref={inputRef}
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchFloat;
