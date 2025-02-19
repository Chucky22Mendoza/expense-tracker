/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';

// Props de botón
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

// Anchor props
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

// Opciones de entrada / salida
type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};

// Guard para verificar si existe href en props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps => 'href' in props;

// Componente
const ButtonOrAnchorProps: Overload = function returned(props: ButtonProps | AnchorProps) {
  const { children } = props;
  // renderizado de anchor
  if (hasHref(props)) return <a {...props}>{children}</a>;
  // renderizado de botón
  return <button type={props?.type ?? 'button'} {...props} />;
};

export default ButtonOrAnchorProps;
