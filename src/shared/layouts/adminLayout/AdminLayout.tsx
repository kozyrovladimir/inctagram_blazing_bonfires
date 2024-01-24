import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next/types'
import { useSelector } from 'react-redux'

import s from './AdminLayout.module.scss'

import { selectIsLoggedIn } from '@/shared/api'
import { Header } from '@/widgets/header'
import { SideBar } from '@/widgets/sideBar'

const AdminLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <>
      <Header />
      <div className={s.AdminLayoutBody}>
        <SideBar />
        <main className={s.superAdminBody}>{children}</main>
      </div>
    </>
  )
}

export const getAdminLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}
