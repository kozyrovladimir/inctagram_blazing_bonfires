import React from 'react'

import styles from './SIgnUp.module.scss'

import FormAuth, { FormOption } from '@/components/FormAuth/FormAuth'
import SignEntry from '@/components/FormAuth/SignEntry/SignEntry'

export const SignUp = () => {
  return (
    <div className={styles.signUpConatainer}>
      <FormAuth title="Sign Up">
        <SignEntry formOption={FormOption.SIGNUP} />
      </FormAuth>
    </div>
  )
}
