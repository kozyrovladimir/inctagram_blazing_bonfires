import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Navbar.module.scss'

export const Navbar = () => {
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <Link href="/profile/general-information">
        <div
          className={
            router.pathname === '/profile/general-information' ? styles['current-page'] : ''
          }
        >
          General information
        </div>
      </Link>
      <Link href="/profile/devices">
        <div className={router.pathname === '/profile/devices' ? styles['current-page'] : ''}>
          Devices
        </div>
      </Link>
      <Link href="/profile/account-management">
        <div
          className={
            router.pathname === '/profile/account-management' ? styles['current-page'] : ''
          }
        >
          Account Management
        </div>
      </Link>
      <Link href="/profile/my-payments">
        <div className={router.pathname === '/profile/my-payments' ? styles['current-page'] : ''}>
          My payments
        </div>
      </Link>
    </nav>
  )
}
