import React from 'react'

import { ProfileSetting } from '@/features/profile-setting'
import { settingLayout } from '@/shared/layouts/ProfileLayout/SettingLayout'

function GeneralInformation() {
  return (
    <>
      <ProfileSetting />
    </>
  )
}

GeneralInformation.getLayout = settingLayout
export default GeneralInformation
