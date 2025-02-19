'use client';

import React from 'react';
import styles from './medium-button.module.css';
import { ButtonAnchorMediumProps } from '../ButtonOrAnchorProps/ButtonProps';
import ButtonOrAnchorProps from '../ButtonOrAnchorProps';

function MediumButton({
  buttonType,
  text = null,
  iconLeft = null,
  iconRight = null,
  href = null,
  onClick = () => { },
  styleSheet = {},
  target = null,
  styleText,
  typeButton,
}: ButtonAnchorMediumProps) {
  const textElement = (text !== null && text !== '')
    ? <span style={styleText}>{text}</span>
    : null;
  const childContent: React.ReactElement = (
    <>
      {iconLeft}
      {textElement}
      {iconRight}
    </>
  );

  // renderizado de anchor
  if (href !== null && href !== '') {
    return (
      <ButtonOrAnchorProps target={target ?? '_self'} style={styleSheet} href={href ?? '/'} className={`${styles[buttonType]}`}>
        {childContent}
      </ButtonOrAnchorProps>
    );
  }
  // renderizado de botón
  return (
    <ButtonOrAnchorProps type={typeButton} style={styleSheet} className={`${styles[buttonType]}`} onClick={onClick}>
      {childContent}
    </ButtonOrAnchorProps>
  );
}

export default MediumButton;
