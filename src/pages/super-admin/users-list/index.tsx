import React, { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSelector } from 'react-redux'

import s from './usersLists.module.scss'

import { UsersListTable } from '@/entities/usersListTable/UsersListTable'
import { ADMIN_LOGIN } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { selectIsLoggedIn } from '@/shared/api'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
import { DropdownMenu, Input, InputType, Pagination, RadixSelect } from '@/shared/ui'

const UsersList = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number | string>(10)

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const [loginAdmin, { data }] = useMutation(ADMIN_LOGIN)

  useEffect(() => {
    loginAdmin({ variables: { email: 'admin@gmail.com', password: 'admin' } })
  }, [])

  const selectOptions = ['Not selected', 'Blocked', 'Not blocked']
  //const usersPageSelect = ['5', '10', '30', '50', '100']

  const rows = [
    createData('12312313', '1 person', 'profileLink', '01.01.2023'),
    createData('124214324324', '2 person', 'profileLink', '01.01.2023'),
    createData('123213212', '3 person', 'profileLink', '01.01.2023'),
  ]

  return (
    <div className={s.usersListPage}>
      <div className={s.inputAndSelect}>
        <Input type={InputType.SEARCH} className={s.search} placeholder={'Search'} />
        <div className={s.iconsContainer}>
          <RadixSelect className={s.triggerBtn} onChangeOption={() => {}} options={selectOptions} />
        </div>
      </div>
      <UsersListTable selectedDeckTableData={rows} userId={'1'} />
      {/*<Pagination/>*/}
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={1}
        totalCount={100}
        itemsPerPage={10}
        currentPage={currentPage}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </div>
  )
}

const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

UsersList.getLayout = getAdminLayout
export default UsersList

function createData(userID: string, userName: string, profileLink: string, dateAdded: string) {
  return { userID, userName, profileLink, dateAdded }
}

export type DummyRowsType = ReturnType<typeof createData>
