import React from 'react'

import { Sign } from '@/features/auth-register'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
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
