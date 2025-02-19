import ReactSelect, { Options } from 'react-select';
import { OptionProps } from '../SearchInput';
import styles from './SelectV3.module.scss';
import selectIcon from '@/assets/select-arrow.svg';

/**
 * Defines the props for the SelectV3 component.
 *
 * @param options - An array of OptionProps for the select options.
 * @param placeholder - The placeholder text for the select input.
 * @param defaultValue - The default selected option.
 * @param label - The label for the select input.
 * @param disabled - A boolean indicating if the select input is disabled.
 * @param errorText - The error message to display when there is an error.
 * @param hasError - A boolean indicating if the select input has an error.
 * @param styleParent - The CSS properties for the parent element.
 * @param onChange - A function that is called when the select value changes.
 * @param onOptionsDisabled - A function to determine if an option should be disabled.
 */
type Props = {
  options?: OptionProps[];
  placeholder?: string;
  defaultValue?: OptionProps | undefined;
  label?: string | undefined;
  disabled?: boolean;
  errorText?: string | undefined;
  hasError?: boolean | undefined;
  styleParent?: React.CSSProperties;
  onChange?: (response: any) => void;
  onOptionsDisabled?: (option: OptionProps, selectValue: Options<OptionProps>) => boolean;
};

/**
 * Renders a custom Select component with specified options, placeholder, default value, label, and styling.
 *
 * @param {Props} options - The list of options to display in the Select component.
 * @param {string} placeholder - The placeholder text for the Select component.
 * @param {OptionProps} defaultValue - The default selected value for the Select component.
 * @param {string} label - The label text for the Select component.
 * @param {boolean} disabled - Indicates if the Select component is disabled.
 * @param {function} onChange - Callback function triggered on option selection change.
 * @param {function} onOptionsDisabled - Function to determine if an option should be disabled.
 * @param {string} errorText - The error message to display.
 * @param {boolean} hasError - Indicates if the Select component has an error state.
 * @param {React.CSSProperties} styleParent - Custom styles for the parent container of the Select component.
 */
function SelectV3({
  options,
  placeholder = 'Seleccionar',
  defaultValue,
  label,
  disabled = false,
  onChange,
  onOptionsDisabled,
  errorText,
  hasError = false,
  styleParent,
}: Props) {
  const styleText = {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
  };

  return (
    <div
      className={`${styles['input-container']} ${hasError ? styles.error : ''}`}
      style={{
        ...styleParent,
        cursor: disabled ? 'not-allowed' : 'default',
      }}
    >
      <ReactSelect
        noOptionsMessage={() => 'Ninguna coincidencia'}
        options={options}
        placeholder={placeholder}
        // defaultValue={defaultValue}
        value={defaultValue}
        isDisabled={disabled}
        isSearchable
        styles={{
          container: (styles) => ({
            ...styles,
            alignSelf: 'stretch',
            border: 'none',
            ':focus-within': {
              border: 'none',
            },
            ':focus-visible': {
              border: 'none',
            },
            ':focus': {
              border: 'none',
            }
          }),
          control: (styles, { hasValue, isDisabled }) => ({
            ...styles,
            alignSelf: 'stretch',
            height: '56px',
            maxHeight: '56px',
            background: '#FFF',
            border: hasError ? '1px solid #D71158' : hasValue ? isDisabled ? '1px solid #A4B3C5' : '1px solid #09274A' : '1px solid #A4B3C5',
            borderRadius: '80px',
            paddingLeft: '15px',
            boxShadow: 'none',
            outline: 'none',
            ':hover': {
              borderColor: hasError ? '#D71158' : hasValue ? '#09274A' : '#A4B3C5',
            },
            ':focus': {
              borderColor: hasError ? '#D71158' : hasValue ? '#09274A' : '#A4B3C5',
            },
            ':focus-within': {
              borderColor: hasError ? '#D71158' : hasValue ? '#09274A' : '#A4B3C5',
            },
            ':focus-visible': {
              borderColor: hasError ? '#D71158' : hasValue ? '#09274A' : '#A4B3C5',
            },
          }),
          option: (styles, { isDisabled, isSelected, isFocused }) => ({
            ...styles,
            ...styleText,
            cursor: 'pointer',
            fontWeight: isSelected ? '700' : '400',
            color: isDisabled ? '#A4B3C5' : '#011E41',
            backgroundColor: isSelected || isFocused ? 'rgba(63, 107, 149, 0.1)' : '#F6F8FB',
            transition: 'background-color .3s',
            textAlign: 'left',
            ':hover': {
              backgroundColor: 'rgba(63, 107, 149, 0.1)',
            },
          }),
          menu: (styles) => ({
            ...styles,
            backgroundColor: '#F6F8FB',
          }),
          placeholder: (styles) => ({
            ...styles,
            ...styleText,
            color: '#A4B3C5',
            border: 'none',
            textAlign: 'left',
          }),
          input: (styles, { isDisabled }) => ({
            ...styles,
            ...styleText,
            color: isDisabled ? '#A4B3C5' : '#011E41',
            border: 'none',
            textAlign: 'left',
          }),
          singleValue: (styles, { isDisabled }) => ({
            ...styles,
            ...styleText,
            color: isDisabled ? '#A4B3C5' : '#011E41',
            border: 'none',
            textAlign: 'left',
            // fontWeight: isDisabled ? '400' : '700',
          }),
          indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
          dropdownIndicator: (styles, { isDisabled, hasValue }) => ({
            ...styles,
            backgroundImage: `url(${selectIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '10.16px 5.63px',
            marginRight: '22px',
            paddingRight: '0px',
            filter: isDisabled || !hasValue ? 'brightness(0) saturate(100%) invert(81%) sepia(24%) saturate(214%) hue-rotate(173deg) brightness(85%) contrast(86%)' : 'none',
            '> svg': {
              display: 'none',
            }
          }),
        }}
        isOptionDisabled={onOptionsDisabled}
        onChange={(response) => onChange?.(response?.value ?? '')}
      />
      <label
        style={{
          color: hasError
            ? '#D71158'
            : (disabled || !defaultValue)
              ? '#A4B3C5'
              : undefined,
        }}
      >
        {label}
      </label>
      {errorText && <div className={styles.helper}>{hasError && <span>{errorText}</span>}</div>}
    </div>
  );
}

export default SelectV3;
