import React from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './UsersListTable.module.scss'

import { DummyRowsType } from '@/pages/super-admin/users-list'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { DropdownMenu, NewTable, TBody, TCell, THead, THeader, TRow } from '@/shared/ui'

type SelectedDeckTableType = {
  selectedDeckTableData: DummyRowsType[]
  userId: string
}

export const UsersListTable = ({ selectedDeckTableData, userId }: SelectedDeckTableType) => {
  return (
    <NewTable>
      <THead>
        <TRow>
          <THeader>UserID</THeader>
          <THeader>Username</THeader>
          <THeader>Profile link</THeader>
          <THeader>Date added</THeader>
          <THeader colSpan={2}></THeader>
        </TRow>
      </THead>
      <TBody>
        {selectedDeckTableData.map(user => {
          return (
            <TRow key={user.userID}>
              <TCell>{user.userID}</TCell>
              <TCell>{user.profileLink}</TCell>
              <TCell>{user.userName}</TCell>
              <TCell>{new Date(user?.dateAdded).toLocaleDateString()}</TCell>
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
