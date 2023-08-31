import React from 'react'

import { Sign } from '@/features/auth-register'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const SignInPage = () => {
  return (
    <div>
      <FormContainer title={'Sign in'}>
        <Sign />
      </FormContainer>
    </div>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
