import React from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './UsersListTable.module.scss'

import { UserFragmentFragment, UsersPaginationModel } from '@/__generated__/graphql'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { DropdownMenu, NewTable, TBody, TCell, THead, THeader, TRow } from '@/shared/ui'

type UsersListTableType = {
  users: UserFragmentFragment[]
}

export const UsersListTable = ({ users }: UsersListTableType) => {
  return (
    <NewTable>
      <THead>
        <TRow>
          <THeader>UserID</THeader>
          <THeader>Name</THeader>
          <THeader>Profile link</THeader>
          <THeader>Date added</THeader>
          <THeader colSpan={2}></THeader>
        </TRow>
      </THead>
      <TBody>
        {users.map(user => {
          return (
            <TRow key={user.id}>
              <TCell>{user.id}</TCell>
              <TCell>
                {user.profile.userName} {user.profile.lastName}
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
