import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Home from './home'

import { makePublicPageLayout } from '@/shared/layouts'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function Landing() {
  return <Home />
}

Landing.getLayout = makePublicPageLayout
export default Landing
