import Link from 'next/link'

import styles from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/profile/general-information">
        <div>General information</div>
      </Link>
      <Link href="/profile/devices">
        <div>Devices</div>
      </Link>
      <Link href="/profile/account-management">
        <div>Account Management</div>
      </Link>
      <Link href="/profile/my-payments">
        <div>Payments</div>
      </Link>
    </nav>
  )
}
