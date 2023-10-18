import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import styles from './Navbar.module.scss'

export const Navbar = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Navbar' })
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <Link href="/profile/general-information">
        <div
          className={
            router.pathname === '/profile/general-information' ? styles['current-page'] : ''
          }
        >
          {t('GeneralInformation')}
        </div>
      </Link>
      <Link href="/profile/devices">
        <div className={router.pathname === '/profile/devices' ? styles['current-page'] : ''}>
          {t('Devices')}
        </div>
      </Link>
      <Link href="/profile/account-management">
        <div
          className={
            router.pathname === '/profile/account-management' ? styles['current-page'] : ''
          }
        >
          {t('AccountManagement')}
        </div>
      </Link>
      <Link href="/profile/my-payments">
        <div className={router.pathname === '/profile/my-payments' ? styles['current-page'] : ''}>
          {t('MyPayments')}
        </div>
      </Link>
    </nav>
  )
}
