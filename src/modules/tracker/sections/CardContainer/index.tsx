import { PropsWithChildren } from 'react';
import styles from './CardContainer.module.css';
import { cn } from '../../../../lib/utils';

type CardProps = PropsWithChildren<{
  title: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  buttonText?: string;
}>;

type ContentProps = PropsWithChildren<{
  style?: React.CSSProperties;
  className?: string;
}>;

export function CardContainer({
  title,
  style,
  onClick,
  buttonText,
  className,
  children,
}: CardProps) {
  return (
    <div className={cn(styles.card, className ?? '')} style={style}>
      <div>
        <h1>{title}</h1>
        {buttonText && <button onClick={onClick}>{buttonText}</button>}
      </div>
      {children}
    </div>
  );
}

export function CardContent({ children, style, className }: ContentProps) {
  return <div className={cn(styles.container, className ?? '')} style={style}>{children}</div>;
}
