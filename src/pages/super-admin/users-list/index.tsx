import React, { useEffect } from 'react'

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

  const [loginAdmin, { data }] = useMutation(ADMIN_LOGIN)

  // useEffect(() => {
  //   loginAdmin({ variables: { email: 'admin@gmail.com', password: 'admin' } })
  // }, [])

  return (
    <div className={s.usersListPage}>
      <div className={s.inputAndSelect}>
        <Input type={InputType.SEARCH} className={s.search} placeholder={'Search'} />
        <div className={s.iconsContainer}>
          <RadixSelect className={s.triggerBtn} onChangeOption={() => {}} options={selectOptions} />
        </div>
      </div>
      <UsersTableListWithPagination />
    </div>
  )
}

const selectOptions = ['Not selected', 'Blocked', 'Not blocked']

UsersList.getLayout = getAdminLayout
export default UsersList

function createData(userID: string, userName: string, profileLink: string, dateAdded: string) {
  return { userID, userName, profileLink, dateAdded }
}
