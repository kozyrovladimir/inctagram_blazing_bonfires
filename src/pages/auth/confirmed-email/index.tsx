import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from './ConfirmedEmail.module.scss'

import broConfirmImage from '@/shared/assets/icons/login/broCongratulations.svg'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

const ConfirmedEmailPage = () => {
  return (
    <div className={styles.confirmedContainer}>
      <h3>Congratulations!</h3>
      <p>Your email has been confirmed</p>
      <Link href={'/sign-in'}>
        <Button theme={ButtonTheme.FILLED}>Sign In</Button>
      </Link>
      <Image src={broConfirmImage} alt={'women login account in her phone'} />
    </div>
  )
}

ConfirmedEmailPage.getLayout = getLayout
export default ConfirmedEmailPage
