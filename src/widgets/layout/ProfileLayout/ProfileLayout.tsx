import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '../../Header/ui/Header/Header'
import { Navbar } from '../../Navbar/ui/Navbar/Navbar'

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
