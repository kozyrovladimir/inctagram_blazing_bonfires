import React from 'react'

import { TermsOfService } from '@/pages-fs/auth-register/ui/auth/TermOfService/TermsOfService'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

const TermsOfServicePage = () => {
  return (
    <div>
      <FormContainer title={'Terms of Policy'}>
        <TermsOfService />
      </FormContainer>
    </div>
  )
}

TermsOfServicePage.getLayout = getLayout
export default TermsOfServicePage
