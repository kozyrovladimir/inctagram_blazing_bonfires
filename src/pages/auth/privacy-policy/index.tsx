import React from 'react'

import { PrivacyPolicy } from '@/pages-fs/auth-register/ui/auth/PrivacyPolicy/PrivacyPolicy'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

const PrivacyPolicyPage = () => {
  return (
    <div>
      <FormContainer title={'Privacy Policy'} style={{ width: '900px' }}>
        <PrivacyPolicy />
      </FormContainer>
    </div>
  )
}

PrivacyPolicyPage.getLayout = getLayout
export default PrivacyPolicyPage
