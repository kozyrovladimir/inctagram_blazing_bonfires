import React from 'react'

import { ProfileSetting } from '@/features/profile-setting/ProfileSetting'
import styles from '@/features/profile-setting/ProfileSetting.module.scss'
import { settingLayout } from '@/shared/layout/ProfileLayout/SettingLayout'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'

function GeneralInformation() {
  return (
    <>
      <ProfileSetting />
    </>
  )
}

GeneralInformation.getLayout = settingLayout
export default GeneralInformation
