import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortDirection } from '@/__generated__/graphql'
import { BlockedStatusType } from '@/pages/super-admin/users-list'
import { SortType } from '@/shared/ui/_table/Table'

type AdminInitialStateType = {
  pageSize: number
  pageNumber: number
  sortBy: SortType | null
  sortDirection: SortDirection
  blockStatus: BlockedStatusType
  usersBlockReason: string
  adminLoading: boolean
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: <AdminInitialStateType>{
    pageSize: 10,
    pageNumber: 1,
    sortBy: null,
    sortDirection: 'desc',
    blockStatus: 'Not Blocked',
    adminLoading: true,
    usersBlockReason: 'not selected',
  },
  reducers: {
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload
    },
    setAdminLoading(state, action: PayloadAction<boolean>) {
      state.adminLoading = action.payload
    },
    setBlockStatus(state, action: PayloadAction<BlockedStatusType>) {
      state.blockStatus = action.payload
    },
    setUsersBlockReason(state, action: PayloadAction<string>) {
      state.usersBlockReason = action.payload
    },
  },
})

export const { setPageSize, setPageNumber, setBlockStatus, setAdminLoading, setUsersBlockReason } =
  adminSlice.actions
export default adminSlice.reducer
