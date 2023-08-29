import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

import { useVerifyEmailMutation } from '@/shared/api'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
import { CircularProgressLoader } from '@/shared/ui/CircularProgressLoader/CircularProgressLoader'

export const RegistrationConfirmation = () => {
  const [verifyEmail] = useVerifyEmailMutation()
  const router = useRouter()
  const { query } = router
  const { code, email } = query

  useEffect(() => {
    if (code) {
      verifyEmail(code)
        .unwrap()
        .then(() => router.push(`/auth/confirmed-email`))
        .catch(e => {
          router.push(`/auth/expired-verification-link?email=${email}`)
        })
    }
  }, [code])

  return <CircularProgressLoader />
}

RegistrationConfirmation.getLayout = getLayout
export default RegistrationConfirmation
