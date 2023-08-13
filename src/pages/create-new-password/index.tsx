import React from 'react'

import styles from './CreateNewPassword.module.scss'

import { CreateNewPassForm } from '@/features/auth-register'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

const CreateNewPassword = () => {
  return (
    <FormContainer title="Create New Password" className={styles.createNewPassContainer}>
      <CreateNewPassForm />
    </FormContainer>
  )
}

CreateNewPassword.getLayout = getLayout
export default CreateNewPassword
