import React from 'react'
import style from './usersLists.module.scss'

import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import {TableUsersList} from '@/shared/ui/tableUsersList/TableUsersList'

const UsersList = () => {
  return (
    <div className={style.root}>
      <div className={style.searchBlock}>
        <div>
          <input />
        </div>
        <div>select</div>
      </div>
      <div className={style.tableBlock}>
        <TableUsersList />
      </div >
      <div>
        1 2 3 4 5
      </div>
    </div>
  ) 
}

UsersList.getLayout = getLayout
export default UsersList