import React from 'react'

import styles from './CreateNewPassword.module.scss'

import FormAuth, { FormOption } from '@/components/FormAuth/FormAuth'

export const CreateNewPassword = () => {
  return (
    <div className={styles.CreateNewPassConatainer}>
      <FormAuth formOption={FormOption.CREATEPASSWORD} />
    </div>
  )
}
