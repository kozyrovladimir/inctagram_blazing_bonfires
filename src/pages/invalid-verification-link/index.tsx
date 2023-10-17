import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const InvalidVerificationLinkPage = () => {
  return <div>InvalidVerificationLink</div>
}

InvalidVerificationLinkPage.getLayout = getLayout
export default InvalidVerificationLinkPage
