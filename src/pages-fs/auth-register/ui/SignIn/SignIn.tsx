import React from 'react'

import styles from './SignIn.module.scss'

import FormAuth, { FormOption } from '@/features/auth/ui/FormAuth/FormAuth'
import Sign from '@/features/auth/ui/FormAuth/Sign/Sign'

export const SignIn = () => {
  return (
    <div className={styles.signInConatainer}>
      <FormAuth title="Sign In">
        <Sign formOption={FormOption.SIGNIN} />
      </FormAuth>
    </div>
  )
}
