import React from 'react'

import { CreateNewPassForm } from '@/features/auth-register'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'

const CreateNewPassword = () => {
  return <CreateNewPassForm />
}

CreateNewPassword.getLayout = getLayout
export default CreateNewPassword
