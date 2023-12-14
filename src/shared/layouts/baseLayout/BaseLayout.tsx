import React, { PropsWithChildren, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import style from './BaseLayout.module.scss'

import { isRenderSidebar } from '@/shared/utils/isRenderSidebar'
import { Header } from '@/widgets/header'
import { SideBar } from '@/widgets/sideBar'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter()

  const isSidebar = isRenderSidebar(pathname)

  return (
    <>
      <Header />
      {isSidebar && <SideBar />}
      <main className={isSidebar ? style.mainWithSidebar : style.main}>{children}</main>
    </>
  )
}

export default BaseLayout
