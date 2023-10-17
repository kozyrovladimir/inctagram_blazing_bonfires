import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '@/widgets/header'
import { Navbar } from '@/widgets/navbar'

const ProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      {children}
    </>
  )
}

export default ProfileLayout
