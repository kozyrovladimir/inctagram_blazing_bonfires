import React from 'react'

import { ProfileSetting } from '@/features/profile-setting/ProfileSetting'
import { settingLayout } from '@/shared/layout/ProfileLayout/SettingLayout'

function GeneralInformation() {
  return (
    <>
      <ProfileSetting />
    </>
  )
}

GeneralInformation.getLayout = settingLayout
export default GeneralInformation
