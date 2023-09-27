import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ForgotPass } from '@/features/auth-register/ui/ForgotPassForm/ForgotPassForm'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const ForgotPasswordPage = () => {
  return <ForgotPass />
}

ForgotPasswordPage.getLayout = getLayout
export default ForgotPasswordPage
