import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { PublicPageHeader } from '@/widgets/publicPageHeader'

const PublicPageLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PublicPageHeader />
      <main>{children}</main>
    </>
  )
}

export const makePublicPageLayout = (page: ReactElement) => {
  return <PublicPageLayout>{page}</PublicPageLayout>
}
