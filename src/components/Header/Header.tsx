'use client'
import { useState } from 'react'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import { LanguageSelect } from '../LangaugeSelect/LangaugeSelect'

import s from './Header.module.scss'

export const Header = () => {
  const [count, setCounter] = useState(3)

  return (
    <div className={s.header}>
      <div className={s.logo}>Inctagram</div>
      <div className={s.option}>
        <div className={s.ball}>
          <NotificationsNoneIcon />
          <div className={s.count}>{count}</div>
        </div>
        <div>
          <LanguageSelect />
        </div>
      </div>
    </div>
  )
}
