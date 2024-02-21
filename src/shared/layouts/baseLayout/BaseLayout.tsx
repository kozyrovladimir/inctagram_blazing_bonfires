import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import style from './BaseLayout.module.scss'

import { selectIsLoggedIn } from '@/shared/api'
import { isRenderSidebar } from '@/shared/utils/isRenderSidebar'
import { Header } from '@/widgets/header'
import { PublicPageHeader } from '@/widgets/publicPageHeader'
import { SideBar } from '@/widgets/sideBar'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { pathname } = useRouter()

  const isSidebar = isRenderSidebar(pathname)

  return (
    <>
      {isLoggedIn ? <Header /> : <PublicPageHeader />}
      <div className={style.contentBody}>
        {isLoggedIn && isSidebar && <SideBar />}
        <main className={isSidebar ? style.mainWithSidebar : style.main}>{children}</main>
      </div>
    </>
  )
}

export default BaseLayout
