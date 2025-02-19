import React from 'react';
import styles from './tooltip.module.scss';

/**
 * Defines the props for the Tooltip component.
 * @property {React.CSSProperties} [style] - The inline style object for the Tooltip.
 * @property {string} [className] - The CSS class name for the Tooltip.
 * @property {React.ReactNode} children - The content to be displayed within the Tooltip.
 * @property {'start' | 'end' | 'default'} [orientationY] - The vertical orientation of the Tooltip.
 * @property {'start' | 'end' | 'default'} [orientationX] - The horizontal orientation of the Tooltip.
 * @property {'left' | 'right' | 'top' | 'bottom'} [orientationArrow] - The orientation of the arrow on the Tooltip.
 * @property {'left' | 'right' | 'top' | 'bottom' | 'default'} [arrowPosition] - The position of the arrow on the Tooltip.
 */
type Props = {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  orientationY?: 'start' | 'end' | 'default';
  orientationX?: 'start' | 'end' | 'default';
  orientationArrow?: 'left' | 'right' | 'top' | 'bottom';
  arrowPosition?: 'left' | 'right' | 'top' | 'bottom' | 'default',
};

/**
 * Tooltip component to display additional information on hover.
 *
 * @param style - Inline styles for the tooltip.
 * @param children - The content to be displayed inside the tooltip.
 * @param className - Additional CSS class for the tooltip.
 * @param orientationX - Horizontal orientation of the tooltip ('default' by default).
 * @param orientationY - Vertical orientation of the tooltip ('default' by default).
 * @param orientationArrow - Orientation of the arrow on the tooltip ('bottom' by default).
 * @param arrowPosition - Position of the arrow on the tooltip ('default' by default).
 */
function Tooltip({
  style,
  children,
  className,
  orientationX = 'default',
  orientationY = 'default',
  orientationArrow = 'bottom',
  arrowPosition = 'default',
}: Props) {
  const arrowClassName = `${orientationArrow}-arrow`;
  const arrowPositionClassName = `${arrowPosition}-position`;

  return (
    <div style={{...style}} className={`${styles.tooltip} ${styles[arrowPositionClassName]} ${styles[arrowClassName]} ${styles[`x-${orientationX}`]} ${styles[`y-${orientationY}`]} ${className ?? ''}`} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <span>
        {children}
      </span>
    </div>
  );
}

export default Tooltip;
