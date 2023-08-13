import React from 'react'

import Image from 'next/image'

import broImage from '../../../public/assets/icons/login/bro.svg'

import styles from './MergeAccounts.module.scss'

import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

const MergeAccountsPage = () => {
  return (
    <div className={styles.mergeAccContainer}>
      <h3>Merge of Accounts</h3>
      <p>
        The user with email <b>Epam@epam.com</b> is already in the system. Could we merge this
        accounts?
      </p>
      <Button theme={ButtonTheme.CLEAR}>Yes, merge</Button>
      <Button theme={ButtonTheme.CLEAR}>No</Button>
      <Image src={broImage} alt={'women login accaunt in her phone'} />
    </div>
  )
}

MergeAccountsPage.getLayout = getLayout
export default MergeAccountsPage
