import React from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './UsersListTable.module.scss'

import { User } from '@/__generated__/graphql'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { DropdownMenu, NewTable, TBody, TCell, TRow, TableSkeleton } from '@/shared/ui'
import { SortType, TableHeader } from '@/shared/ui/_table/Table'

type UsersListTableType = {
  users: User[]
  handleSort: (sort: SortType) => void
  sort: SortType
  skeletonRowsNum: number
}

export const UsersListTable = ({
  users,
  sort,
  handleSort,
  skeletonRowsNum,
}: UsersListTableType) => {
  return (
    <NewTable>
      <TableHeader columns={columns} sort={sort} onSort={handleSort} />
      <TBody>
        {!users && <TableSkeleton numRows={skeletonRowsNum} />}
        {users.map(user => {
          return (
            <TRow key={user.id}>
              <TCell>{user.id}</TCell>
              <TCell>
                {user.profile.firstName} {user.profile.lastName}
              </TCell>
              <TCell>{user.userName}</TCell>
              <TCell>{new Date(user.createdAt).toLocaleDateString()}</TCell>
              <TCell>
                <div className={s.iconsContainer}>
                  <DropdownMenu triggerIcon={<ThreeDots />}>
                    <RDropdownMenu.Item
                      onSelect={e => {
                        e.preventDefault()
                      }}
                      className={s.DropdownMenuItem}
                    >
                      icon + text
                    </RDropdownMenu.Item>
                  </DropdownMenu>
                </div>
              </TCell>
            </TRow>
          )
        })}
      </TBody>
    </NewTable>
  )
}

const columns = [
  {
    key: 'id',
    title: 'UserID',
    sortable: false,
  },
  {
    key: 'name',
    title: 'Name',
    sortable: false,
  },
  {
    key: 'userName',
    title: 'Profile link',
  },
  {
    key: 'createdAt',
    title: 'Date added',
  },
]
