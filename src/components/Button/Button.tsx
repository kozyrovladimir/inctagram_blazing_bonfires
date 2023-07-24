import React, { ButtonHTMLAttributes, FC } from 'react'

import { classNames } from '../../libs/classNames/classNames'

import cls from './Button.module.scss'

export enum ButtonTheme {
  CLEAR = 'clear',
  FILLED = 'filled',
}

export enum ButtonSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
  STRETCHED = 'stretched',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = props => {
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
      className={classNames(cls.Button, {}, [className, cls[theme], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
