import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

import styles from './Github.module.scss'

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
    <div className={styles.loaderWrapper}>
      <CircularProgress />
    </div>
  )
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
