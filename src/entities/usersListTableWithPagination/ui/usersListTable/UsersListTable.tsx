import React from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'

import s from './UsersListTable.module.scss'

import { User } from '@/__generated__/graphql'
import { UserBanModal } from '@/features/user-management'
import {
  setBanModalOpenStatus,
  setSelectedUser,
} from '@/features/user-management/model/userManagementSlice'
import { BannedIcon } from '@/shared/assets/icons'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { DropdownMenu, NewTable, TableSkeleton, TBody, TCell, TRow } from '@/shared/ui'
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
  const dispatch = useDispatch()
  const openModalForUser = (user: User | null) => {
    dispatch(setBanModalOpenStatus(true))
    dispatch(setSelectedUser(user))
  }

  const { t } = useTranslation('common', { keyPrefix: 'UserListTable' })

  const columns = [
    {
      key: 'id',
      title: t('UserID'),
      sortable: false,
    },
    {
      key: 'name',
      title: t('Name'),
      sortable: false,
    },
    {
      key: 'userName',
      title: t('ProfileLink'),
    },
    {
      key: 'createdAt',
      title: t('CreatedAt'),
    },
  ]

  return (
    <>
      <UserBanModal />
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
                      <RDropdownMenu.Item
                        onSelect={e => openModalForUser(user)}
                        className={s.DropdownMenuItem}
                      >
                        <BannedIcon width={20} height={20} /> Ban in the system
                      </RDropdownMenu.Item>
                    </DropdownMenu>
                  </div>
                </TCell>
              </TRow>
            )
          })}
        </TBody>
      </NewTable>
    </>
  )
}
