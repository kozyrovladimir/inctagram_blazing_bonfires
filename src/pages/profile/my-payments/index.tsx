import * as React from 'react'

import { Payments } from '@/features/profile-setting/ui/payments/Payments'
import { settingLayout } from '@/shared/layouts/profileLayout/SettingLayout'

function MyPayments() {
  return (
    <>
      <Payments />
    </>
  )
}

MyPayments.getLayout = settingLayout
export default MyPayments
