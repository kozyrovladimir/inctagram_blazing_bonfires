import { RootState } from '@/shared/providers/storeProvider'

export const selectPageSize = (state: RootState) => state.admin.pageSize
export const selectPageNumber = (state: RootState) => state.admin.pageNumber
