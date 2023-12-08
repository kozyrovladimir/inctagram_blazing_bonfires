import React, { useEffect } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './Github.module.scss'

import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { CircularLoader } from '@/shared/ui/loaders/CircularLoader'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const GithubLoginPage = () => {
  const router = useRouter()
  const { accessToken, email } = router.query

  console.log(accessToken)
  console.log(email)

  useEffect(() => {
    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken as string)
      router.push(`/profile`)
    } else {
      router.push(`/sign-in`)
    }
  }, [accessToken])

  return (
    <div className={styles.loaderWrapper}>
      <CircularLoader />
    </div>
  )
}

// http://localhost:3000/github?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3OCwiaWF0IjoxNzAxODgxOTY3LCJleHAiOjE3MDE4ODU1Njd9.LcVt3fDlCTmAd0VLbYJoUBkv4pz2qLBFMds8xAhECA0&email=borashek@inbox.ru

GithubLoginPage.getLayout = getLayout
export default GithubLoginPage
