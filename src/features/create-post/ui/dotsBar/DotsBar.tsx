import React from 'react'

import style from './DotsBar.module.scss'

import { classNames } from '@/shared/libs/classNames/classNames'

interface DotsBarProps {
  count: number
  activeIndex: number
}

export const DotsBar: React.FC<DotsBarProps> = ({ activeIndex, count }) => {
  return (
    <div className={style.dotWrapper}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={classNames(style.dot, { [style.active]: activeIndex === index })}
        />
      ))}
    </div>
  )
}
