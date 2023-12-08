import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SignInForm } from '@/features/auth-register'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const SignInPage = () => {
  return <SignInForm />
}

SignInPage.getLayout = getLayout
export default SignInPage
