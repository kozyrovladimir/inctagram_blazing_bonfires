import React from 'react'

import SignInForm from '@/features/auth/ui/SignInForm/SignInForm'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

export const SignIn = () => {
  return (
    <FormContainer title="Sign In">
      <SignInForm />
    </FormContainer>
  )
}
