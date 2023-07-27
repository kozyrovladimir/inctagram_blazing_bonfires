import React from 'react'

import { SignUp } from '@/pages-fs/auth-register'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const SignUpPage = () => {
  return <SignUp />
}

SignUpPage.getLayout = getLayout
export default SignUpPage
