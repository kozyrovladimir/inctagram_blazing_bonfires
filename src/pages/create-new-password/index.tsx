import React from 'react'

import { CreateNewPassword } from '@/pages-fs/auth-register'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const CreateNewPasswordPage = () => {
  return <CreateNewPassword />
}

CreateNewPasswordPage.getLayout = getLayout
export default CreateNewPasswordPage
