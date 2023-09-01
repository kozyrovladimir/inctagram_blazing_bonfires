import React from 'react'

import SignUpForm from '@/features/auth-register/ui/SignUpForm/SignUpForm'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const SignUp = () => {
  return <SignUpForm />
}

SignUp.getLayout = getLayout
export default SignUp
