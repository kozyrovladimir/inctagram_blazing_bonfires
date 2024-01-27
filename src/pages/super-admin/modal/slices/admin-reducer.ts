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
  adminLoading: boolean
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: <AdminInitialStateType>{
    pageSize: 10,
    pageNumber: 1,
    sortBy: null,
    sortDirection: 'desc',
    blockStatus: 'not blocked',
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
    // setSort(state, action: PayloadAction<SortType>) {
    //   if (action.payload && action.payload.key === null) {
    //     console.log(action.payload, 'payload')
    //     state.sort.sortBy = null
    //     state.sort.sortDirection = 'desc' as SortDirection
    //   } else {
    //     state.sort.sortBy = action.payload.key
    //     state.sort.sortDirection = action.payload.direction as SortDirection
    //   }
    // },
    setBlockStatus(state, action: PayloadAction<BlockedStatusType>) {
      state.blockStatus = action.payload
    },
  },
})

export const { setPageSize, setPageNumber, setBlockStatus, setAdminLoading } = adminSlice.actions
export default adminSlice.reducer
