import styles from './FooterMenu.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonNavigation from './ButtonNavigation';
import { ItemNavigationType } from '../../domain/Navigation';

/**
 * Specifies the props for the FooterMenu component.
 * @property {ItemNavigationType[]} items - The items to be displayed in the footer menu.
 */
type Props = {
  items: ItemNavigationType[];
};

/**
 * Renders a footer menu with navigation buttons for each item.
 *
 * @param items - An array of items to be displayed as navigation buttons.
 */
function FooterMenu({ items }: Props) {
	const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.buttons}>
        {
          items.map((item) => (
            <ButtonNavigation
              key={item.key}
              item={item}
              onClick={() => navigate(item.href)}
              isCurrentTab={pathname === item.href}
            />
          ))
        }
      </div>
    </nav>
  );
}

export default FooterMenu;
