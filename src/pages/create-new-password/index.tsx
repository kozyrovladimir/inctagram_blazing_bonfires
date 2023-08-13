import React from 'react'

import styles from './CreateNewPassword.module.scss'

import { CreateNewPassForm } from '@/features/auth-register'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { getLayout } from '@/shared/ui/layout/MainLayout/MainLayout'

const CreateNewPassword = () => {
  return (
    <FormContainer title="Create New Password" className={styles.createNewPassContainer}>
      <CreateNewPassForm />
    </FormContainer>
  )
}

CreateNewPassword.getLayout = getLayout
export default CreateNewPassword
