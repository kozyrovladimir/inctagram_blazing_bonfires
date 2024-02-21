import React from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'

import {
  DropdownMenu,
  NewTable,
  TableSkeleton,
  TBody,
  TCell,
  Text,
  TRow,
} from '../../../../shared/ui'

import s from './UsersListTable.module.scss'

import { User } from '@/__generated__/graphql'
import {
  setBanModalOpenStatus,
  setSelectedUser,
  setUnbanModalOpenStatus,
} from '@/features/user-management/model/userManagementSlice'
import { BannedIcon } from '@/shared/assets/icons'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
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
  const { t } = useTranslation('common')

  const columns = [
    {
      key: 'id',
      title: t('UserListTable.UserID'),
      sortable: false,
    },
    {
      key: 'name',
      title: t('UserListTable.Name'),
      sortable: false,
    },
    {
      key: 'userName',
      title: t('UserListTable.ProfileLink'),
    },
    {
      key: 'createdAt',
      title: t('UserListTable.CreatedAt'),
    },
  ]

  const openBanModal = (user: User) => {
    dispatch(setBanModalOpenStatus(true))
    dispatch(setSelectedUser(user))
  }

  const openUnbanModal = (user: User) => {
    dispatch(setUnbanModalOpenStatus(true))
    dispatch(setSelectedUser(user))
  }

  return (
    <>
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
                        onSelect={e => openBanModal(user)}
                        className={s.DropdownMenuItem}
                      >
                        <BannedIcon width={20} height={20} />
                        <Text>{t('Admin.BanInSystem')}</Text>
                      </RDropdownMenu.Item>
                      <RDropdownMenu.Item
                        onSelect={e => openUnbanModal(user)}
                        className={s.DropdownMenuItem}
                      >
                        <ThreeDots />
                        <Text>{t('Admin.Unban')}</Text>
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
