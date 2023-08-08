import React from 'react'

import { RegistrationConfirmation } from '@/pages-fs/auth-register/ui/auth/RedistrationConfirmation/RegistrationConfirmation'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const RegistrationConfirmationPage = () => {
  return <RegistrationConfirmation />
}

RegistrationConfirmationPage.getLayout = getLayout
export default RegistrationConfirmationPage
