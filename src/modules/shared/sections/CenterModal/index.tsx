import { useEffect } from 'react';
import styles from './CenterModal.module.scss';
import closeIcon from '@/assets/close.svg';

/**
 * Defines the properties for the CenterModal component.
 *
 * @property {boolean} isOpen - Indicates whether the modal is open.
 * @property {() => void} [onClose] - Function to close the modal.
 * @property {() => void} [onConfirm] - Function to confirm an action.
 * @property {boolean} [allowConfirm] - Specifies if confirmation is allowed.
 * @property {boolean} [onConfirmClose] - Indicates if confirming closes the modal.
 * @property {boolean} [hasClickBlurClose] - Indicates if confirming closes the modal when click in blur section.
 * @property {string} title - The title of the modal.
 * @property {string} subtitle - The subtitle of the modal.
 * @property {React.ReactElement<HTMLImageElement>} [icon] - Icon element for the modal.
 * @property {boolean} [hasConfirmButtons] - Specifies if confirm/cancel buttons are displayed.
 * @property {string} [confirmButtonText] - Text for the confirm button.
 * @property {string} [cancelButtonText] - Text for the cancel button.
 * @property {object} [style] - Body styles.
 * @property {boolean} [showX] - Boolean indicating if the X should be shown
 * @property {ReactNode} [children] - If exists children, the body will be replaced with the new children
 */
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  allowConfirm?: boolean;
  onConfirmClose?: boolean;
  title?: string;
  subtitle?: string;
  icon?: React.ReactElement<HTMLImageElement>;
  hasConfirmButtons?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showX?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  hasClickBlurClose?: boolean;
};

/**
 * Functional component for a center modal that can be opened and closed.
 * Handles keyboard events for closing the modal and clicking outside the modal to close it.
 *
 * @param isOpen - Boolean indicating if the modal is open.
 * @param onClose - Function to close the modal.
 * @param onConfirm - Function to confirm an action.
 * @param allowConfirm - Boolean indicating if confirmation is allowed.
 * @param onConfirmClose - Boolean indicating if the modal should close after confirmation.
 * @param title - Title of the modal.
 * @param subtitle - Subtitle of the modal.
 * @param icon - Icon element to display in the modal.
 * @param hasConfirmButtons - Boolean indicating if confirm and cancel buttons are displayed.
 * @param confirmButtonText - Text for the confirm button.
 * @param cancelButtonText - Text for the cancel button.
 * @param style - Body styles.
 * @param showX - Boolean indicating if the X should be shown
 * @param children - If exists children, the body will be replaced with the new children
 * @param hasClickBlurClose - Indicates if confirming closes the modal when click in blur section.
 */
function CenterModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  allowConfirm = false,
  onConfirmClose = false,
  title,
  subtitle,
  icon,
  hasConfirmButtons = true,
  hasClickBlurClose = false,
  confirmButtonText = 'Yes, delete',
  cancelButtonText = 'Cancel',
  style,
  showX = true,
  children,
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
        zIndex: isOpen ? '1100' : '-1',
        opacity: isOpen ? '1' : '0',
      }}
      onClick={hasClickBlurClose ? onClickOut : undefined}
    >
      {isOpen && (
        <div
          className={styles.modal}
          style={{
            ...style,
            opacity: isOpen ? '1' : '0',
          }}
        >
          {
            showX && (
              <button className={styles.close} onClick={onClose}>
                <img src={closeIcon} alt="Close" />
              </button>
            )
          }
          {
            children
              ? children
              : (
                <>
                  {icon}
                  <section>
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                  </section>
                </>
              )
          }
          {
            hasConfirmButtons && (
              <section className={styles.buttons}>
                <button onClick={onCancel}>{cancelButtonText}</button>
                <button
                  onClick={
                    onConfirm && allowConfirm
                      ? () => {
                        onConfirm();
                        if (onConfirmClose) {
                          onClose && onClose();
                        }
                      }
                      : () => {}
                  }
                  disabled={!allowConfirm}
                >
                  {confirmButtonText}
                </button>
              </section>
            )
          }
        </div>
      )}
    </section>
  );
}

export default CenterModal;
