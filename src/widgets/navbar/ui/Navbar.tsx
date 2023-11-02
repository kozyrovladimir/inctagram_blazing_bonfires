import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import styles from './Navbar.module.scss'

import { RoutersPath } from '@/shared/constants/paths'

export const Navbar = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Navbar' })
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <Link href={RoutersPath.profileGeneralInformation}>
        <div
          className={
            router.pathname === RoutersPath.profileGeneralInformation ? styles['current-page'] : ''
          }
        >
          {t('GeneralInformation')}
        </div>
      </Link>
      <Link href={RoutersPath.profileDevices}>
        <div
          className={router.pathname === RoutersPath.profileDevices ? styles['current-page'] : ''}
        >
          {t('Devices')}
        </div>
      </Link>
      <Link href={RoutersPath.profileAccountManagement}>
        <div
          className={
            router.pathname === RoutersPath.profileAccountManagement ? styles['current-page'] : ''
          }
        >
          {t('AccountManagement')}
        </div>
      </Link>
      <Link href={RoutersPath.profileMyPayments}>
        <div
          className={
            router.pathname === RoutersPath.profileMyPayments ? styles['current-page'] : ''
          }
        >
          {t('MyPayments')}
        </div>
      </Link>
    </nav>
  )
}
