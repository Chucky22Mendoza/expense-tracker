import searchIcon from '@/assets/search.svg';
import styles from './SearchFloat.module.scss';

type Props = {
  onChange?: (value: string) => void;
  value: string;
};

function SearchFloat({ onChange, value }: Props) {
  return (
    <div className={styles.container}>
      <img src={searchIcon} alt="Search" />
      <input
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchFloat;
