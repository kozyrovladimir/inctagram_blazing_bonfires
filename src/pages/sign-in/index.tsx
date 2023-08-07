import React from 'react'

import Sign from '@/features/auth-register/ui/SignInForm/Sign'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

const SignInPage = () => {
  return (
    <div>
      <FormContainer title={'Sing in'}>
        <Sign />
      </FormContainer>
    </div>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
