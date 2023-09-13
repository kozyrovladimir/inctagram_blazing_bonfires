import React from 'react'

import { ForgotPass } from '@/features/auth-register/ui/ForgotPassForm/ForgotPassForm'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'

const ForgotPasswordPage = () => {
  return <ForgotPass />
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
