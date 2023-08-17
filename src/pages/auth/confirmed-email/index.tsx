import React from 'react'

import Image from 'next/image'

import styles from './ConfirmedEmail.module.scss'

import broConfirmImage from '@/shared/assets/icons/login/broCongratulations.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ConfirmedEmailPage = () => {
  return (
    <div className={styles.confirmedContainer}>
      <h3>Congratulations!</h3>
      <p>Your email has been confirmed</p>
      <Button theme={ButtonTheme.FILLED}>Sign In</Button>
      <Image src={broConfirmImage} alt={'women login account in her phone'} />
    </div>
  )
}

ConfirmedEmailPage.getLayout = getLayout
export default ConfirmedEmailPage
