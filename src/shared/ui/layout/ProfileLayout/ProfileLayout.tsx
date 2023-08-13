import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '../../../../widgets/Header/ui/Header/Header'
import { Navbar } from '../../../../widgets/Navbar/ui/Navbar/Navbar'

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
