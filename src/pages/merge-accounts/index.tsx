import React from 'react'

import Image from 'next/image'

import styles from './MergeAccounts.module.scss'

import broImage from '@/shared/assets/icons/login/bro.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

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
