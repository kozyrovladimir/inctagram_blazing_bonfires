import React, { ButtonHTMLAttributes, FC } from 'react'

import { classNames } from '../../libs/classNames/classNames'

import cls from './Button.module.scss'

export enum ButtonTheme {
  NOBORDER = 'noborder',
  CLEAR = 'clear',
  FILLED = 'filled',
}

export enum ButtonSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
  STRETCHED = 'stretched',
}

type Props = {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: Props) => {
  const {
    className,
    children,
    theme = ButtonTheme.FILLED,
    size = ButtonSize.MIDDLE,
    ...otherProps
  } = props

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={classNames(cls.Button, {}, [className ? className : '', cls[theme], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
