import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Header } from '../../Header'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default BaseLayout
