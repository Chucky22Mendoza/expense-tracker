import { useEffect } from 'react';
import arrowBackIcon from '@/assets/arrow_back.svg';
import styles from './LateralModal.module.scss';

/**
 * Type for the props of the LateralModal component.
 * @property {boolean} isOpen - Indicates if the modal is open.
 * @property {Function} [onClose] - Function to close the modal.
 * @property {React.CSSProperties} [styleContent] - Custom styles for the modal content.
 * @property {React.CSSProperties} [styleBlur] - Custom styles for the blurred background.
 * @property {React.ReactNode} [children] - The content to be displayed inside the modal.
 */
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  styleContent?: React.CSSProperties;
  styleBlur?: React.CSSProperties;
  children?: React.ReactNode;
  orientation?: 'left' | 'right';
  showCloseButton?: boolean;
};

/**
 * Functional component for a lateral modal that can be opened and closed.
 * Listens for the 'Escape' key press to close the modal when open.
 * Closes the modal when clicking outside the modal content.
 *
 * @param isOpen - Boolean indicating if the modal is open.
 * @param onClose - Function to close the modal.
 * @param styleContent - Custom styles for the modal content.
 * @param styleBlur - Custom styles for the blurred background.
 * @param children - The content to be displayed inside the modal.
 */
function LateralModal({
  isOpen,
  onClose,
  styleContent,
  styleBlur,
  children,
  orientation = 'left',
  showCloseButton = true,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      const keyDownEvent = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose && onClose();
        }
      };
      document.addEventListener('keydown', keyDownEvent);
      return () => {
        document.removeEventListener('keydown', keyDownEvent);
      };
    }
  }, [isOpen]);

  const onClickOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    if (target.tagName === 'SECTION') {
      onClose && onClose();
    }
  };

  return (
    <section
      className={styles.blur}
      style={{
        ...styleBlur,
        zIndex: isOpen ? '1000' : '-1',
        opacity: isOpen ? '1' : '0',
      }}
      onClick={onClickOut}
    >
      <div
        className={styles.modal}
        style={{
          ...styleContent,
          [orientation]: isOpen ? '0' : '-100%'
        }}
      >
        {
          showCloseButton && (
            <button
              className={styles.close}
              onClick={onClose}
              style={{
                [orientation]: 'calc(100% + 18px)',
              }}
            >
              <img
                src={arrowBackIcon}
                alt="Cerrar"
                style={{
                  transform: orientation === 'left'? undefined : 'rotate(180deg)',
                }}
              />
            </button>
          )
        }
        {children}
      </div>
    </section>
  );
}

export default LateralModal;
