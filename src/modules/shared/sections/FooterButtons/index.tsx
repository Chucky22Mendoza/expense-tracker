import MediumButton from '../MediumButton';
import styles from './FooterButtons.module.scss';

type Props = {
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
};

function FooterButtons({ onCancel, submitText = 'Submit', cancelText = 'Cancel' }: Props) {
  return (
    <div className={styles.buttons}>
      <MediumButton
        buttonType="primary-active"
        typeButton="submit"
        text={submitText}
        styleSheet={{ cursor: 'pointer' }}
      />
      <MediumButton
        buttonType="secondary-active"
        typeButton="button"
        onClick={onCancel}
        text={cancelText}
        styleSheet={{ cursor: 'pointer' }}
      />
    </div>
  );
}

export default FooterButtons;
