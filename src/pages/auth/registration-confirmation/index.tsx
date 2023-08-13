import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { useVerifyEmailMutation } from '@/shared/api/auth.api'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import { Button } from '@/shared/ui/Button/Button'

const RegistrationConfirmation = () => {
  const [code, setCode] = useState('')
  const [verifyEmail] = useVerifyEmailMutation()

  useEffect(() => {
    const urlCode = window.location.search.split('=')[1]

    setCode(urlCode)
  }, [])

  useEffect(() => {
    if (code) {
      verifyEmail(code)
    }
  }, [code])

  return (
    <div>
      <p>Congratulations! Your email has been confirmed</p>
      <Link href={'/login'}>
        <Button>Sign in</Button>
      </Link>
    </div>
  )
}

RegistrationConfirmation.getLayout = getLayout
export default RegistrationConfirmation
