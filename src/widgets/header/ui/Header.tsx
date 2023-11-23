'use client'
import { useState } from 'react'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Link from 'next/link'

import styles from './Header.module.scss'

import { LanguageSelect } from '@/widgets/langSwitcher/index'

export const Header = () => {
  const [count, setCounter] = useState(3)

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Instagram
        </Link>
        <div className={styles.option}>
          <div className={styles.ball}>
            <NotificationsNoneIcon />
            <div className={styles.count}>{count}</div>
          </div>
          <div className={styles.langSwitcherContainer}>
            <LanguageSelect />
          </div>
        </div>
      </header>
    </>
  )
}
