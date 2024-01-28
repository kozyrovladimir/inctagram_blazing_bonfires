import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortDirection } from '@/__generated__/graphql'
import { BlockedStatusType } from '@/pages/super-admin/users-list'
import { SortType } from '@/shared/ui/_table/Table'

type AdminInitialStateType = {
  isAdminLogged: boolean
}

const adminAuthSlice = createSlice({
  name: 'admin-auth',
  initialState: <AdminInitialStateType>{
    isAdminLogged: false,
  },
  reducers: {
    signInAdmin(state, action: PayloadAction<boolean>) {
      state.isAdminLogged = action.payload
    },
  },
})

export const { signInAdmin } = adminAuthSlice.actions
export default adminAuthSlice.reducer
