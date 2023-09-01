import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ForgotPasswordPage = () => {
  const router = useRouter()
  const { accessToken } = router.query

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      router.push('/profile')
    } else {
      router.push('/sign-in')
    }
  }, [accessToken])

  return (
    <FormContainer title="">
      <CircularProgress />
    </FormContainer>
  )
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
