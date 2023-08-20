import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Header } from '../../../components/Header/Header'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default BaseLayout
