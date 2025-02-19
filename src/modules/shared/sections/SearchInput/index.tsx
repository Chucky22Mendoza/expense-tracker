import { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';
import searchIcon from '@/assets/search.svg';

/**
 * Defines the structure of an option with a label and a corresponding value.
 * @property {string} label - The text label for the option.
 * @property {any} value - The value associated with the option.
 */
export type OptionProps = {
  label: string;
  value: any;
};

/**
 * Functional component for a search input field.
 *
 * @param props - The input properties for the search input.
 * @param props.styleParent - The style for the parent container.
 * @param props.onChange - The function to handle input change.
 * @param props.errorText - The text to display in case of an error.
 * @param props.hasError - Indicates if there is an error.
 * @param props.label - The label for the input field.
 * @param props.options - The selectable options for the search input.
 * @param props.ref - Reference to the input element.
 * @param props.onSelectOption - Function to handle option selection.
 * @param props.id - The id for the input field.
 * @param props.isSearcheableOpen - Indicates if the search options are open.
 * @returns The search input component.
 */
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
  styleParent?: React.CSSProperties;
  errorText?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  ref?: React.LegacyRef<HTMLInputElement>;
  options?: OptionProps[];
  onSelectOption?: (value: any) => void;
  isSearcheableOpen?: boolean;
};

/**
 * Functional component for a search input field.
 *
 * @param props - The input properties for the search input.
 * @returns JSX element representing the search input field.
 */
function SearchInput(props: InputProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const {
    styleParent,
    onChange,
    errorText,
    hasError = false,
    label,
    options,
    ref,
    onSelectOption,
    id,
    isSearcheableOpen,
  } = props;
  let propsInput = {...props};
  delete propsInput.errorText;
  delete propsInput.styleParent;
  delete propsInput.hasError;
  delete propsInput.label;
  delete propsInput.options;
  delete propsInput.onSelectOption;
  delete propsInput.isSearcheableOpen;

  const shouldDisplayLabel = label && label !== '';

  useEffect(() => {
    const selectedOption = document.getElementsByClassName(styles['selected-option'])[0];
    if (selectedOption) {
      selectedOption.scrollIntoView({ behavior:'smooth', block: 'nearest' });
    }
  }, [currentIndex]);

  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setCurrentIndex(-1);
    propsInput?.onFocus?.(e);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    propsInput?.onKeyDown?.(e);
    if (options && options?.length > 0) {
      const keyValue = e.key;
      if (keyValue === 'ArrowDown' && currentIndex < (options.length - 1)) {
        setCurrentIndex(currentIndex + 1);
        return;
      }

      if (keyValue === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        return;
      }

      if (keyValue === 'Enter' && currentIndex > -1) {
        onSelectOption?.(options[currentIndex].value);
      }

      setCurrentIndex(-1);
    }
  };

  return (
    <div className={`${styles['input-container']} ${hasError ? styles.error : ''}`} style={styleParent}>
      <div className={`${styles.search} ${propsInput.disabled ? 'disabled' : ''}`}>
        <img
          src={searchIcon}
          alt="Search"
          style={{
            filter: props.value ? undefined : 'brightness(0) saturate(100%) invert(75%) sepia(26%) saturate(193%) hue-rotate(173deg) brightness(91%) contrast(90%)',
          }}
        />
        <input
          className={styles['custom-input']}
          {...propsInput}
          onFocus={onFocusHandler}
          onKeyDown={onKeyDownHandler}
          onChange={(e) => onChange?.(e.target.value)}
          ref={ref}
          required
        />
        {shouldDisplayLabel && (
          <label htmlFor={id}>
            {label}
          </label>
        )}
        {
          options && isSearcheableOpen && options?.length > 0
            ? (
              <div className={styles.options}>
                {
                  options.map((option: OptionProps, index: number) => (
                    <button
                      role="option"
                      className={currentIndex === index ? styles['selected-option'] : ''}
                      title={option.label}
                      key={`option-selectable-${label}-${index}`}
                      onClick={() => {
                        onSelectOption?.(option.value);
                        setCurrentIndex(-1);
                      }}
                    >
                      {option.label}
                    </button>
                  ))
                }
              </div>
            )
            : null
        }
      </div>
      {errorText && <div className={styles.helper}>{hasError && <span>{errorText}</span>}</div>}
    </div>
  );
}

export default SearchInput;