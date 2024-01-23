import React, { useEffect } from 'react'

import { useMutation } from '@apollo/client'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import style from './usersLists.module.scss'

import { UsersListTable } from '@/entities/usersListTable/UsersListTable'
import { ADMIN_LOGIN } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { selectIsLoggedIn } from '@/shared/api'
import searchImg from '@/shared/assets/icons/input/search.svg'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
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

  const rows = [
    createData('12312313', '1 person', 'profileLink', '01.01.2023'),
    createData('124214324324', '2 person', 'profileLink', '01.01.2023'),
    createData('123213212', '3 person', 'profileLink', '01.01.2023'),
  ]

  return (
    <div>
      <UsersListTable selectedDeckTableData={rows} userId={'1'} />
    </div>
  )
}

UsersList.getLayout = getAdminLayout
export default UsersList

function createData(userID: string, userName: string, profileLink: string, dateAdded: string) {
  return { userID, userName, profileLink, dateAdded }
}

export type DummyRowsType = ReturnType<typeof createData>

//<div className={style.root}>
//       <div className={style.searchBlock}>
//         <div className={style.inputWrapper}>
//           <Image src={searchImg} alt="" className={style.searchImg} />
//           <input className={style.inputSearch} placeholder="Search" />
//         </div>
//         <Select options={selectOptions} st={{ width: '234px' }} />
//       </div>
//       <div className={style.tableBlock}>
//         <TableUsersList />
//       </div>
//       <div className={style.paginationBlock}>
//         <Stack spacing={1}>
//           <Pagination
//             count={10}
//             shape="rounded"
//             className={style.pagination}
//             sx={{ '&& .Mui-selected': { background: 'white', color: 'black' } }}
//           />
//         </Stack>
//         <div className={style.paginationText}>Show 100 on page</div>
//       </div>
//     </div>
