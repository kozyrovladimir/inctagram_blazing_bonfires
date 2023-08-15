import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import ProfileLayout from './ProfileLayout'

export const SettingLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ProfileLayout>{children}</ProfileLayout>
    </>
  )
}

export const settingLayout = (page: ReactElement) => {
  return <SettingLayout>{page}</SettingLayout>
}
