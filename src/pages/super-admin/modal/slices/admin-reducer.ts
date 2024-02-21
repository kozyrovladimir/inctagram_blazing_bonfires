import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortDirection } from '@/__generated__/graphql'
import { BlockedStatusType } from '@/pages/super-admin/users-list'
import { SortType } from '@/shared/ui/_table/Table'

type AdminInitialStateType = {
  pageSize: number
  pageNumber: number
  sortBy: SortType | null
  sortDirection: SortDirection
  adminLoading: boolean
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: <AdminInitialStateType>{
    pageSize: 10,
    pageNumber: 1,
    sortBy: null,
    sortDirection: 'desc',
    adminLoading: true,
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
  },
})

export const { setPageSize, setPageNumber } = adminSlice.actions
export default adminSlice.reducer
