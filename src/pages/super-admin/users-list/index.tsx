import React, { useRef, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import s from './usersLists.module.scss'

import { BlockStatus } from '@/__generated__/graphql'
import { UsersTableListWithPagination } from '@/entities/usersListTableWithPagination/UsersTableListWithPagination'
import { ADMIN_LOGIN } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { handleSearchChange } from '@/pages/super-admin/lib/utils/utils'
import { selectBlockStatus } from '@/pages/super-admin/modal/selectors/admin-selectors'
import { setBlockStatus } from '@/pages/super-admin/modal/slices/admin-reducer'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
import { Input, InputType, RadixSelect } from '@/shared/ui'

const UsersList = () => {
  const dispatch = useDispatch()
  const blockStatus = useSelector(selectBlockStatus)

  const inputValue = useRef<HTMLInputElement | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const [loginAdmin, { data }] = useMutation(ADMIN_LOGIN)

  // useEffect(() => {
  //   loginAdmin({ variables: { email: 'admin@gmail.com', password: 'admin' } })
  // }, [])

  const handleSearch = handleSearchChange(setSearchValue, 500)

  const handleBlockStatusChange = (blockStatus: BlockedStatusType) => {
    dispatch(setBlockStatus(blockStatus))
  }

  return (
    <div className={s.usersListPage}>
      <div className={s.inputAndSelect}>
        <Input
          ref={inputValue}
          type={InputType.SEARCH}
          className={s.search}
          placeholder={'Search'}
          onChange={handleSearch}
        />
        <div className={s.iconsContainer}>
          <RadixSelect
            className={s.triggerBtn}
            onChangeOption={handleBlockStatusChange}
            options={selectOptions}
            placeholder={'Not selected'}
          />
        </div>
      </div>
      <UsersTableListWithPagination
        searchValue={searchValue}
        blockStatus={blockStatus.toLowerCase() as BlockedStatusType} // we have to lowerCase because the Options we pass to Select are capitalized. Without blockedStatusType typescript would throw error since toLowerCase() creates "not typizated" string
      />
    </div>
  )
}

export type BlockedStatusType = BlockStatus | 'not blocked'
const selectOptions = ['Not blocked', 'Blocked']

UsersList.getLayout = getAdminLayout
export default UsersList
