import Tooltip from '@/modules/shared/sections/Tooltip';
import styles from './FooterMenu.module.scss';
import { ItemNavigationType } from '../../domain/Navigation';

type Props = {
  item: ItemNavigationType;
  onClick: () => void;
  isCurrentTab: boolean;
};

/**
 * Functional component for rendering a button navigation item.
 *
 * @param item - The navigation item to display.
 * @param onClick - The function to call when the button is clicked.
 * @param isCurrentTab - A boolean indicating if the item is the current active tab.
 * @returns JSX element representing the button navigation item.
 */
function ButtonNavigation({ item, onClick, isCurrentTab }: Props) {
  return (
    <button onClick={onClick} className={isCurrentTab ? styles.selected : undefined}>
      <div className={styles['img-rounded']}>
        {item.icon}
      </div>
      <span>{item.label}</span>
      {
        item.tooltip
          ? (
            <Tooltip
              orientationY="start"
              className={styles.tooltip}
            >
              {item.tooltip}
            </Tooltip>
          )
          : null
      }
    </button>
  )
}

export default ButtonNavigation