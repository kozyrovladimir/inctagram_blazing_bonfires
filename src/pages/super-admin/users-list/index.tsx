import React, { useEffect } from 'react'

import { useMutation } from '@apollo/client'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import style from './usersLists.module.scss'

import { ADMIN_LOGIN } from '@/pages/super-admin/modal/graphql-query-constants/graphql-query-constanst'
import { selectIsLoggedIn } from '@/shared/api'
import searchImg from '@/shared/assets/icons/input/search.svg'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { Select, TableUsersList } from '@/shared/ui'

const UsersList = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [loginAdmin, { data }] = useMutation(ADMIN_LOGIN)

  useEffect(() => {
    loginAdmin({ variables: { email: 'admin@gmail.com', password: 'admin' } })
  }, [])

  const selectOptions = ['Not selected', 'Blocked', 'Not blocked']
  //const usersPageSelect = ['5', '10', '30', '50', '100']

  return (
    <div className={style.root}>
      <div className={style.searchBlock}>
        <div className={style.inputWrapper}>
          <Image src={searchImg} alt="" className={style.searchImg} />
          <input className={style.inputSearch} placeholder="Search" />
        </div>
        <Select options={selectOptions} st={{ width: '234px' }} />
      </div>
      <div className={style.tableBlock}>
        <TableUsersList />
      </div>
      <div className={style.paginationBlock}>
        <Stack spacing={1}>
          <Pagination
            count={10}
            shape="rounded"
            className={style.pagination}
            sx={{ '&& .Mui-selected': { background: 'white', color: 'black' } }}
          />
        </Stack>
        <div className={style.paginationText}>Show 100 on page</div>
      </div>
    </div>
  )
}

UsersList.getLayout = getLayout
export default UsersList
