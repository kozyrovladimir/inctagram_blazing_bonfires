import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ForgotPasswordPage = () => {
  const router = useRouter()
  const { accessToken } = router.query

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  }

  return (
    <FormContainer title="GitHub">
      <h4>You are logged in successfully</h4>
      <Link href="/profile">profile</Link>
    </FormContainer>
  )
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
