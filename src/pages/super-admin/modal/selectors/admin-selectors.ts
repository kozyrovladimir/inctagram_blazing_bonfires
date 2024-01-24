import { RootState } from '@/shared/providers/storeProvider'

export const selectPageSize = (state: RootState) => state.admin.pageSize
export const selectPageNumber = (state: RootState) => state.admin.pageNumber
export const selectSort = (state: RootState) => state.admin.sort
export const selectBlockStatus = (state: RootState) => state.admin.blockStatus
