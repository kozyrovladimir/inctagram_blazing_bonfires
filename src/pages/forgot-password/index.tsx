import React from 'react'

import styles from './ForgotPassword.module.scss'

import ForgotPassForm from '@/features/auth-register/ui/ForgotPassForm/ForgotPassForm'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { getLayout } from '@/shared/ui/layout/MainLayout/MainLayout'

const ForgotPasswordPage = () => {
  return (
    <FormContainer title="Forgot Password" className={styles.forgotPassContainer}>
      <ForgotPassForm />
    </FormContainer>
  )
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
