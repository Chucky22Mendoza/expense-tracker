import styles from './switch.module.css';

/**
 * Defines the props for the Switch component.
 * @param {string} label - The label for the Switch component.
 * @param {(value: boolean) => void} onChange - The function called when the Switch value changes.
 * @param {boolean} checked - The current checked state of the Switch component.
 */
type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  label?: string;
  onChange?: (value: boolean) => void;
  checked?: boolean;
  prevLabel?: string;
  styleParent?: React.CSSProperties;
  styleLabel?: React.CSSProperties;
  stylePrevLabel?: React.CSSProperties;
  styleIndicator?: React.CSSProperties;
};

/**
 * Functional component for a switch input element.
 *
 * @param {Props} props - The props for the Switch component.
 */
function Switch(props: Props) {
  const {
    onChange,
    label,
    checked = false,
    styleParent,
    prevLabel = '',
    styleLabel,
    stylePrevLabel,
    styleIndicator,
  } = props;

  let propsInput = { ...props };
  delete propsInput.label;
  delete propsInput.styleParent;
  delete propsInput.checked;
  delete propsInput.prevLabel;
  delete propsInput.styleLabel;
  delete propsInput.stylePrevLabel;
  delete propsInput.styleIndicator;

  return (
    <label className={styles.label} style={styleParent}>
      <span style={stylePrevLabel}>{prevLabel}</span>
      <div>
        <input
          {...propsInput}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className={styles.indicator} style={styleIndicator} />
      </div>
      <span style={styleLabel}>{label}</span>
    </label>
  );
}

export default Switch;
