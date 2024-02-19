import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortDirection, User, UserBlockStatus } from '@/__generated__/graphql'
import { BlockedStatusType } from '@/pages/super-admin/users-list'
import { RootState } from '@/shared/providers/storeProvider'
import { SortType } from '@/shared/ui/_table/Table'

type UserManagementSInitialStateType = {
  blockStatus: BlockedStatusType | UserBlockStatus
  usersBlockReason: string
  selectedUser: User | null
  banModalOpenStatus: boolean
}

const userManagementSlice = createSlice({
  name: 'user-management',
  initialState: <UserManagementSInitialStateType>{
    blockStatus: 'ALL',
    usersBlockReason: 'not selected',
    selectedUser: null,
    banModalOpenStatus: false,
  },
  reducers: {
    setBlockStatus(state, action: PayloadAction<BlockedStatusType>) {
      state.blockStatus =
        action.payload === ('Blocked' as BlockedStatusType)
          ? UserBlockStatus.Blocked
          : UserBlockStatus.All
    },
    setUsersBlockReason(state, action: PayloadAction<string>) {
      state.usersBlockReason = action.payload
    },
    setBanModalOpenStatus(state, action: PayloadAction<boolean>) {
      state.banModalOpenStatus = action.payload
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload
    },
  },
})

export const { setBlockStatus, setUsersBlockReason, setBanModalOpenStatus, setSelectedUser } =
  userManagementSlice.actions
export default userManagementSlice.reducer

export const selectBlockStatus = (state: RootState) => state.userManagement.blockStatus
export const selectUserBlockReason = (state: RootState) => state.userManagement.usersBlockReason
export const selectSelectedUser = (state: RootState) => state.userManagement.selectedUser
export const selectBanModalOpenStatus = (state: RootState) =>
  state.userManagement.banModalOpenStatus
