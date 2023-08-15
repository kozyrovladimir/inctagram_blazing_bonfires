import React from 'react'

import Image from 'next/image'

import styles from './ConfirmedEmail.module.scss'

import broConfirmImage from '@/shared/assets/icons/login/broCongratulations.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ConfirmedEmail = () => {
  return (
    <div className={styles.conirmedContainer}>
      <h3>Congratulations!</h3>
      <p>Your email has been confirmed</p>
      <Button theme={ButtonTheme.FILLED}>Sign In</Button>
      <Image src={broConfirmImage} alt={'women login accaunt in her phone'} />
    </div>
  )
}

ConfirmedEmail.getLayout = getLayout
export default ConfirmedEmail
