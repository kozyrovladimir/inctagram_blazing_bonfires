import React from 'react'

import { TermsOfService } from '@/pages-fs/auth-register/ui/auth/TermOfService/TermsOfService'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const TermsOfServicePage = () => {
  return (
    <div>
      <TermsOfService />
    </div>
  )
}

TermsOfServicePage.getLayout = getLayout
export default TermsOfServicePage
