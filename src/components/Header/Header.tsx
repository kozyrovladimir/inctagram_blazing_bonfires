'use client'
import { useState } from 'react'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Link from 'next/link'

import { LanguageSelect } from '../../widgets/LangSwitcher'

import s from './Header.module.scss'

export const Header = () => {
  const [count, setCounter] = useState(3)

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>
        Inctagram
      </Link>
      <div className={s.option}>
        <div className={s.ball}>
          <NotificationsNoneIcon />
          <div className={s.count}>{count}</div>
        </div>
        <div>
          <LanguageSelect />
        </div>
      </div>
    </header>
  )
}
