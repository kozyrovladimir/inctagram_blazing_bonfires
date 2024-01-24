import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

import s from './usersLists.module.scss'

import { QueryGetUsersArgs, UsersPaginationModel } from '@/__generated__/graphql'
import {
  ADMIN_LOGIN,
  GET_USERS_LIST,
} from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { UsersTableListWithPagination } from '@/pages/super-admin/users-list/ui/usersListTableWithPagination/UsersTableListWithPagination'
import { selectIsLoggedIn } from '@/shared/api'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
import { Input, InputType, RadixSelect } from '@/shared/ui'

const UsersList = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const inputValue = useRef<HTMLInputElement | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const [loginAdmin, { data }] = useMutation(ADMIN_LOGIN)

  // useEffect(() => {
  //   loginAdmin({ variables: { email: 'admin@gmail.com', password: 'admin' } })
  // }, [])

  console.log(inputValue, 'ref')
  let timeoutId: NodeJS.Timeout
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      setSearchValue(e.target.value)
    }, 500)
  }

  return (
    <div className={s.usersListPage}>
      <div className={s.inputAndSelect}>
        <Input
          ref={inputValue}
          type={InputType.SEARCH}
          className={s.search}
          placeholder={'Search'}
          onChange={handleSearchChange}
        />
        <div className={s.iconsContainer}>
          <RadixSelect className={s.triggerBtn} onChangeOption={() => {}} options={selectOptions} />
        </div>
      </div>
      <UsersTableListWithPagination searchValue={searchValue} />
    </div>
  )
}

const selectOptions = ['Not selected', 'Blocked', 'Not blocked']

UsersList.getLayout = getAdminLayout
export default UsersList

function createData(userID: string, userName: string, profileLink: string, dateAdded: string) {
  return { userID, userName, profileLink, dateAdded }
}
