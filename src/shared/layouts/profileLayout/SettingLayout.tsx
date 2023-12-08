import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import ProfileLayout from './ProfileLayout'

import { Navbar } from '@/widgets/navbar'

export const SettingLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ProfileLayout>
        <Navbar />
        {children}
      </ProfileLayout>
    </>
  )
}

export const settingLayout = (page: ReactElement) => {
  return <SettingLayout>{page}</SettingLayout>
}
