import React from 'react'

import styles from './ForgotPassword.module.scss'

import { ForgotPass } from '@/features/auth-register/ui/ForgotPassForm/ForgotPassForm'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

const ForgotPasswordPage = () => {
  return (
    <FormContainer title="Forgot Password" className={styles.forgotPassContainer}>
      <ForgotPass />
    </FormContainer>
  )
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
