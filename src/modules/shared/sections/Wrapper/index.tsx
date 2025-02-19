import { PropsWithChildren } from 'react';
import styles from './Wrapper.module.scss';

type Props = PropsWithChildren<{
  style?: React.CSSProperties;
  className?: string;
}>;

export function Wrapper({ children, style, className }: Props) {
  return (
    <section className={`${styles.content} ${className}`} style={style}>
      {children}
    </section>
  );
}
export function WrapperBody({ children, style, className }: Props) {
  return (
    <div className={`${styles.body} ${className}`} style={style}>
      {children}
    </div>
  );
}
