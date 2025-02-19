import React from 'react';

// Props de botón
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonAnchorProps = {
  styleType: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'delete' | 'disabled';
  text?: string | null;
  iconLeft?: JSX.Element | null;
  iconRight?: JSX.Element | null;
  href?: string | null;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  styleSheet?: React.CSSProperties | undefined;
  target?: '_blank' | '_self' | '_parent' | '_top' | null;
  typeButton?: 'button' | 'submit' | 'reset';
  id?: string;
  styleText?: React.CSSProperties | undefined;
};

export type DefaultProps = Omit<ButtonAnchorProps, 'styleType'>;

export const defaultButtonAnchorProps: DefaultProps = {
  text: null,
  iconLeft: null,
  iconRight: null,
  href: null,
  onClick: () => { },
  styleSheet: {},
  target: null,
  typeButton: 'button',
};

export interface ButtonAnchorMediumProps extends DefaultProps {
  buttonType: 'primary' | 'primary-active' | 'primary-disabled' | 'primary-hover' | 'secondary' | 'secondary-active' | 'secondary-disabled' | 'secondary-hover' | 'secondary-outline' | 'tertiary';
}

// Opciones de entrada / salida
export type Overload = {
  (props: ButtonAnchorProps): JSX.Element;
  (props: ButtonAnchorProps): JSX.Element;
};
