import React from 'react'

import styles from './SignIn.module.scss'

import FormAuth, { FormOption } from '@/components/FormAuth/FormAuth'
import SignEntry from '@/components/FormAuth/SignEntry/SignEntry'

export const SignIn = () => {
  return (
    <div className={styles.signInConatainer}>
      <FormAuth title="Sign In">
        <SignEntry formOption={FormOption.SIGNIN} />
      </FormAuth>
    </div>
  )
}
