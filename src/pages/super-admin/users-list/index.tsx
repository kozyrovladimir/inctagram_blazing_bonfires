import React, { useRef, useState } from 'react'

import { useMutation } from '@apollo/client'

import s from './usersLists.module.scss'

import { BlockStatus } from '@/__generated__/graphql'
import { ADMIN_LOGIN } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { handleSearchChange } from '@/pages/super-admin/lib/utils/utils'
import { UsersTableListWithPagination } from '@/pages/super-admin/users-list/ui/usersListTableWithPagination/UsersTableListWithPagination'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
import { Input, InputType, RadixSelect } from '@/shared/ui'

const UsersList = () => {
  const inputValue = useRef<HTMLInputElement | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [blockStatus, setBlockStatus] = useState<BlockStatus | 'Not blocked'>('Not blocked')

  console.log(blockStatus, 'blockedSTaTUS!!')

  const [loginAdmin, { data }] = useMutation(ADMIN_LOGIN)

  // useEffect(() => {
  //   loginAdmin({ variables: { email: 'admin@gmail.com', password: 'admin' } })
  // }, [])

  const handleSearch = handleSearchChange(setSearchValue, 500)

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
            onChangeOption={setBlockStatus}
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
