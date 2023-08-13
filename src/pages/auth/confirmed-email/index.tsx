import React from 'react'

import Image from 'next/image'

import broConfirmImage from '../../../../public/assets/icons/login/broCongratulations.svg'

import styles from './ConfirmedEmail.module.scss'

import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

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
