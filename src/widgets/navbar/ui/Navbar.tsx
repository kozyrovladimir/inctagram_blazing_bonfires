import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import styles from './Navbar.module.scss'

import {
  PROFILE_ACCOUNT_MANAGEMENT_PATH,
  PROFILE_DEVICES_PATH,
  PROFILE_GENERAL_INFORMATION_PATH,
  PROFILE_MY_PAYMENTS_PATH,
} from '@/shared/constants/paths'

export const Navbar = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Navbar' })
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <Link href={PROFILE_GENERAL_INFORMATION_PATH}>
        <div
          className={
            router.pathname === PROFILE_GENERAL_INFORMATION_PATH ? styles['current-page'] : ''
          }
        >
          {t('GeneralInformation')}
        </div>
      </Link>
      <Link href={PROFILE_DEVICES_PATH}>
        <div className={router.pathname === PROFILE_DEVICES_PATH ? styles['current-page'] : ''}>
          {t('Devices')}
        </div>
      </Link>
      <Link href={PROFILE_ACCOUNT_MANAGEMENT_PATH}>
        <div
          className={
            router.pathname === PROFILE_ACCOUNT_MANAGEMENT_PATH ? styles['current-page'] : ''
          }
        >
          {t('AccountManagement')}
        </div>
      </Link>
      <Link href={PROFILE_MY_PAYMENTS_PATH}>
        <div className={router.pathname === PROFILE_MY_PAYMENTS_PATH ? styles['current-page'] : ''}>
          {t('MyPayments')}
        </div>
      </Link>
    </nav>
  )
}
