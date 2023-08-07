import React from 'react'

import SignUpForm from '@/features/auth-register/ui/SignUpForm/SignUpForm'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

export const SignUp = () => {
  return (
    <FormContainer title="Sign Up">
      <SignUpForm />
    </FormContainer>
  )
}
