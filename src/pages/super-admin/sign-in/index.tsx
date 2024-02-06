import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AdminSignInForm } from '@/entities/admin'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const AdminSignIn = () => {
  return <AdminSignInForm />
}

AdminSignIn.getLayout = getAdminLayout
export default AdminSignIn
