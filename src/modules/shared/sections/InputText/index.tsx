import { onKeyDownNumberHandler } from '@/lib/helpers';
import styles from './input.module.css';

/**
 * Defines the properties for the Input component.
 *
 * label: The label text for the input.
 * styleParent: The CSS properties for the parent element.
 * errorText: The text to display when an error occurs.
 * onChange: The function called when the input value changes.
 * hasError: Indicates if the input has an error.
 * ref: The legacy reference to the input element.
 */
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
  styleParent?: React.CSSProperties;
  errorText?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  ref?: React.LegacyRef<HTMLInputElement>;
  onlyNumbers? : boolean;
  iconButton?: React.ReactElement;
};

/**
 * Functional component for rendering a text input field with optional label and error handling.
 * @param props - The input properties including styleParent, onChange, errorText, hasError, and label.
 */
function InputText(props: InputProps) {
  const {
    styleParent,
    onChange,
    errorText,
    hasError = false,
    label,
    onlyNumbers,
    iconButton,
  } = props;
  let propsInput = {...props};
  delete propsInput.errorText;
  delete propsInput.styleParent;
  delete propsInput.hasError;
  delete propsInput.label;
  delete propsInput.onlyNumbers;
  delete propsInput.iconButton;

  const shouldDisplayLabel = label && label !== '';

  return (
    <div className={`${styles['input-container']} ${hasError ? styles.error : ''}`} style={styleParent}>
      <input
        className={styles['custom-input']}
        ref={props.ref}
        required
        {...propsInput}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onlyNumbers ? onKeyDownNumberHandler : props.onKeyDown}
      />
      {shouldDisplayLabel && (
        <label htmlFor={props.id}>
          {label}
        </label>
      )}

      {
        iconButton && (
          <section className={styles.float}>
            {iconButton}
          </section>
        )
      }
      {errorText && <div className={styles.helper}>{hasError && <span>{errorText}</span>}</div>}
    </div>
  );
}

export default InputText;