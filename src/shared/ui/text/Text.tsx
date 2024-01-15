import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import style from './Text.module.scss'

export type TextType<T extends ElementType> = {
  size?: 'small' | 'medium' | 'regular' | 'large' | 'xl' | 'xxl' | 'link' | 'small_link'
  weight?: 'regular' | 'medium' | 'semi_bold' | 'bold'
  as: T
  className?: string
  color?: 'light' | 'primary' | 'error' | 'info'
} & ComponentPropsWithoutRef<T>

export const Text = <T extends ElementType>(
  props: TextType<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextType<T>>
) => {
  const {
    size = 'regular',
    weight = 'regular',
    color = 'light',
    className,
    as: Component = 'div',
    ...rest
  } = props

  const classname = clsx(style.default, style[size], style[weight], style[color], className)

  return <Component className={classname} {...rest} />
}
