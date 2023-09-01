import React from 'react'

import { Sign } from '@/features/auth-register'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const SignInPage = () => {
  return <Sign />
}

SignInPage.getLayout = getLayout
export default SignInPage
