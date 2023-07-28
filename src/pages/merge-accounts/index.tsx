import React from 'react'

import { MergeAccounts } from '@/pages-fs/auth-register'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

const MergeAccountsPage = () => {
  return <MergeAccounts />
}

MergeAccountsPage.getLayout = getLayout
export default MergeAccountsPage
