import styles from './table.module.css';

type Props = {
  items: string[];
  hasDeleteButton?: boolean;
  type?: 'history' | 'tracker';
};

function HeaderTable({ items, hasDeleteButton = false, type = 'tracker' }: Props) {
  return (
    <div
      className={`${styles.row} ${type ? styles.history : ''}`}
      style={{ backgroundColor: 'var(--light-color)' }}
    >
      {items.map((item) => (
        <span
          key={item}
          style={{ color: 'var(--text-color)' }}
        >
          {item}
        </span>
      ))}
      {
        hasDeleteButton && (
          <div style={{ maxWidth: '50px', marginLeft: '1.5rem' }} />
        )
      }
    </div>
  )
}

export default HeaderTable