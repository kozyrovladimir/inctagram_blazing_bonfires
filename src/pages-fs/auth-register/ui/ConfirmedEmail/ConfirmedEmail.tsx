import React from 'react'

import Image from 'next/image'

import styles from './ConfirmedEmail.module.scss'

import broConfirmImage from '@/public/login/broCongratulations.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

export const ConfirmedEmail = () => {
  return (
    <div className={styles.conirmedContainer}>
      <h3>Congratulations!</h3>
      <p>Your email has been confirmed</p>
      <Button theme={ButtonTheme.FILLED}>Sign In</Button>
      <Image src={broConfirmImage} alt={'women login accaunt in her phone'} />
    </div>
  )
}
