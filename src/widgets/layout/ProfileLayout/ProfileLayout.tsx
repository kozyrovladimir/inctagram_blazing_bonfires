import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '../../Header'
import { Navbar } from '../../Navbar/'

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
