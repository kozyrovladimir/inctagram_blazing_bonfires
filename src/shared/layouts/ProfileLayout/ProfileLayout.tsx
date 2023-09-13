import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '../../../widgets/Header'
import { Navbar } from '../../../widgets/Navbar'

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
