import React, { useState } from 'react'

import styles from './ForgotPassword.module.scss'

import FormAuth, { FormOption } from '@/components/FormAuth/FormAuth'

export const ForgotPassword = () => {
  return (
    <div className={styles.forgotPassConatainer}>
      <FormAuth formOption={FormOption.FORGOTPASSWORD} />
    </div>
  )
}
