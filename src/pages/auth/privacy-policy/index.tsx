import React from 'react'

import { PrivacyPolicy } from '@/pages-fs/auth-register/ui/auth/PrivacyPolicy/PrivacyPolicy'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const PrivacyPolicyPage = () => {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  )
}

PrivacyPolicyPage.getLayout = getLayout
export default PrivacyPolicyPage
