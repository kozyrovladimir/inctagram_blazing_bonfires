'use client'
import { useState } from 'react'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { LanguageSelect } from '../../langSwitcher'

import s from './Header.module.scss'

export const Header = () => {
  const [count, setCounter] = useState(3)
  const router = useRouter()
  const mainPath = router.pathname.split('/')

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>
        Instagram
        {mainPath[1] === 'super-admin' && (
          <span className={s.adminDescription}>
            <span className={s.adminDescriptionThin}>Super</span>Admin
          </span>
        )}
      </Link>
      <div className={s.option}>
        {mainPath[1] !== 'super-admin' && (
          <div className={s.ball}>
            <NotificationsNoneIcon />
            <div className={s.count}>{count}</div>
          </div>
        )}
        <div>
          <LanguageSelect />
        </div>
      </div>
    </header>
  )
}
