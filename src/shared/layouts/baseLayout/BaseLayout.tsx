import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '@/widgets/header'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default BaseLayout
