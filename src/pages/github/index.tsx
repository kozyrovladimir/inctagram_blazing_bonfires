import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import styles from './Github.module.scss'

import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
import { CircularLoader } from '@/shared/ui/Loaders/CircularLoader'

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
    <div className={styles.loaderWrapper}>
      <CircularLoader />
    </div>
  )
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
