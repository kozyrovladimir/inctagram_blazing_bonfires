import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '../../../widgets/header/ui/Header'
import { Navbar } from '../../../widgets/navbar/ui/Navbar'

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
