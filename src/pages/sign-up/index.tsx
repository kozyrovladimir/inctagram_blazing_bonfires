import React from 'react'

import { SignUpForm } from '@/features/auth-register'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'

const SignUp = () => {
  return <SignUpForm />
}

SignUp.getLayout = getLayout
export default SignUp
