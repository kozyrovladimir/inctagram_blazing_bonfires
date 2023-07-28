import React from 'react'

import { ExpiredVerificationLink } from '@/pages-fs/auth-register'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const ExpiredVerificationLinkPage = () => {
  return <ExpiredVerificationLink />
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
