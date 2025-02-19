import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import FooterMenu from '@/modules/shared/sections/FooterMenu';
import { ItemNavigationType } from '@/modules/shared/domain/Navigation';
import { Coins, History, Info, SettingsIcon, Tags } from 'lucide-react';

const items: ItemNavigationType[] = [
  {
    href: '/settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    tooltip: 'Manage your settings',
    key: 'settings',
    index: '0',
  },
  {
    href: '/history',
    label: 'History',
    icon: <History />,
    tooltip: 'View your history',
    key: 'history',
    index: '1',
  },
  {
    href: '/',
    label: 'Tracker',
    icon: <Coins />,
    key: 'tracker',
    index: '2',
    tooltip: 'View your tracker',
  },
  {
    href: '/tags',
    label: 'Tags',
    icon: <Tags />,
    key: 'tags',
    index: '3',
    tooltip: 'View your tags',
  },
  {
    href: '/about',
    label: 'About',
    icon: <Info />,
    key: 'about',
    index: '4',
    tooltip: 'About info',
  }

];

function TrackerLayout() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <Outlet key='dynamicContent' />
      </div>
      <FooterMenu items={items} />
    </main>
  );
}

export default TrackerLayout;
