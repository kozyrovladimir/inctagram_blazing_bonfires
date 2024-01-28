import React from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSelector } from 'react-redux'

import { AdminSignInForm } from '@/entities/admin/admin-sign-in-form/AdminSignInForm'
import UsersList from '@/pages/super-admin/users-list'
import { RoutersPath } from '@/shared/constants/paths'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
import { RootState } from '@/shared/providers/storeProvider'

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
