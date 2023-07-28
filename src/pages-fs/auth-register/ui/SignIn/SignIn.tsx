import React from 'react'

import styles from './SignIn.module.scss'

import FormAuth, { FormOption } from '@/components/FormAuth/FormAuth'

export const SignIn = () => {
  return (
    <div className={styles.signInConatainer}>
      <FormAuth formOption={FormOption.SIGNIN} />
    </div>
  )
}
