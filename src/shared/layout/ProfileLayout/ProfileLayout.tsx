import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '@/components/Header/Header'
import { Navbar } from '@/components/navbar/Navbar'

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
