import React from 'react'

import styles from './SIgnUp.module.scss'

import FormAuth, { FormOption } from '@/features/auth/ui/FormAuth/FormAuth'
import Sign from '@/features/auth/ui/FormAuth/Sign/Sign'

export const SignUp = () => {
  return (
    <div className={styles.signUpConatainer}>
      <FormAuth title="Sign Up">
        <Sign formOption={FormOption.SIGNUP} />
      </FormAuth>
    </div>
  )
}
