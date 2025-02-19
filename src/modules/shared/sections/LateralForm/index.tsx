import { PropsWithChildren } from 'react';
import styles from './LateralForm.module.scss';
import arrowBackIcon from '@/assets/arrow_back.svg';

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
  className?: string;
}>;

function LateralForm({
  isOpen,
  onClose,
  children,
  style,
  className,
}: Props) {
  return (
    <section className={`${styles.lateral} ${isOpen ? styles.show : ''} ${className ?? ''}`} style={style}>
      <button
        className={styles.close}
        onClick={onClose}
      >
        <img
          src={arrowBackIcon}
          alt="Cerrar"
        />
      </button>
      {isOpen && children}
    </section>
  );
}

export default LateralForm;
