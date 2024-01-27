import React from 'react'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { AdminSignInForm } from '@/entities/admin/admin-sign-in-form/AdminSignInForm'
import UsersList from '@/pages/super-admin/users-list'
import { RoutersPath } from '@/shared/constants/paths'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
import { RootState } from '@/shared/providers/storeProvider'

const AdminSignIn = () => {
  return <AdminSignInForm />
}

AdminSignIn.getLayout = getAdminLayout
export default AdminSignIn
