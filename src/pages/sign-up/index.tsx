import React from 'react'

import { SignUpForm } from '@/features/auth-register/ui/SignUpForm/SignUpForm'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

const SignUp = () => {
  return (
    <FormContainer title="Sign Up">
      <SignUpForm />
    </FormContainer>
  )
}

SignUp.getLayout = getLayout
export default SignUp
