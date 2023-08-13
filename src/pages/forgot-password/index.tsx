import React from 'react'

import styles from './ForgotPassword.module.scss'

import ForgotPassForm from '@/features/auth-register/ui/ForgotPassForm/ForgotPassForm'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

const ForgotPasswordPage = () => {
  return (
    <FormContainer title="Forgot Password" className={styles.forgotPassContainer}>
      <ForgotPassForm />
    </FormContainer>
  )
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
