/**
 * Defines the structure of an item navigation type.
 *
 * @property {string} key - The unique key identifier for the item.
 * @property {string} label - The label or text associated with the item.
 * @property {string} href - The URL link for the item.
 * @property {React.ReactElement<HTMLImageElement>} icon - The icon element representing the item.
 * @property {string} [tooltip] - Optional tooltip text to show.
 */
export type ItemNavigationType = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactElement<HTMLImageElement>;
  tooltip?: string;
  index?: string
};

export type ItemNavigationHeaderType = Omit<ItemNavigationType, 'href' | 'icon' | 'label'> & {
  onClick?: () => void;
  label?: string;
  icon?: React.ReactElement<HTMLImageElement>;
  isSelected?: boolean;
};