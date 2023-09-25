import React, { useEffect } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './Github.module.scss'

import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
import { CircularLoader } from '@/shared/ui/Loaders/CircularLoader'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const ForgotPasswordPage = () => {
  const router = useRouter()
  const { accessToken } = router.query

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken as string)
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
