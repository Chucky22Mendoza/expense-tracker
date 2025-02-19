import MediumButton from '../MediumButton';
import styles from './HeadButton.module.css';

type Props = {
  onClick?: () => void;
  label?: string;
  icon?: React.ReactElement;
  title: string;
  style?: React.CSSProperties
};

function HeadButton({
  onClick,
  label,
  icon,
  title,
  style,
}: Props) {
  return (
    <div className={styles['head-button']} style={style}>
      <h1>{title}</h1>
      {
        (icon || label) && (
          <MediumButton
            buttonType="secondary-outline"
            iconLeft={icon}
            onClick={onClick}
            text={label}
            styleSheet={{
              padding: '.6rem 1.2rem',
            }}
          />
        )
      }
    </div>
  )
}

export default HeadButton;
