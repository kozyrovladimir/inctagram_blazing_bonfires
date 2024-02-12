import React, { useEffect, useState } from 'react'

import { User } from '@/__generated__/graphql'
import { BanUserModal } from '@/entities/banUserModal'
import { UnbanUserModal } from '@/entities/unbanUserModal'
import { UsersListTableModalTypes } from '@/entities/usersListTableWithPagination'

type AdminModalsType = {
  modalType: UsersListTableModalTypes
  selectedUser: User | null
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}

export const AdminModals = ({ isOpen, setIsOpen, modalType, selectedUser }: AdminModalsType) => {
  switch (modalType) {
    case 'BanUser': {
      return <BanUserModal user={selectedUser} isOpen={isOpen} setIsOpen={setIsOpen} />
    }
    case 'UnbanUser': {
      return <UnbanUserModal user={selectedUser} isOpen={isOpen} setIsOpen={setIsOpen} />
    }
    default:
      return null
  }
}
