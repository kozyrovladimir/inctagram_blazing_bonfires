import React, { useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'next-i18next'

import {
  Text,
  DropdownMenu,
  NewTable,
  TableSkeleton,
  TBody,
  TCell,
  TRow,
} from '../../../../shared/ui'

import s from './UsersListTable.module.scss'

import { User } from '@/__generated__/graphql'
import { BannedIcon } from '@/shared/assets/icons'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { SortType, TableHeader } from '@/shared/ui/_table/Table'
import { AdminModals } from '@/widgets/adminModals/AdminModals'

type UsersListTableType = {
  users: User[]
  handleSort: (sort: SortType) => void
  sort: SortType
  skeletonRowsNum: number
}

export type UsersListTableModalTypes = 'BanUser' | 'UnbanUser' | null

export const UsersListTable = ({
  users,
  sort,
  handleSort,
  skeletonRowsNum,
}: UsersListTableType) => {
  const { t } = useTranslation('common')
  const [chosenModalTypeToOpen, setChosenModalTypeToOpen] = useState<UsersListTableModalTypes>(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

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

  const handleChooseModalToOpen = (user: User, modalType: UsersListTableModalTypes) => {
    setChosenModalTypeToOpen(modalType)
    setOpenModal(true)
    setSelectedUser(user)
  }

  return (
    <>
      <AdminModals
        modalType={chosenModalTypeToOpen}
        selectedUser={selectedUser}
        setIsOpen={setOpenModal}
        isOpen={openModal}
      />
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
                        onSelect={e => {
                          handleChooseModalToOpen(user, 'BanUser')
                        }}
                        className={s.DropdownMenuItem}
                      >
                        <BannedIcon width={20} height={20} />
                        <Text>{t('Admin.BanInSystem')}</Text>
                      </RDropdownMenu.Item>
                      <RDropdownMenu.Item
                        onSelect={e => {
                          handleChooseModalToOpen(user, 'UnbanUser')
                        }}
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
