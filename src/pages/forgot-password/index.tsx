import React from 'react'

import { ForgotPassword } from '@/pages-fs/auth-register/ui/ForgotPassword/ForgotPassword'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const ForgotPasswordPage = () => {
  return <ForgotPassword />
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
