'use client';

import React from 'react';
import styles from './large-button.module.css';
import { ButtonAnchorProps } from '../ButtonOrAnchorProps/ButtonProps';
import ButtonOrAnchorProps from '../ButtonOrAnchorProps';

function LargeButton({
  styleType,
  text = null,
  iconLeft = null,
  iconRight = null,
  href = null,
  onClick = () => {},
  styleSheet = {},
  target = null,
  typeButton = 'button',
  styleText,
  download,
}: ButtonAnchorProps) {
  // Guard para verificar si existe href en props
  const textElement = (text !== '' && text !== null)
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
      <ButtonOrAnchorProps
        target={target ?? '_self'}
        href={href ?? '/'}
        className={`${styles.medium} ${styles[styleType]}`}
        style={styleSheet}
        download={download}
      >
        {childContent}
      </ButtonOrAnchorProps>
    );
  }
  // renderizado de botón
  return (
    <ButtonOrAnchorProps
      type={typeButton}
      className={`${styles.medium} ${styles[styleType]}`}
      onClick={onClick}
      style={styleSheet}
    >
      {childContent}
    </ButtonOrAnchorProps>
  );
}

export default LargeButton;
