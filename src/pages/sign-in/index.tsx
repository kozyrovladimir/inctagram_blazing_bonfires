import React from 'react'

import { SignInForm } from '@/features/auth-register'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'

const SignInPage = () => {
  return <SignInForm />
}

SignInPage.getLayout = getLayout
export default SignInPage
