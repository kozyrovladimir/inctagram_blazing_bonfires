import React from 'react'

import SignUpForm from '@/features/auth-register/ui/SignUpForm/SignUpForm'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const SignUp = () => {
  return (
    <FormContainer title="Sign Up">
      <SignUpForm />
    </FormContainer>
  )
}

SignUp.getLayout = getLayout
export default SignUp
