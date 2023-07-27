import React from 'react'

import { SignIn } from '@/pages-fs/auth-register/ui/SignIn/SignIn'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const SignInPage = () => {
  return <SignIn />
}

SignInPage.getLayout = getLayout
export default SignInPage
