import React from 'react'

import SignInForm from '@/features/auth-register/ui/SignInForm/SignInForm'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

export const SignIn = () => {
  return (
    <FormContainer title="Sign In">
      <SignInForm />
    </FormContainer>
  )
}
