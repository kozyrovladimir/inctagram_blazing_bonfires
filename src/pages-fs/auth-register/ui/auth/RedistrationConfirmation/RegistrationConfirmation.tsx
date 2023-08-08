import React, { FC, useEffect, useState } from 'react'

import Link from 'next/link'

import { useVerifyEmailMutation } from '@/shared/api/auth.api'
import { Button } from '@/shared/ui/Button/Button'

export const RegistrationConfirmation: FC = () => {
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

  console.log(code)

  return (
    <div>
      <p>Congratulations! Your email has been confirmed</p>
      <Link href={'/login'}>
        <Button>Sign in</Button>
      </Link>
    </div>
  )
}
